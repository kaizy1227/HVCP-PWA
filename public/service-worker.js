self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('hvcp-v1').then((cache) => cache.add('/'))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
