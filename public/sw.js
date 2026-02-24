// Service Worker pour GAM PWA
const CACHE_NAME = 'gam-pwa-v1';
const RUNTIME_CACHE = 'gam-runtime-v1';
const IMAGE_CACHE = 'gam-images-v1';

// Fichiers à mettre en cache lors de l'installation
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/images/geneis.png',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation du Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Mise en cache des ressources statiques');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation du Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && 
                   cacheName !== RUNTIME_CACHE && 
                   cacheName !== IMAGE_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Suppression du cache obsolète:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de cache pour les requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }

  // Ignorer les requêtes API (toujours en ligne)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return new Response(
            JSON.stringify({ error: 'Pas de connexion internet' }),
            { 
              headers: { 'Content-Type': 'application/json' },
              status: 503 
            }
          );
        })
    );
    return;
  }

  // Stratégie pour les images: Cache First, puis Network
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            // Mettre en cache seulement les images GET avec succès
            if (request.method === 'GET' && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Image par défaut en cas d'erreur
            return cache.match('/images/logo.png');
          });
        });
      })
    );
    return;
  }

  // Stratégie Network First pour le contenu HTML
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettre en cache seulement les pages GET avec succès
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Retourner la version en cache ou la page offline
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/offline');
          });
        })
    );
    return;
  }

  // Stratégie Cache First pour les autres ressources (CSS, JS, fonts)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        // Mettre en cache seulement les requêtes GET
        if (request.method === 'GET' && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
});

// Gestion des notifications push (pour future implémentation)
self.addEventListener('push', (event) => {
  console.log('[SW] Notification Push reçue');
  const options = {
    body: event.data?.text() || 'Nouvelle notification de GAM',
    icon: '/images/logo.png',
    badge: '/images/favicon.png',
    vibrate: [200, 100, 200],
    tag: 'gam-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('GAM - Génies D\'Afrique Media', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Clic sur notification');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
