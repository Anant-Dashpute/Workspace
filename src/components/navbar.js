import { navItems } from "../data/nav.js";

// Renders the shared site navbar into <header id="app-header"> on every page.
export function renderNavbar(activeId) {
  const header = document.getElementById("app-header");
  if (!header) return;

  const links = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="nav-link${item.id === activeId ? " active" : ""}">${item.label}</a>`
    )
    .join("");

  header.innerHTML = `
    <div class="nav-inner">
      <a class="brand" href="index.html">Workspace</a>
      <nav class="nav-links" id="nav-links">${links}</nav>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const list = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}
