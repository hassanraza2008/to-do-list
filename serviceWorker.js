const staticToDoList = "to-do-list-site-v1";

const assets = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/images/icon.png",
    "/images/unchecked.png",
    "/images/checked.png"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
     caches.open(staticToDoList).then(cache => {
         cache.addAll(assets)
     })
    )
 });