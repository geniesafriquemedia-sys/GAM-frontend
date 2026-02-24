# 📱 Documentation PWA - GAM (Génies D'Afrique Media)

## Vue d'ensemble

GAM est maintenant une **Progressive Web App (PWA)** complète qui offre une expérience d'application native sur tous les appareils (mobile, tablette, desktop).

## ✨ Fonctionnalités PWA implémentées

### 1. Installation sur l'écran d'accueil
- ✅ Notification d'installation personnalisée selon le terminal (mobile/tablette/desktop)
- ✅ Détection automatique du type d'appareil
- ✅ Gestion intelligente des refus (rappel après 7 jours)
- ✅ Support iOS (Apple) et Android (Chrome)

### 2. Mode hors ligne
- ✅ Service Worker avec stratégies de cache avancées
- ✅ Page offline dédiée (/offline)
- ✅ Cache des images et ressources statiques
- ✅ Synchronisation automatique quand la connexion revient

### 3. Icônes et design
- ✅ 8 tailles d'icônes générées (72px à 512px)
- ✅ Support maskable icons pour Android
- ✅ Apple Touch Icons pour iOS
- ✅ Splash screens pour iOS

### 4. Meta tags et configuration
- ✅ Manifest.json complet
- ✅ Meta tags PWA et Apple
- ✅ Theme color adaptatif (mode clair/sombre)
- ✅ Viewport optimisé

## 📁 Structure des fichiers

```
GAM-frontend/
├── public/
│   ├── manifest.json           # Configuration PWA
│   ├── sw.js                   # Service Worker
│   └── icons/                  # Icônes PWA (8 tailles)
│       ├── icon-72x72.png
│       ├── icon-96x96.png
│       ├── icon-128x128.png
│       ├── icon-144x144.png
│       ├── icon-152x152.png
│       ├── icon-192x192.png
│       ├── icon-384x384.png
│       └── icon-512x512.png
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Meta tags PWA
│   │   └── offline/
│   │       └── page.tsx        # Page hors ligne
│   ├── components/
│   │   ├── PWAInstallPrompt.tsx # Notification d'installation
│   │   └── PWARegister.tsx      # Enregistrement SW
│   └── lib/
│       └── pwa.ts              # Utilitaires PWA
└── scripts/
    └── generate-icons.js       # Génération d'icônes
```

## 🚀 Fonctionnement

### Service Worker (sw.js)

Le Service Worker utilise 3 stratégies de cache :

1. **Network First** (HTML/Pages)
   - Essaie d'abord le réseau
   - Tombe sur le cache en cas d'échec
   - Redirige vers /offline si aucun cache

2. **Cache First** (Images)
   - Vérifie d'abord le cache
   - Télécharge et cache si pas disponible
   - Image par défaut en cas d'erreur

3. **Network Only** (API)
   - Toujours en ligne pour les données fraîches
   - Retourne erreur 503 si hors ligne

### Composant PWAInstallPrompt

Le composant affiche intelligemment la notification d'installation :

- **Mobile** : "Installez GAM sur votre téléphone..."
- **Tablette** : "Installez GAM sur votre tablette..."
- **Desktop** : "Installez GAM sur votre ordinateur..."

Caractéristiques :
- Affichage après 3 secondes de navigation
- Mémorisation des refus (rappel après 7 jours)
- Détection si déjà installé
- Design responsive avec animations

## 📱 Installation utilisateur

### Sur Android (Chrome)

1. Ouvrir le site dans Chrome
2. Attendre la notification d'installation (3 secondes)
3. Cliquer sur "Installer"
4. L'icône GAM apparaît sur l'écran d'accueil

**Alternative** : Menu Chrome → "Installer l'application"

### Sur iOS (Safari)

1. Ouvrir le site dans Safari
2. Appuyer sur le bouton "Partager" 📤
3. Sélectionner "Sur l'écran d'accueil"
4. Confirmer l'installation

### Sur Desktop (Chrome/Edge)

1. Ouvrir le site
2. Cliquer sur l'icône d'installation dans la barre d'adresse
3. Ou attendre la notification automatique
4. Confirmer l'installation

## 🧪 Tests

### Test en local

```bash
# Démarrer le serveur
npm run dev

# Ouvrir dans le navigateur
http://localhost:3001

# Tester l'installation :
1. Ouvrir les DevTools (F12)
2. Onglet "Application" → "Service Workers"
3. Vérifier l'enregistrement du SW
4. Onglet "Manifest" → Vérifier les icônes
```

### Test du mode offline

```bash
# Dans DevTools :
1. Onglet "Network"
2. Cocher "Offline"
3. Recharger la page
4. Vérifier que la page offline s'affiche
```

### Test sur mobile réel

```bash
# Avec ngrok ou tunnel Cloudflare
1. Exposer le serveur local
2. Accéder via HTTPS (obligatoire pour PWA)
3. Tester l'installation
4. Tester le mode offline
```

## 🔧 Configuration

### Modifier le nom de l'app

Éditer `public/manifest.json` :

```json
{
  "name": "Votre nouveau nom",
  "short_name": "Nom court"
}
```

### Modifier les couleurs

Éditer `public/manifest.json` :

```json
{
  "background_color": "#ffffff",
  "theme_color": "#1a1a1a"
}
```

### Ajouter/supprimer des raccourcis

Éditer `public/manifest.json` → section `shortcuts`

## 🎨 Régénérer les icônes

Si vous changez le logo :

```bash
# 1. Remplacer public/images/logo.png
# 2. Régénérer les icônes
node scripts/generate-icons.js
```

## 📊 Audit PWA

### Avec Lighthouse

```bash
# Dans Chrome DevTools :
1. Onglet "Lighthouse"
2. Sélectionner "Progressive Web App"
3. Cliquer "Analyze page load"
4. Score cible : 90-100/100
```

### Critères PWA

- ✅ HTTPS (obligatoire)
- ✅ Service Worker enregistré
- ✅ Manifest.json valide
- ✅ Icônes 192x192 et 512x512
- ✅ Meta viewport
- ✅ Apple touch icon
- ✅ Mode hors ligne fonctionnel

## 🐛 Dépannage

### Le Service Worker ne s'enregistre pas

```javascript
// Vérifier dans la console :
if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker supporté');
} else {
  console.log('❌ Service Worker non supporté');
}
```

### L'installation ne s'affiche pas

Raisons possibles :
- Site déjà installé
- Utilisateur a refusé récemment (<7 jours)
- Critères PWA non remplis
- Navigateur non compatible

### Mode offline ne fonctionne pas

1. Vérifier que le SW est actif (DevTools → Application)
2. Vérifier le cache (DevTools → Application → Cache Storage)
3. Effacer le cache et recharger

## 🚀 Déploiement

### Prérequis

- ✅ HTTPS obligatoire (PWA ne fonctionne pas en HTTP)
- ✅ Service Worker accessible à la racine
- ✅ Manifest.json accessible

### Sur Railway (actuel)

La configuration est déjà prête :
- HTTPS activé par défaut
- Service Worker servi correctement
- Manifest accessible

### Vérification post-déploiement

```bash
# Tester les fichiers PWA
https://votre-domaine.com/manifest.json
https://votre-domaine.com/sw.js
https://votre-domaine.com/icons/icon-192x192.png
```

## 📈 Analytics PWA

Pour suivre les installations et l'utilisation :

```javascript
// Dans PWAInstallPrompt.tsx, ajouter :
window.gtag?.('event', 'pwa_install', {
  device_type: deviceType,
  outcome: 'accepted'
});
```

## 🔮 Améliorations futures

- [ ] Notifications Push
- [ ] Synchronisation en arrière-plan
- [ ] Partage natif (Web Share API)
- [ ] Raccourcis clavier
- [ ] Mode picture-in-picture pour vidéos
- [ ] Badge d'application (nombre de notifications)

## 📚 Ressources

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox - Service Worker](https://developer.chrome.com/docs/workbox/)
- [PWA Builder](https://www.pwabuilder.com/)

---

**Auteur** : Équipe GAM  
**Date** : 2026-02-24  
**Version** : 1.0.0
