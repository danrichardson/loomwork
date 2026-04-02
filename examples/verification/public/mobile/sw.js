// Loomwork Mobile — Service Worker (minimal)
// Caches the app shell for offline access

const CACHE_NAME = "loomwork-mobile-v1";
const SHELL_URLS = ["/mobile/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only cache navigations to /mobile — let API calls pass through
  const pathname = new URL(event.request.url).pathname;
  if (
    event.request.mode === "navigate" &&
    (pathname === "/mobile" || pathname.startsWith("/mobile/"))
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetched = fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
        return cached || fetched;
      })
    );
  }
});
