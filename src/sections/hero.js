import { profile } from "../data/profile.js";
import { links } from "../data/links.js";

export function renderHero() {
    const root = document.getElementById("hero-section");
    if (!root) return;
    const linkedin = links.find((l) => l.icon === "linkedin");

    root.innerHTML = `
    <div class="hero">
      <img class="hero-avatar" src="${profile.avatar}" alt="${profile.name}" loading="eager" width="120" height="120" />
      <h1 class="hero-name">${profile.name}</h1>
      <p class="hero-role">${profile.role}</p>
      <p class="hero-intro">${profile.intro}</p>
      <div class="quick-actions">
        ${linkedin ? `<a class="btn btn-primary" href="${linkedin.url}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>` : ""}
        <a class="btn btn-secondary" href="notes.html">View Notes</a>
        <a class="btn btn-secondary" href="#publications-section">Publications</a>
        <a class="btn btn-secondary" href="#contact">Contact</a>
    </div>
  `;
}
