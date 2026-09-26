import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { registerServiceWorker } from "../utils/pwa.js";

// Generic content-list page used by blogs / concepts / research-papers / projects.
// Content is authored as Markdown under content/<type>/*.md and compiled at build
// time (scripts/build-content.mjs) into a single content/generated/<type>.json index.

async function loadPosts(type) {
    const grid = document.getElementById("content-grid");
    if (!grid) return;

    let posts = [];
    try {
        const response = await fetch(`content/generated/${type}.json`);
        if (response.ok) posts = await response.json();
    } catch (err) {
        console.warn("Failed to load content index:", err);
    }

    if (posts.length === 0) {
        grid.innerHTML = `<p class="empty-state">No content yet. Check back soon.</p>`;
        return;
    }

    grid.innerHTML = posts
        .map(
            (post) => `
    <article class="card">
      ${post.image ? `<img class="card-thumb" src="${post.image}" alt="${post.title}" loading="lazy" />` : ""}
      <div class="card-body">
        <h3 class="card-title">${post.title}</h3>
        ${post.date ? `<p class="card-subtitle">${post.date}</p>` : ""}
        <p class="card-text">${post.description}</p>
        ${post.bodyHtml
                    ? `<details class="card-details"><summary>Read more</summary>${post.bodyHtml}</details>`
                    : ""
                }
      </div>
    </article>`
        )
        .join("");
}

const { pageType, pageId } = document.body.dataset;
renderNavbar(pageId);
renderFooter();
registerServiceWorker();
loadPosts(pageType);
