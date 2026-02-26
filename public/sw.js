// Service Worker pour GAM PWA
// VERSION: v3 — bump this string on every deploy to purge stale caches
const CACHE_NAME = 'gam-pwa-v3';
const RUNTIME_CACHE = 'gam-runtime-v3';
const IMAGE_CACHE = 'gam-images-v3';

// Fichiers à mettre en cache lors de l'installation
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/images/geneis.png',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Renvoie true pour les requêtes RSC (React Server Component payload). */
function isRSCRequest(request) {
  const url = new URL(request.url);
  return (
    url.searchParams.has('_rsc') ||
    request.headers.get('RSC') === '1' ||
    request.headers.get('Next-Router-State-Tree') !== null
  );
}

/** Renvoie true pour les chunks JS/CSS de Next.js. */
function isNextChunk(url) {
  return url.pathname.startsWith('/_next/static/chunks/');
}

// ── Installation ──────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activation — purge les vieux caches ───────────────────────────────────────

self.addEventListener('activate', (event) => {
  const VALID_CACHES = new Set([CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => !VALID_CACHES.has(name))
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (!request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // 1. Requêtes API → Network Only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'Pas de connexion internet' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
        })
      )
    );
    return;
  }

  // 2. RSC payloads → Network Only (jamais mettre en cache : les IDs de modules
  //    changent à chaque build, un cache périmé provoque "e[o] is not a function")
  if (isRSCRequest(request)) {
    event.respondWith(fetch(request));
    return;
  }

  // 3. Chunks Next.js (/_next/static/chunks/) → Network First
  //    Les noms sont content-hashed donc immutables, mais on préfère le réseau
  //    pour qu'un nouveau build ne serve jamais un chunk d'un build précédent.
  if (isNextChunk(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (request.method === 'GET' && response.status === 200) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 4. Images → Cache First, puis Network
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (request.method === 'GET' && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cache.match('/images/logo.png'));
        })
      )
    );
    return;
  }

  // 5. Navigation HTML → Network First
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (request.method === 'GET' && response.status === 200) {
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/offline'))
        )
    );
    return;
  }

  // 6. Autres ressources (CSS hors chunks, fonts, etc.) → Cache First
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (request.method === 'GET' && response.status === 200) {
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, response.clone()));
        }
        return response;
      });
    })
  );
});

// ── Push notifications ─────────────────────────────────────────────────────────

self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nouvelle notification de GAM',
    icon: '/images/logo.png',
    badge: '/images/favicon.png',
    vibrate: [200, 100, 200],
    tag: 'gam-notification',
    requireInteraction: false,
  };
  event.waitUntil(
    self.registration.showNotification("GAM - Génies D'Afrique Media", options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
