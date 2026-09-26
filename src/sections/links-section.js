import { links } from "../data/links.js";
import { iconBadge } from "../utils/icons.js";

export function renderLinks() {
    const grid = document.getElementById("links-grid");
    if (!grid) return;

    grid.innerHTML = links
        .map(
            (link) => `
    <a class="link-card" href="${link.url}" target="_blank" rel="noopener noreferrer">
      ${iconBadge(link.icon)}
      <span class="link-name">${link.name}</span>
    </a>`
        )
        .join("");
}
