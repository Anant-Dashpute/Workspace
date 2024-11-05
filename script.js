// Function to load blog posts from JSON files in the 'blogs' directory
async function loadBlogs() {
    const blogPostsContainer = document.getElementById("blogPosts");
    let blogIndex = 1;

    while (true) {
        const filePath = `blogs/blog${blogIndex}.json`;
        
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                break;  // Stop if the file does not exist (404 error)
            }

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
            blogIndex++;  // Increment to the next blog file
        } catch (error) {
            console.error("Error loading blog:", filePath, error);
            break;
        }
    }
}

// Load blogs on page load
document.addEventListener("DOMContentLoaded", loadBlogs);