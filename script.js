// Function to load blog posts from JSON files in 'blogs' directory
async function loadBlogs() {
    const blogPostsContainer = document.getElementById("blogPosts");

    // Array of blog filenames
    const blogFiles = ["blogs/blog1.json", "blogs/blog2.json", "blogs/blog3.json"];  // Add more as needed

    for (let file of blogFiles) {
        try {
            // Fetch each blog file and parse the content
            const response = await fetch(file);
            const blog = await response.json();

            // Create blog card element
            const blogCard = document.createElement("div");
            blogCard.className = "col-md-4";
            blogCard.innerHTML = `
                <div class="card">
                    <img src="${blog.image}" class="card-img-top" alt="Blog Image">
                    <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${blog.date}</h6>
                        <p class="card-text">${blog.objective}</p>
                        <p class="card-text">${blog.content}</p>
                    </div>
                </div>
            `;

            // Append blog card to container
            blogPostsContainer.appendChild(blogCard);
        } catch (error) {
            console.error("Error loading blog:", file, error);
        }
    }
}

// Load blogs on page load
document.addEventListener("DOMContentLoaded", loadBlogs);