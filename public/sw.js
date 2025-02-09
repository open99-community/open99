const RUNTIME = "WEB_OFFLINE_RUNTIME"
const HOSTNAME_WHITELIST = [
    self.location.hostname,
]

// The Util Function to hack URLs of intercepted requests
const getFixedUrl = (req) => {
    let now = Date.now()
    let url = new URL(req.url)

    url.protocol = self.location.protocol

    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? "&" : "?") + "cache-bust=" + now
    }
    return url.href
}

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", event => {
    // Skip some of cross-origin requests, like those for Google Analytics.
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
        try {
            const cached = caches.match(event.request)
            const fixedUrl = getFixedUrl(event.request)
            const fetched = fetch(fixedUrl, {cache: "no-store"})
            const fetchedCopy = fetched.then(resp => resp.clone())

            event.respondWith(
                Promise.race([fetched.catch(), cached])
                    .then(resp => resp || fetched)
            )

            // Update the cache with the version we fetched (only for ok status)
            event.waitUntil(
                Promise.all([fetchedCopy, caches.open(RUNTIME)])
                    .then(([response, cache]) => response.ok && cache.put(event.request, response))
            )
        } catch {
            //oh well, the network probably was offline
        }
    }
})