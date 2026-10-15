import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { renderHero } from "../sections/hero.js";
import { renderAbout } from "../sections/about.js";
import { renderPublications } from "../sections/publications.js";
import { renderPhotoTimeline } from "../sections/photo-timeline.js";
import { registerServiceWorker } from "../utils/pwa.js";

renderNavbar("home");
renderHero();
renderAbout();
renderPhotoTimeline(document.getElementById("photo-gallery"));
renderPublications();
renderFooter();
registerServiceWorker();
