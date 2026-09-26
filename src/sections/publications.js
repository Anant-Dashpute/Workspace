import { publications } from "../data/publications.js";

// Strictly text-only cards: title, meta (venue/date), tags, and an excerpt-style author line.
// No images or thumbnails — keeps this feed lightweight and fast to render.
export function renderPublications() {
    const root = document.getElementById("publications-section");
    if (!root) return;

    if (publications.length === 0) {
        root.innerHTML = "";
        return;
    }

    root.innerHTML = `
    <section class="section">
      <h2 class="section-title">Publications</h2>
      <p class="section-text">Formal research output, indexed on ORCID.</p>
      <div class="grid">
        ${publications
            .map(
                (pub) => `
          <article class="card card-text-only">
            <div class="card-body">
              <div class="card-meta">
                <span class="meta-mono">${pub.venue}</span>
                <span class="meta-mono">${pub.date}</span>
              </div>
              <h3 class="card-title">${pub.title}</h3>
              <div class="chip-list">${pub.tags.map((t) => `<span class="chip chip-mono">${t}</span>`).join("")}</div>
              <p class="card-text">${pub.authors.join(", ")}</p>
            </div>
            <div class="card-footer">
              <a href="${pub.url}" target="_blank" rel="noopener noreferrer">View DOI ${pub.doi} →</a>
            </div>
          </article>`
            )
            .join("")}
      </div>
    </section>
  `;
}
