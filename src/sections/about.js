import { profile } from "../data/profile.js";
import { timeline } from "../data/timeline.js";
import { achievements } from "../data/achievements.js";
import { certifications } from "../data/certifications.js";

function chipList(items) {
  return items.map((item) => `<span class="chip">${item}</span>`).join("");
}

export function renderAbout() {
  const root = document.getElementById("about-section");
  if (!root) return;

  root.innerHTML = `
    <section class="section">
      <h2 class="section-title">About Me</h2>
      <p class="section-text">${profile.summary}</p>

      ${profile.highlights && profile.highlights.length
      ? `<ul class="highlight-list">${profile.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
      : ""}

      <div class="about-grid">
        <div>
          <h3 class="subsection-title">Skills</h3>
          <div class="chip-list">${chipList(profile.skills)}</div>
        </div>
        <div>
          <h3 class="subsection-title">Tech Stack</h3>
          <div class="chip-list">${chipList(profile.techStack)}</div>
        </div>
        <div>
          <h3 class="subsection-title">Interests</h3>
          <div class="chip-list">${chipList(profile.interests)}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Timeline</h2>
      <ol class="timeline">
        ${timeline
      .map(
        (t) => `
          <li class="timeline-item">
            <span class="timeline-year">${t.year}</span>
            <h3 class="timeline-title">${t.title}</h3>
            <p class="timeline-desc">${t.description}</p>
          </li>`
      )
      .join("")}
      </ol>
    </section>

    <section class="section">
      <h2 class="section-title">Achievements</h2>
      <div class="grid">
        ${achievements
      .map(
        (a) => `
          <article class="card">
            <div class="card-body">
              <h3 class="card-title">${a.title}</h3>
              <p class="card-subtitle">${a.date}</p>
              <p class="card-text">${a.description}</p>
            </div>
          </article>`
      )
      .join("")}
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Certifications</h2>
      <div class="grid">
        ${certifications
      .map(
        (c) => `
          <article class="card">
            <div class="card-body">
              <h3 class="card-title">${c.title}</h3>
              <p class="card-subtitle">${c.issuer} · ${c.date}</p>
            </div>
            <div class="card-footer"><a href="${c.url}">View credential →</a></div>
          </article>`
      )
      .join("")}
      </div>
    </section>

    <section class="section" id="contact">
      <h2 class="section-title">Contact</h2>
      <p class="section-text">
        Reach me at <a href="mailto:${profile.contact.email}">${profile.contact.email}</a>
        &middot; ${profile.contact.location}
      </p>
    </section>
  `;
}
