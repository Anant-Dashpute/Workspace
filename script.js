// Function to load content from JSON files in specified directory
async function loadContent(type) {
    const contentContainer = document.getElementById("contentPosts");
    let fileIndex = 1;

    while (true) {
        const filePath = `${type}/post${fileIndex}.json`;
        
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                break;  // Stop if the file does not exist (404 error)
            }

            const post = await response.json();

            // Create content card element
            const contentCard = document.createElement("div");
            contentCard.className = "col-md-4";
            contentCard.innerHTML = `
                <div class="card">
                    <img src="${post.image}" class="card-img-top" alt="Image">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                        <p class="card-text">${post.objective}</p>
                        <p class="card-text">${post.content}</p>
                    </div>
                </div>
            `;

            // Append content card to container
            contentContainer.appendChild(contentCard);
            fileIndex++;  // Increment to the next file
        } catch (error) {
            console.error("Error loading content:", filePath, error);
            break;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("expand");
        });
    });
});