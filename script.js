// Sample blog posts
const blogs = [
    {
        title: "AI Blog Post",
        content: "This is the content of the first blog post. Here you can share insights, experiences, and more!",
        date: "November 5, 2024"
    },
    {
        title: "Another Blog Post",
        content: "This is some more content. Blogging is a great way to connect with your audience!",
        date: "November 4, 2024"
    }
];

// Load blog posts on page load
document.addEventListener("DOMContentLoaded", () => {
    const blogPostsContainer = document.getElementById("blogPosts");

    blogs.forEach(blog => {
        const blogCard = document.createElement("div");
        blogCard.className = "col-md-4";
        blogCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${blog.date}</h6>
                    <p class="card-text">${blog.content}</p>
                </div>
            </div>
        `;
        blogPostsContainer.appendChild(blogCard);
    });
});