const ASSETS = [
    "sw.js",
    "sw2.js",
    "index.html",
    "sys41.min.js",
    "manifest.json",
    "404.html",
    "favicon.ico",
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("assets").then(cache => {
            return cache.addAll(ASSETS)
        })
    )
})
