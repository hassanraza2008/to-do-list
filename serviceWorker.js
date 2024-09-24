// Define the cache name for the static assets
const staticToDoList = "to-do-list-site-v1";

// List of assets to cache
const assets = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/icon.png",
  "/images/unchecked.png",
  "/images/checked.png",
];

// Install event - caching the static assets
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticToDoList).then((cache) => {
      cache.addAll(assets); // Add all specified assets to the cache
    })
  );
});

// Fetch event - serving cached assets if available
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request); // Return cached asset or fetch from network if not in cache
    })
  );
});
