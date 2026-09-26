import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { renderLinks } from "../sections/links-section.js";
import { registerServiceWorker } from "../utils/pwa.js";

renderNavbar("links");
renderLinks();
renderFooter();
registerServiceWorker();
