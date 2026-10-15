import { photos } from "../data/photos.js";

function groupPhotosByYear() {
    return Object.groupBy
        ? Object.groupBy(photos, (photo) => photo.year)
        : photos.reduce((groups, photo) => {
            (groups[photo.year] ??= []).push(photo);
            return groups;
        }, {});
}

function updateGalleryControls(track, previous, next, status) {
    const firstCard = track.querySelector(".photo-card");
    if (!firstCard) return;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const firstIndex = Math.round(track.scrollLeft / step);
    const visibleCount = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    const total = track.children.length;

    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    status.textContent = `Photos ${firstIndex + 1}–${Math.min(firstIndex + visibleCount, total)} of ${total}`;
}

function renderYearGallery(year, yearPhotos) {
    return `
      <section class="photo-year" aria-labelledby="photo-year-${year}">
        <div class="photo-year-heading">
          <div>
            <span class="photo-kicker">PHOTO TIMELINE</span>
            <h3 class="photo-year-title" id="photo-year-${year}">${year}</h3>
          </div>
          <div class="photo-carousel-controls">
            <span class="photo-gallery-status" aria-live="polite">Photos 1–${Math.min(3, yearPhotos.length)} of ${yearPhotos.length}</span>
            <button class="photo-carousel-button" type="button" data-direction="-1" aria-label="Previous ${year} photos" disabled>←</button>
            <button class="photo-carousel-button" type="button" data-direction="1" aria-label="Next ${year} photos">→</button>
          </div>
        </div>
        <div class="photo-track" role="region" aria-label="${year} photos" tabindex="0">
          ${yearPhotos.map((photo) => `
            <figure class="photo-card">
              <div class="photo-frame">
                <img src="${photo.src}" alt="${photo.title}, ${year}" loading="lazy" />
              </div>
              <figcaption>${photo.title}</figcaption>
            </figure>
          `).join("")}
        </div>
      </section>`;
}

export function renderPhotoTimeline(root) {
    if (!root) return;

    const groups = groupPhotosByYear();
    const years = Object.keys(groups).sort((left, right) => right.localeCompare(left));

    root.innerHTML = `
      <section class="section photo-timeline" aria-labelledby="photo-timeline-title">
        <div class="photo-section-heading">
          <div>
            <span class="photo-kicker">MEMORIES, YEAR BY YEAR</span>
            <h2 class="section-title" id="photo-timeline-title">Photo Timeline</h2>
            <p class="section-text">A few moments from work, team events, and life outside the desk.</p>
          </div>
          ${root.dataset.page === "home" ? '<a class="btn btn-secondary btn-small" href="photos.html">See all photos</a>' : ""}
        </div>
        ${years.map((year) => renderYearGallery(year, groups[year])).join("")}
      </section>`;

    root.querySelectorAll(".photo-year").forEach((gallery) => {
        const track = gallery.querySelector(".photo-track");
        const [previous, next] = gallery.querySelectorAll(".photo-carousel-button");
        const status = gallery.querySelector(".photo-gallery-status");
        const update = () => updateGalleryControls(track, previous, next, status);

        [previous, next].forEach((button) => {
            button.addEventListener("click", () => {
                const card = track.querySelector(".photo-card");
                const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
                track.scrollBy({ left: step * Number(button.dataset.direction), behavior: "auto" });
            });
        });
        track.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
    });
}
