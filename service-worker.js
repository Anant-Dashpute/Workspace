// Minimal service worker: cache-first for static assets, network-first for data.
const CACHE_NAME = "workspace-cache-v2";

const CORE_ASSETS = [
    "./",
    "index.html",
    "notes.html",
    "links.html",
    "blogs.html",
    "concepts.html",
    "research-papers.html",
    "projects.html",
    "offline.html",
    "manifest.json",
    "logo.jpg",
    "src/styles/main.css",
    "src/data/profile.js",
    "src/data/timeline.js",
    "src/data/achievements.js",
    "src/data/certifications.js",
    "src/data/links.js",
    "src/data/nav.js",
    "src/components/navbar.js",
    "src/components/footer.js",
    "src/sections/hero.js",
    "src/sections/about.js",
    "src/sections/notes-section.js",
    "src/sections/links-section.js",
    "src/pages/home.js",
    "src/pages/notes-page.js",
    "src/pages/links-page.js",
    "src/pages/content-page.js",
    "src/utils/dom.js",
    "src/utils/pwa.js",
    "src/utils/icons.js",
    "content/generated/notes.json",
    "content/generated/blogs.json",
    "content/generated/concepts.json",
    "content/generated/projects.json",
    "content/generated/research-papers.json",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    event.respondWith(
        caches.match(request).then((cached) => {
            const networkFetch = fetch(request)
                .then((response) => {
                    if (response && response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    }
                    return response;
                })
                .catch(() => cached || caches.match("offline.html"));

            return cached || networkFetch;
        })
    );
});
