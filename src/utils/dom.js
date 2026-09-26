// Tiny DOM helpers to avoid repeating boilerplate across pages.
export function qs(selector, root = document) {
    return root.querySelector(selector);
}

export function el(tag, attrs = {}, html = "") {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (key === "class") node.className = value;
        else node.setAttribute(key, value);
    }
    if (html) node.innerHTML = html;
    return node;
}

export function escapeHtml(str = "") {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
