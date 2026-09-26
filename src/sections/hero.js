import { profile } from "../data/profile.js";

export function renderHero() {
    const root = document.getElementById("hero-section");
    if (!root) return;
    root.innerHTML = `
    <div class="hero">
      <img class="hero-avatar" src="${profile.avatar}" alt="${profile.name}" loading="eager" width="120" height="120" />
      <h1 class="hero-name">${profile.name}</h1>
      <p class="hero-role">${profile.role}</p>
      <p class="hero-intro">${profile.intro}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#contact">Contact</a>
        <a class="btn btn-secondary" href="notes.html">View Notes</a>
      </div>
    </div>
  `;
}
