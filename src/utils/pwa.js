// Registers the service worker for offline support and asset caching.
export function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").catch((err) => {
            console.warn("Service worker registration failed:", err);
        });
    });
}
