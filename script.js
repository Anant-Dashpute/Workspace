// Function to load blog data from the blogs directory on GitHub repository
async function loadBlogs() {
    const blogList = document.getElementById("blog-list");
    const blogContainer = document.getElementById("blog-container");

    // Fetch all blog files (Markdown) from the `blogs/` folder using GitHub's raw content URL
    const blogs = await fetchBlogsFromServer();

    // Dynamically create blog topics list in sidebar
    blogs.forEach(blog => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.href = "#";
        link.textContent = blog.title;
        link.addEventListener("click", () => {
            loadBlogContent(blog.content);
        });
        li.appendChild(link);
        blogList.appendChild(li);
    });

    // Function to display content when a blog is clicked
    function loadBlogContent(content) {
        blogContainer.innerHTML = content;
    }
}

// Function to fetch blogs from GitHub using the raw URL of Markdown files
async function fetchBlogsFromServer() {
    // GitHub repository's raw URL
    const rawGitHubURL = "https://raw.githubusercontent.com/your-username/your-repo/main/blogs/";

    // List of blogs (you can add more files here)
    const blogFiles = [
        "blog1.md",
        "blog2.md"
    ];

    const blogs = [];

    for (const file of blogFiles) {
        const response = await fetch(rawGitHubURL + file);
        const markdownContent = await response.text();
        const htmlContent = marked(markdownContent); // Convert markdown to HTML using marked.js

        // Push the blog data with title and HTML content
        blogs.push({
            title: file.replace('.md', '').replace(/-/g, ' '),  // File name as title
            content: htmlContent
        });
    }

    return blogs;
}

// Initialize blog loading when the page loads
window.onload = function() {
    loadBlogs();
};
