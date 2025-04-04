self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('evasion-cache-v1').then((cache) => {
      return cache.addAll([
        'index.html',
        'style.css',
        'script.js',
        'image.html',
        'manifest.json',
        'images/chien.jpg',
        'images/chat.jpg',
        'images/soleil.jpg',
        'icons/icon-192.png',
        'icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
