import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { renderNotes } from "../sections/notes-section.js";
import { registerServiceWorker } from "../utils/pwa.js";

renderNavbar("notes");
renderNotes();
renderFooter();
registerServiceWorker();
