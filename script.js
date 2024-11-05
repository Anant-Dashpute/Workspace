// Function to read blog files from the `blogs/` directory and load them into the page
async function loadBlogs() {
    const blogList = document.getElementById("blog-list");
    const blogContainer = document.getElementById("blog-container");

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

// Simulate fetching blogs from a server or static files
async function fetchBlogsFromServer() {
    // Sample blog content, in a real application, this could be fetched from an API or a static folder
    return [
        {
            title: "AI and the Future of Automation",
            content: `
                <h1>AI and the Future of Automation</h1>
                <p>The rise of Artificial Intelligence (AI) has been transforming industries across the globe. In particular, automation is one of the most promising areas where AI can drive significant advancements...</p>
                <img src="assets/example.jpg" alt="AI Automation">
            `
        },
        {
            title: "Current AI Trends in Healthcare",
            content: `
                <h1>Current AI Trends in Healthcare</h1>
                <p>AI is playing an increasingly pivotal role in the healthcare industry. From predictive diagnostics to personalized treatments, AI-powered systems are revolutionizing how healthcare professionals deliver care...</p>
                <img src="assets/example.jpg" alt="AI in Healthcare">
            `
        }
    ];
}

// Initialize blog loading when the page loads
window.onload = function() {
    loadBlogs();
};
