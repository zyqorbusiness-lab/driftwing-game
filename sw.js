// Driftwing offline cache - v1 (2026-10-30)
const CACHE = 'dw-static-v4-2026-11-10';
const ASSETS = [
  '/',
  '/index.html',
  '/14-valley.jpg',
  '/15-wing-up.png',
  '/16-wing-level.png',
  '/17-wing-down.png',
  '/18-pillar-left.png',
  '/19-pillar-right.png',
  '/20-seed.png',
  '/icon.svg',
  '/loc-01.jpg',
  '/loc-02.jpg',
  '/loc-03.jpg',
  '/loc-04.jpg',
  '/loc-05.jpg',
  '/loc-06.jpg',
  '/loc-07.jpg',
  '/loc-08.jpg',
  '/loc-09.jpg',
  '/loc-10.jpg',
  '/loc-11.jpg',
  '/loc-12.jpg',
  '/loc-13.jpg',
  '/loc-14.jpg',
  '/loc-15.jpg',
  '/loc-16.jpg',
  '/loc-17.jpg',
  '/loc-18.jpg',
  '/loc-19.jpg',
  '/loc-20.jpg',
  '/loc-21.jpg',
  '/loc-22.jpg',
  '/loc-23.jpg',
  '/loc-24.jpg',
  '/loc-25.jpg',
  '/loc-26.jpg',
  '/loc-27.jpg',
  '/loc-28.jpg',
  '/loc-29.jpg',
  '/loc-30.jpg',
  '/loc-31.jpg',
  '/loc-32.jpg',
  '/loc-33.jpg',
  '/loc-34.jpg',
  '/loc-35.jpg',
  '/loc-36.jpg',
  '/loc-37.jpg',
  '/loc-38.jpg',
  '/loc-39.jpg',
  '/loc-40.jpg',
  '/loc-41.jpg',
  '/loc-42.jpg',
  '/loc-43.jpg',
  '/loc-44.jpg',
  '/loc-45.jpg',
  '/loc-46.jpg',
  '/loc-47.jpg',
  '/loc-48.jpg',
  '/loc-49.jpg',
  '/loc-50.jpg',
  '/manifest.webmanifest',
  '/sw.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('dw-static-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => req.mode === 'navigate' ? caches.match('/index.html') : Response.error());
    })
  );
});
