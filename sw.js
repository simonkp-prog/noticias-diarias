// Service worker mínimo: cachea el caparazón de la app para uso offline,
// pero siempre busca el JSON de noticias fresco en la red (network-first).
const SHELL_CACHE = "nd-shell-v1";
const SHELL = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL_CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Noticias: red primero, cache como respaldo.
  if (url.pathname.includes("noticias.json")) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Caparazón: cache primero.
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
