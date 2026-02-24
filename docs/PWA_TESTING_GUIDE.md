# 🧪 Guide de Test PWA - GAM

Guide complet pour tester toutes les fonctionnalités PWA de GAM sur différents appareils.

**Version:** 1.1.0  
**Date:** 24 février 2026  
**Status:** ✅ Production Ready

---

## 📋 Résumé des fonctionnalités

### ✅ Implémenté
- ✅ Notification d'installation popup (3 secondes après chargement)
- ✅ Bouton "Installer l'app" dans le header
- ✅ Splash screen animé au lancement (mode standalone)
- ✅ 8 icônes PWA (72x72 à 512x512)
- ✅ 10 splash screens iOS/Android
- ✅ Service Worker avec cache intelligent
- ✅ Mode offline avec page dédiée
- ✅ Détection type d'appareil (mobile/tablet/desktop)
- ✅ Support iOS Safari avec instructions
- ✅ Ne pas redemander pendant 7 jours si refusé

---

## 1️⃣ Test sur Android

### 📱 Chrome Mobile (Recommandé)

#### Étapes d'installation

1. **Ouvrir le site**
   ```
   https://gam-frontend-production.up.railway.app/
   ```

2. **Méthode A: Notification automatique** ⭐ NOUVELLE
   - Attendre **3 secondes**
   - Une notification popup apparaît en bas à droite
   - Message: "Installez GAM sur votre téléphone pour un accès rapide..."
   - Cliquer sur **"Installer"**
   - Confirmer l'installation

3. **Méthode B: Bouton header** ⭐ NOUVELLE
   - Chercher le bouton avec icône téléchargement (⬇) dans le header
   - Cliquer dessus
   - Confirmer l'installation

4. **Méthode C: Menu Chrome**
   - Menu ⋮ (3 points verticaux)
   - "Installer l'application"
   - Confirmer

#### ✅ Vérifications

- [ ] **Icône sur écran d'accueil**: Logo GAM visible
- [ ] **Splash screen animé** au premier lancement:
  - Logo GAM avec rotation 3D
  - Effet de brillance qui traverse
  - Animation de pulsation
  - Barre de progression
  - Durée ~2.5 secondes
- [ ] **Mode app**: Pas de barre d'adresse Chrome
- [ ] **Fonctionnement offline**: Fermer WiFi → Pages visitées accessibles
- [ ] **Performance**: Chargement instantané

---

## 2️⃣ Test sur iOS

### 🍎 Safari Mobile

#### Étapes d'installation

1. **Ouvrir le site dans Safari**
   ```
   https://gam-frontend-production.up.railway.app/
   ```

2. **Notification apparaît** ⭐ NOUVELLE
   - Après **3 secondes**, notification popup affichée
   - Message spécial iOS: "Appuyez sur le bouton Partager puis 'Sur l'écran d'accueil'"
   - Suivre les instructions

3. **Installation manuelle**
   - Appuyer sur l'icône **Partager** (carré avec flèche ↑)
   - Faire défiler vers le bas
   - Appuyer sur **"Sur l'écran d'accueil"**
   - Modifier le nom si souhaité
   - Appuyer sur **"Ajouter"**

#### ✅ Vérifications

- [ ] **Notification avec instructions iOS** s'affiche
- [ ] **Icône sur écran d'accueil**: Logo GAM
- [ ] **Splash screen iOS natif** (fond blanc + logo)
- [ ] **Pas de barre Safari** en mode app
- [ ] **Barre de statut** couleur personnalisée
- [ ] **Mode standalone** détecté

---

## 3️⃣ Test sur Desktop

### 💻 Windows/Mac/Linux (Chrome/Edge)

#### Étapes d'installation

1. **Ouvrir le site**
   ```
   https://gam-frontend-production.up.railway.app/
   ```

2. **Méthode A: Notification popup** ⭐ NOUVELLE
   - Attendre **3 secondes**
   - Notification en bas à droite
   - Message: "Installez GAM sur votre ordinateur pour un accès direct..."
   - Cliquer **"Installer"**

3. **Méthode B: Bouton header** ⭐ NOUVELLE
   - Bouton "Installer l'app" visible dans le header
   - Cliquer dessus

4. **Méthode C: Icône barre d'adresse**
   - Icône ⊕ ou 💻 à droite de la barre d'adresse
   - Cliquer → "Installer"

5. **Méthode D: Menu navigateur**
   - Chrome: Menu ⋮ → "Installer GAM..."
   - Edge: Menu ⋯ → "Applications" → "Installer ce site en tant qu'application"

#### ✅ Vérifications

- [ ] **Application installée**: Visible dans menu Démarrer/Applications
- [ ] **Fenêtre dédiée**: S'ouvre séparément du navigateur
- [ ] **Icône barre des tâches/dock**
- [ ] **Splash screen au premier lancement**:
  - Animation logo 3D
  - Effet de brillance
  - Barre de progression
- [ ] **Raccourci bureau** (optionnel selon OS)

---

## 4️⃣ Test Mode Offline

### 📡 Vérification cache et offline

#### Scénario de test

1. **Installation** (voir sections ci-dessus)
2. **Navigation**:
   - Visiter page d'accueil
   - Visiter 2-3 articles
   - Visiter Web TV
3. **Désactiver connexion**:
   - Mobile: Mode Avion
   - Desktop: Désactiver WiFi
4. **Rouvrir l'app** (fermer complètement puis rouvrir)
5. **Naviguer dans pages visitées**

#### ✅ Vérifications

- [ ] **Pages visitées**: Affichées depuis le cache
- [ ] **Images**: Chargées depuis le cache
- [ ] **Nouvelle page non visitée**: Page "Vous êtes hors ligne" s'affiche
- [ ] **Message clair**: "Vérifiez votre connexion internet"
- [ ] **Bouton "Réessayer"** présent
- [ ] **Réactivation connexion**: Tout fonctionne normalement

---

## 5️⃣ Test Notification d'installation

### 🔔 Comportement de la popup

#### Scénario A: Première visite

1. Ouvrir le site (jamais visité avant)
2. Attendre **3 secondes**
3. **Popup apparaît** en bas à droite

#### ✅ Vérifications notification

- [ ] **Délai**: Apparaît après exactement 3 secondes
- [ ] **Position**: Bas à droite (mobile: pleine largeur en bas)
- [ ] **Icône**: Smartphone 📱 / Tablette / Desktop 💻 selon appareil
- [ ] **Message adapté** au type d'appareil
- [ ] **Boutons**:
  - "Installer" (principal, avec icône ⬇)
  - "Plus tard" (secondaire)
  - "✕" (fermer)
- [ ] **Avantages affichés**: ✓ Accès rapide ✓ Mode hors ligne ✓ Notifications

#### Scénario B: Refus d'installation

1. Cliquer sur **"Plus tard"** ou **"✕"**
2. Recharger la page
3. **Ne doit PAS réapparaître** pendant 7 jours

#### Scénario C: Installation réussie

1. Cliquer sur **"Installer"**
2. Confirmer dans la popup native
3. Rouvrir le site
4. **Popup ne s'affiche plus** (app déjà installée)

---

## 6️⃣ Test Splash Screen Animé

### 🎨 Animation de démarrage

#### Prérequis
- App **doit être installée** (mode standalone)
- Test au **premier lancement** de la session

#### Étapes

1. Installer l'app (voir sections 1-3)
2. **Fermer complètement** l'application
3. **Rouvrir** depuis l'écran d'accueil/menu

#### ✅ Vérifications animations

**Phase 1: Apparition (0-0.8s)**
- [ ] Logo apparaît avec rotation 3D (rotateY: -180° → 0°)
- [ ] Effet bounce (rebond élastique)
- [ ] Opacité 0 → 1

**Phase 2: Animations continues (0.8-2.5s)**
- [ ] Logo monte et descend doucement (floating)
- [ ] Effet de brillance traverse le logo (1.5s)
- [ ] Cercles concentriques pulsent en arrière-plan
- [ ] Texte "Génies d'Afrique Media" pulse (opacity)
- [ ] Slogan apparaît avec fondu

**Phase 3: Progression (1-2.5s)**
- [ ] Barre de progression: 0% → 100%
- [ ] 3 points de chargement animés (pulsation décalée)

**Phase 4: Sortie (2.5s)**
- [ ] Fondu sortie fluide (opacity: 1 → 0)
- [ ] Transition vers app (0.5s)

#### ⏱️ Timing
- **Durée totale**: ~2.5 secondes
- **Pas de blocage**: L'app charge en arrière-plan
- **Smooth**: 60 FPS, pas de saccades

---

## 7️⃣ Test DevTools (Développeurs)

### 🛠️ Chrome DevTools

#### Manifest

1. F12 → Onglet **"Application"**
2. Section **"Manifest"**

**Vérifier:**
- [ ] Name: "GAM - Génies D'Afrique Media"
- [ ] Short name: "GAM"
- [ ] Start URL: "/"
- [ ] Display: "standalone"
- [ ] Theme color: "#1a1a1a"
- [ ] Icons: 8 icônes (72-512px)
- [ ] Shortcuts: 4 raccourcis
- [ ] Categories: news, entertainment

#### Service Worker

1. Onglet **"Application"** → **"Service Workers"**

**Vérifier:**
- [ ] Status: **Activated and running**
- [ ] Source: `/sw.js`
- [ ] Version: GAM_CACHE_V1

#### Cache Storage

1. Onglet **"Application"** → **"Cache Storage"**

**Vérifier:**
- [ ] Cache "GAM_CACHE_V1" créé
- [ ] Contient: `/`, `/offline`, icônes, images

#### Console

**Vérifier logs:**
```
PWA: Init { standalone: false, isIOS: false, shouldShow: true }
PWA: beforeinstallprompt event fired
PWA: Showing install prompt
```

### 🔍 Lighthouse Audit

1. F12 → Onglet **"Lighthouse"**
2. Cocher **"Progressive Web App"**
3. Cliquer **"Generate report"**

#### ✅ Critères de succès

**PWA Score: > 90%**

- [ ] **Installable**: 
  - ✅ Registers a service worker
  - ✅ Responds with 200 when offline
  - ✅ Has a valid manifest
  - ✅ Icons for all platforms

- [ ] **PWA Optimized**:
  - ✅ Viewport meta tag
  - ✅ Theme color meta tag
  - ✅ Apple touch icon
  - ✅ Maskable icon

- [ ] **Performance**:
  - ✅ First Contentful Paint < 2s
  - ✅ Speed Index < 3s
  - ✅ Total Blocking Time < 300ms

---

## 8️⃣ Test Bouton d'installation Header

### 🔘 Bouton permanent

#### Visibilité

**Desktop:**
- [ ] Visible à gauche du bouton de recherche
- [ ] Texte: "Installer l'app" (écrans larges)
- [ ] Icône ⬇ uniquement (écrans moyens)

**Mobile:**
- [ ] Masqué (utiliser notification popup)

#### Comportement

1. **Avant installation**:
   - [ ] Bouton visible
   - [ ] Au clic → Popup native d'installation

2. **Après installation**:
   - [ ] Bouton disparaît automatiquement

3. **iOS Safari**:
   - [ ] Au clic → Alert avec instructions
   - [ ] Message: "Pour installer GAM sur iOS: 1. Appuyez sur Partager..."

---

## 9️⃣ Checklist finale complète

### Infrastructure

- [ ] HTTPS activé (Railway)
- [ ] `/manifest.json` accessible
- [ ] `/sw.js` accessible
- [ ] Toutes les icônes chargent (Network tab)
- [ ] Tous les splash screens en place

### Installation

- [ ] Android Chrome: ✅
- [ ] Android Edge: ✅
- [ ] iOS Safari: ✅
- [ ] Desktop Chrome: ✅
- [ ] Desktop Edge: ✅
- [ ] Desktop Opera: ✅

### Notification popup

- [ ] Apparaît après 3 secondes
- [ ] Message adapté à l'appareil
- [ ] Boutons fonctionnels
- [ ] Ne réapparaît pas si refusé (7j)
- [ ] Disparaît après installation

### Bouton header

- [ ] Visible sur desktop
- [ ] Fonctionne (Chrome/Edge)
- [ ] Instructions iOS (Safari)
- [ ] Disparaît après installation

### Splash screen

- [ ] Apparaît au premier lancement (standalone)
- [ ] Animations fluides (60 FPS)
- [ ] Durée correcte (~2.5s)
- [ ] Logo animé professionnellement
- [ ] Transition fluide vers app

### Mode offline

- [ ] Service Worker activé
- [ ] Cache fonctionne
- [ ] Page offline s'affiche
- [ ] Retour online: sync automatique

### Performance

- [ ] Lighthouse PWA > 90%
- [ ] Pas d'erreurs console
- [ ] Chargement < 3s
- [ ] Navigation fluide

---

## 🎯 URLs de test

### Production
```
https://gam-frontend-production.up.railway.app/
```

### Local (avec tunnel HTTPS)
```bash
cd tunnel
powershell ./Launch-Tunnels.ps1
# Utiliser l'URL Cloudflare affichée
```

### Local (sans PWA - HTTP uniquement)
```
http://localhost:3001
```

---

## 📊 Résultats attendus

### Lighthouse PWA Audit

| Critère | Score attendu |
|---------|--------------|
| **PWA Total** | ≥ 90% |
| Installable | ✅ 100% |
| PWA Optimized | ✅ 100% |
| Service Worker | ✅ Registered |
| Offline Ready | ✅ Yes |
| Fast Loading | ≥ 90% |
| HTTPS | ✅ Yes |

### Compatibilité navigateurs

| Navigateur | Installation | Notification | Splash | Offline |
|------------|--------------|--------------|--------|---------|
| Chrome Android | ✅ | ✅ | ✅ | ✅ |
| Safari iOS | ✅ | ✅ (instructions) | ✅ | ✅ |
| Chrome Desktop | ✅ | ✅ | ✅ | ✅ |
| Edge Desktop | ✅ | ✅ | ✅ | ✅ |
| Firefox Android | ⚠️ | ❌ | ✅ | ✅ |
| Samsung Internet | ✅ | ✅ | ✅ | ✅ |

**Légende:** ✅ Full support | ⚠️ Partial support | ❌ Not supported

---

## 🐛 Problèmes connus et solutions

### Notification ne s'affiche pas

**Causes possibles:**
1. App déjà installée → Normal
2. Refusé récemment → Attendre 7 jours ou clear localStorage
3. Navigateur non compatible → Utiliser Chrome/Edge
4. HTTP au lieu de HTTPS → Déployer sur Railway

**Solution:**
```javascript
// Clear localStorage pour reset
localStorage.removeItem('pwa-install-declined');
// Recharger la page
```

### Splash screen ne s'affiche pas

**Causes:**
1. Pas en mode standalone → Installer l'app d'abord
2. Déjà affiché dans la session → Fermer complètement l'app et rouvrir
3. sessionStorage présent → Clear storage

**Solution:**
```javascript
// Reset splash screen
sessionStorage.removeItem('pwa-splash-seen');
// Relancer l'app
```

### Service Worker ne s'active pas

**Solution:**
1. DevTools → Application → Service Workers
2. Cliquer "Unregister"
3. Recharger la page
4. Vérifier activation

---

## 📞 Support

Pour tout problème:
1. Vérifier cette checklist
2. Consulter les logs console (F12)
3. Vérifier Lighthouse audit
4. Contacter l'équipe dev avec screenshots

---

**Dernière mise à jour:** 24 février 2026  
**Auteur:** Équipe GAM Dev  
**Version PWA:** 1.1.0
