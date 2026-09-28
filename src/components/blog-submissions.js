const BLOG_CONFIG = {
  owner: "Anant-Dashpute",
  repo: "Workspace",
  defaultBranch: "main",
  token: "YOUR_GITHUB_TOKEN"
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateForm(form) {
  const title = form.title.value.trim();
  const content = form.content.value.trim();
  const category = form.category.value.trim();

  if (!title) {
    throw new Error("Please enter a post title.");
  }

  if (!content) {
    throw new Error("Please add some content.");
  }

  if (!category) {
    throw new Error("Please select a category.");
  }

  return { title, content, category };
}

function buildMarkdown(post) {
  const today = new Date().toISOString().slice(0, 10);
  const title = post.title.trim();
  const category = post.category.trim();
  const author = post.author.trim();
  const image = post.image.trim();
  const content = post.content.trim();

  let frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${today}
category: ${category}
`;

  if (author) {
    frontmatter += `author: "${author.replace(/"/g, '\\"')}"\n`;
  }

  if (image) {
    frontmatter += `image: "${image.replace(/"/g, '\\"')}"\n`;
  }

  frontmatter += `---\n\n`;
  return `${frontmatter}${content}\n`;
}

async function githubFetch(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${BLOG_CONFIG.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();

  if (!response.ok) {
    let errMessage = "GitHub API request failed.";
    try {
      const parsed = JSON.parse(text);
      if (parsed && parsed.message) {
        errMessage = parsed.message;
      }
    } catch (e) {
      // ignore parse failure
    }
    throw new Error(errMessage);
  }

  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function createBranch(branchName, sha) {
  return githubFetch(`https://api.github.com/repos/${BLOG_CONFIG.owner}/${BLOG_CONFIG.repo}/git/refs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha
    })
  });
}

async function getDefaultBranchSha() {
  const ref = await githubFetch(
    `https://api.github.com/repos/${BLOG_CONFIG.owner}/${BLOG_CONFIG.repo}/git/ref/heads/${BLOG_CONFIG.defaultBranch}`
  );
  return ref.object.sha;
}

async function createPostFile(branchName, slug, markdownContent) {
  const path = `content/blogs/${slug}.md`;

  return githubFetch(
    `https://api.github.com/repos/${BLOG_CONFIG.owner}/${BLOG_CONFIG.repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Add blog draft: ${slug}`,
        content: btoa(unescape(encodeURIComponent(markdownContent))),
        branch: branchName
      })
    }
  );
}

async function createPullRequest(branchName, title, body) {
  return githubFetch(`https://api.github.com/repos/${BLOG_CONFIG.owner}/${BLOG_CONFIG.repo}/pulls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      head: branchName,
      base: BLOG_CONFIG.defaultBranch,
      body
    })
  });
}

async function submitBlogToGitHub(formData) {
  const slug = slugify(formData.title);
  const branchName = `blog/${slug}-${Date.now().toString(36)}`;
  const markdown = buildMarkdown(formData);

  const baseSha = await getDefaultBranchSha();
  await createBranch(branchName, baseSha);
  await createPostFile(branchName, slug, markdown);

  const pr = await createPullRequest(
    branchName,
    `New blog: ${formData.title}`,
    `Submitted via Workspace blog writer.\n\n- Author: ${formData.author || "Not provided"}\n- Category: ${formData.category}\n- Cover image: ${formData.image || "Not provided"}`
  );

  return pr;
}

export function mountBlogSubmission() {
  const modalRoot = document.getElementById("blog-submission-modal");
  if (modalRoot) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="blog-submission-modal" class="blog-modal hidden" aria-hidden="true">
      <div class="blog-modal-backdrop" data-close-blog-modal="true"></div>
      <div class="blog-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="blog-submission-title">
        <div class="blog-modal-header">
          <div>
            <p class="subsection-title">Create a post</p>
            <h2 id="blog-submission-title">Write a blog draft</h2>
          </div>
          <button type="button" class="blog-close-btn" data-close-blog-modal="true" aria-label="Close dialog">×</button>
        </div>

        <form id="blog-submission-form" class="blog-form">
          <div class="form-grid">
            <label class="field">
              <span>Post title</span>
              <input type="text" name="title" placeholder="How I learned to build a better workflow" required />
            </label>

            <label class="field">
              <span>Author / social link</span>
              <input type="text" name="author" placeholder="Your name or profile URL" />
            </label>

            <label class="field">
              <span>Cover image URL</span>
              <input type="url" name="image" placeholder="https://example.com/cover.jpg" />
            </label>

            <label class="field">
              <span>Category</span>
              <select name="category" required>
                <option value="">Select a category</option>
                <option value="blogs">Blog</option>
                <option value="concepts">Concept</option>
                <option value="projects">Project</option>
                <option value="research-papers">Research Paper</option>
              </select>
            </label>
          </div>

          <label class="field">
            <span>Content</span>
            <textarea name="content" rows="12" placeholder="Write your blog in Markdown..." required></textarea>
          </label>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" data-close-blog-modal="true">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit for review</button>
          </div>

          <p class="form-status" id="blog-form-status" aria-live="polite"></p>
        </form>
      </div>
    </div>
    `
  );

  const modal = document.getElementById("blog-submission-modal");
  const form = document.getElementById("blog-submission-form");
  const trigger = document.getElementById("open-blog-submission");
  const status = document.getElementById("blog-form-status");

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    form.reset();
    status.textContent = "";
    status.classList.remove("error");
  };

  trigger.addEventListener("click", openModal);

  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-blog-modal='true']")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const values = validateForm(form);
      status.textContent = "Submitting your draft...";
      status.classList.remove("error");
      status.classList.add("loading");

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";

      const pr = await submitBlogToGitHub({
        title: values.title,
        author: form.author.value.trim(),
        image: form.image.value.trim(),
        category: values.category,
        content: values.content
      });

      status.textContent = "Your post was submitted and is now under review.";
      status.classList.remove("loading", "error");

      const prUrl = pr && pr.html_url ? pr.html_url : "";
      if (prUrl) {
        status.innerHTML = `Your post was submitted and is now under review. <a href="${escapeHtml(prUrl)}" target="_blank" rel="noreferrer">View pull request</a>`;
      }

      setTimeout(() => {
        closeModal();
      }, 2200);

    } catch (error) {
      status.textContent = error.message || "Something went wrong while sending your draft. Please try again.";
      status.classList.add("error");
      status.classList.remove("loading");
    } finally {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit for review";
      }
    }
  });
}