import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { renderPhotoTimeline } from "../sections/photo-timeline.js";
import { registerServiceWorker } from "../utils/pwa.js";

renderNavbar("photos");
renderPhotoTimeline(document.getElementById("photo-gallery"));
renderFooter();
registerServiceWorker();
