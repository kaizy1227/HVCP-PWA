const CACHE = 'hvcp-v1';
self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(resp =>
        resp || fetch(e.request).then(net => {
          // Cache GET requests
          if (e.request.method === 'GET') cache.put(e.request, net.clone());
          return net;
        })
      )
    )
  );
});
