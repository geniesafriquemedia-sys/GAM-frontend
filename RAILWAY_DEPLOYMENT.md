# 🚂 Guide de Déploiement Railway - GAM Frontend

## ✅ Corrections Appliquées

### 1. **Dockerfile Corrigé**
- ✅ Healthcheck amélioré (utilise Node au lieu de wget)
- ✅ Configuration correcte pour Next.js standalone build
- ✅ Le `server.js` sera généré automatiquement par Next.js dans `.next/standalone/`

### 2. **Variables d'Environnement Production**
Le fichier `.env.production` a été mis à jour avec les variables nécessaires.

## 📋 Configuration Railway

### Variables d'Environnement à Définir sur Railway

Dans votre projet Railway, allez dans **Variables** et ajoutez :

```bash
# Node Environment
NODE_ENV=production

# URLs Backend (remplacez par votre URL Railway backend réelle)
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api/v1
NEXT_PUBLIC_MEDIA_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.railway.app

# Build Configuration
SKIP_BUILD_STATIC_GENERATION=1
NEXT_BUILD_SKIP_EXPORT=true
NEXT_TELEMETRY_DISABLED=1

# Port (Railway le gère automatiquement, mais pour être sûr)
PORT=3000
```

### 🔑 Variables Critiques à Remplacer

**IMPORTANT** : Remplacez ces valeurs par vos URLs réelles Railway :

1. **`NEXT_PUBLIC_API_URL`** → URL de votre backend Django/Wagtail sur Railway
   - Format: `https://votre-backend.railway.app/api/v1`
   
2. **`NEXT_PUBLIC_MEDIA_URL`** → URL pour les fichiers média
   - Format: `https://votre-backend.railway.app`
   
3. **`NEXT_PUBLIC_SITE_URL`** → URL de votre frontend
   - Format: `https://votre-frontend.railway.app`

## 🚀 Étapes de Déploiement

### Option 1: Push Automatique (Recommandé)

1. **Commit les changements**:
   ```bash
   git add .
   git commit -m "fix: Correct Dockerfile for Next.js standalone production build"
   git push origin main
   ```

2. **Railway va automatiquement**:
   - Détecter le push
   - Lancer le build avec le nouveau Dockerfile
   - Créer le build standalone de Next.js
   - Déployer le container

### Option 2: Redéploiement Manuel

1. Dans Railway Dashboard → Votre projet
2. Cliquez sur **Deploy** → **Redeploy**
3. Attendez que le build se termine

## 🔍 Vérification du Déploiement

### 1. Vérifier les Logs de Build

Dans Railway, allez dans **Deployments** et vérifiez que :

```
✅ npm run build
✅ Creating an optimized production build...
✅ Standalone build created
✅ Server.js generated
```

### 2. Vérifier les Logs Runtime

Une fois déployé, vérifiez les logs :

```
✅ Starting Container
✅ Server listening on http://0.0.0.0:3000
✅ Ready in X ms
```

### 3. Tester l'Application

Visitez votre URL Railway et vérifiez :
- ✅ La page d'accueil se charge
- ✅ Les articles s'affichent (connexion au backend)
- ✅ Les images se chargent
- ✅ La navigation fonctionne

## ⚠️ Troubleshooting

### Si `server.js` n'existe toujours pas :

1. **Vérifier que `output: 'standalone'` est dans next.config.ts** ✅ (Déjà configuré)

2. **Vérifier les logs de build** :
   ```
   Recherchez: "Creating an optimized production build"
   ```

3. **Vérifier que le build se termine sans erreur**

### Si le build échoue :

1. **Vérifier les variables d'environnement Railway**
   - Toutes les `NEXT_PUBLIC_*` doivent être définies

2. **Vérifier les logs pour les erreurs de dépendances**

3. **S'assurer que le backend est accessible pendant le build**
   - Next.js essaie parfois de fetch des données au build

## 📊 Structure du Build Standalone

Après le build, Next.js crée :

```
.next/standalone/
├── server.js          ← Point d'entrée principal
├── package.json
├── node_modules/
└── .next/
    └── ...

.next/static/          ← Assets statiques (CSS, JS, images)
```

Le Dockerfile copie ces deux éléments dans `/app/`.

## 🎯 Commandes Utiles Railway CLI

Si vous utilisez Railway CLI :

```bash
# Se connecter
railway login

# Lier le projet
railway link

# Voir les logs en temps réel
railway logs

# Définir une variable
railway variables set NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1

# Redéployer
railway up
```

## ✨ Prochaines Étapes

Une fois le déploiement réussi :

1. ✅ Configurer un domaine personnalisé
2. ✅ Activer le SSL (automatique sur Railway)
3. ✅ Configurer les variables d'environnement finales
4. ✅ Tester toutes les fonctionnalités
5. ✅ Configurer le monitoring

---

**Besoin d'aide ?** Vérifiez les logs Railway ou contactez le support.
