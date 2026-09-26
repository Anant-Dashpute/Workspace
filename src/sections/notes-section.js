// Notes are authored as Markdown under content/notes/*.md and compiled at build
// time (scripts/build-content.mjs) into content/generated/notes.json.

function noteCard(note) {
    const thumb = note.thumbnail
        ? `<img class="card-thumb" src="${note.thumbnail}" alt="${note.title}" loading="lazy" />`
        : "";
    const preview = note.bodyHtml
        ? `<details class="card-details"><summary>Preview</summary>${note.bodyHtml}</details>`
        : "";
    return `
    <article class="card">
      ${thumb}
      <div class="card-body">
        <span class="badge">${note.category}</span>
        <h3 class="card-title">${note.title}</h3>
        <p class="card-text">${note.description}</p>
        ${preview}
      </div>
      <div class="card-footer">
        <a class="btn btn-secondary btn-small" href="${note.file}" download>Download PDF</a>
      </div>
    </article>
  `;
}

export async function renderNotes() {
    const grid = document.getElementById("notes-grid");
    const filterBar = document.getElementById("notes-filters");
    const searchInput = document.getElementById("notes-search");
    if (!grid) return;

    let notes = [];
    try {
        const response = await fetch("content/generated/notes.json");
        if (response.ok) notes = await response.json();
    } catch (err) {
        console.warn("Failed to load notes index:", err);
    }

    const categories = ["All", ...new Set(notes.map((n) => n.category))];
    let activeCategory = "All";
    let query = "";

    function draw() {
        const items = notes.filter((n) => {
            const matchesCategory = activeCategory === "All" || n.category === activeCategory;
            const matchesQuery =
                !query ||
                n.title.toLowerCase().includes(query) ||
                n.description.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
        grid.innerHTML = items.map(noteCard).join("") || `<p class="empty-state">No notes found.</p>`;
    }

    if (filterBar) {
        filterBar.innerHTML = categories
            .map((c, i) => `<button class="chip chip-btn${i === 0 ? " active" : ""}" data-category="${c}">${c}</button>`)
            .join("");

        filterBar.addEventListener("click", (e) => {
            const btn = e.target.closest(".chip-btn");
            if (!btn) return;
            filterBar.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category;
            draw();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            query = e.target.value.trim().toLowerCase();
            draw();
        });
    }

    draw();
}
