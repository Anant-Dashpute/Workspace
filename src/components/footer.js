// Renders the shared site footer into <footer id="app-footer"> on every page.
export function renderFooter() {
    const footer = document.getElementById("app-footer");
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
    <div class="footer-inner">
      <p>&copy; ${year} Workspace. Built with plain HTML, CSS &amp; JS.</p>
      <a href="links.html">Find me online →</a>
    </div>
  `;
}
