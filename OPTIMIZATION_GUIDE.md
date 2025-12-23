# 🚀 Guide d'Optimisation Performance GAM Frontend

## Table des Matières
1. [Diagnostic](#diagnostic)
2. [Optimisations Critiques](#optimisations-critiques)
3. [Checklist d'Actions](#checklist-dactions)
4. [Architecture Cible](#architecture-cible)
5. [Commandes Utiles](#commandes-utiles)

---

## Diagnostic

### Problèmes Identifiés

| Problème | Impact | Fichiers |
|----------|--------|----------|
| 56+ fichiers "use client" inutiles | 🔴 Critique | Pages, composants |
| JSON.stringify() dans useCallback deps | 🟠 Moyen | hooks/api/*.ts |
| Header.tsx monolithique (314 lignes) | 🟠 Moyen | components/Header.tsx |
| Pas de SSR sur homepage | 🔴 Critique | app/page.tsx |
| framer-motion partout (~40KB) | 🟡 Faible | 48 fichiers |
| Dépendances inutilisées | 🟡 Faible | package.json |

---

## Optimisations Critiques

### 1. Convertir les Pages en Server Components

#### ❌ AVANT - page.tsx (Client Component)
```tsx
"use client";
import { useArticles } from "@/hooks";

export default function Home() {
  const { articles, isLoading } = useArticles({...});
  // Problèmes:
  // - Tout le JS envoyé au client
  // - Cascade de requêtes API
  // - Pas de SEO (contenu généré côté client)
}
```

#### ✅ APRÈS - page.tsx (Server Component)
```tsx
// Pas de "use client" = Server Component
import { api } from "@/lib/api";

export const revalidate = 300; // ISR 5 min

export default async function Home() {
  // Fetch parallèle côté serveur
  const [articles, videos] = await Promise.all([
    api.articles.getAllServer({ page_size: 4 }),
    api.videos.getAllServer({ page_size: 2 }),
  ]);

  return <HomePage articles={articles} videos={videos} />;
}
```

### 2. Corriger les Dépendances des Hooks

#### ❌ AVANT - use-articles.ts
```tsx
const fetchArticles = useCallback(
  () => api.articles.getAll(params),
  [JSON.stringify(params)]  // ❌ Crée une nouvelle string à chaque render
);
```

#### ✅ APRÈS - use-articles.ts
```tsx
const fetchArticles = useCallback(
  () => api.articles.getAll(params),
  [params.page, params.page_size, params.category_slug, params.ordering]
);
```

### 3. Découper le Header Monolithique

#### ❌ AVANT - Header.tsx (314 lignes)
```tsx
"use client";
// 17 imports d'icônes
// 3 hooks API
// Navigation + Search + Categories + Social

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { videos: liveVideos } = useVideos({...});
  const { data: trendingTags } = useTrendingTags(5);
  // 300+ lignes de JSX...
}
```

#### ✅ APRÈS - Architecture modulaire
```
components/
├── header/
│   ├── Header.tsx          # Wrapper Server Component
│   ├── Navigation.tsx      # Links statiques
│   ├── SearchBar.client.tsx   # "use client" - interactivité
│   ├── LiveIndicator.client.tsx # "use client" - temps réel
│   └── MobileMenu.client.tsx   # "use client" - drawer
```

### 4. Optimiser les Images

#### ❌ AVANT
```tsx
<Image
  src={url}
  alt={title}
  fill  // Sans sizes = télécharge la plus grande image
/>
```

#### ✅ APRÈS
```tsx
<Image
  src={url}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"  // Lazy load pour images below the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 5. Stratégie de Cache

```tsx
// Pages statiques (About, Contact)
export const revalidate = false; // ou export const dynamic = 'force-static'

// Pages avec données (Articles, Videos)
export const revalidate = 300; // 5 minutes

// Pages très dynamiques (Search)
export const revalidate = 60; // 1 minute

// API routes
export const dynamic = 'force-dynamic';
```

---

## Checklist d'Actions

### Immédiat (Impact Fort)

- [ ] Convertir `src/app/page.tsx` en Server Component
- [ ] Convertir `src/app/actualites/page.tsx` en Server Component
- [ ] Convertir `src/app/web-tv/page.tsx` en Server Component
- [ ] Fixer JSON.stringify dans `src/hooks/api/use-articles.ts`
- [ ] Fixer JSON.stringify dans `src/hooks/api/use-videos.ts`
- [ ] Activer TypeScript strict dans `next.config.ts`

### Court terme (Impact Moyen)

- [ ] Découper `Header.tsx` en sous-composants
- [ ] Extraire `ArticleCard` animations en composant client séparé
- [ ] Ajouter `sizes` à toutes les `<Image>` avec `fill`
- [ ] Augmenter `revalidate` de 60s à 300s pour les articles

### Long terme (Impact Faible)

- [ ] Supprimer `react-big-calendar` (non utilisé)
- [ ] Supprimer `recharts` (non utilisé)
- [ ] Évaluer remplacement framer-motion par CSS animations
- [ ] Implémenter `generateStaticParams` pour les pages dynamiques

---

## Architecture Cible

```
src/
├── app/
│   ├── layout.tsx                 # Server Component
│   ├── page.tsx                   # Server Component + async
│   ├── loading.tsx                # Skeleton UI
│   ├── error.tsx                  # Error boundary
│   ├── actualites/
│   │   ├── page.tsx               # Server Component
│   │   └── [slug]/
│   │       └── page.tsx           # Server Component + generateStaticParams
│   └── web-tv/
│       ├── page.tsx               # Server Component
│       └── [slug]/
│           └── page.tsx           # Server Component
│
├── components/
│   ├── server/                    # Server Components uniquement
│   │   ├── ArticleCard.tsx
│   │   ├── VideoCard.tsx
│   │   └── CategoryBadge.tsx
│   │
│   ├── client/                    # Client Components (interactivité)
│   │   ├── SearchBar.tsx          # "use client"
│   │   ├── Newsletter.tsx         # "use client"
│   │   ├── ShareMenu.tsx          # "use client"
│   │   └── MobileMenu.tsx         # "use client"
│   │
│   ├── ui/                        # shadcn/ui (garder "use client")
│   └── layouts/
│       ├── Header.tsx             # Hybrid
│       └── Footer.tsx             # Server Component
│
├── lib/
│   └── api/
│       ├── client.ts              # Client-side fetch
│       └── server.ts              # Server-side fetch (with cache)
│
└── hooks/
    └── client/                    # Hooks uniquement pour client components
        ├── use-search.ts
        └── use-infinite-scroll.ts
```

---

## Commandes Utiles

### Analyse du Bundle
```bash
# Installer l'analyseur
npm install @next/bundle-analyzer

# Ajouter dans next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Lancer l'analyse
ANALYZE=true npm run build
```

### Vérifier les Dépendances Inutilisées
```bash
# Installer depcheck
npm install -g depcheck

# Analyser
depcheck .

# Résultat attendu:
# Unused dependencies:
# * react-big-calendar
# * recharts
```

### Mesurer les Performances
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Web Vitals en dev
# Ajouter dans app/layout.tsx:
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
```

### Supprimer les Dépendances Inutiles
```bash
npm uninstall react-big-calendar @types/react-big-calendar recharts
```

---

## Métriques Cibles

| Métrique | Actuel (estimé) | Cible |
|----------|-----------------|-------|
| First Contentful Paint | ~2.5s | < 1.5s |
| Largest Contentful Paint | ~4s | < 2.5s |
| Time to Interactive | ~5s | < 3s |
| Total Blocking Time | ~500ms | < 200ms |
| Bundle JS (gzipped) | ~350KB | < 200KB |
| Requêtes API initiales | 6-8 | 1-2 |

---

## Ressources

- [Next.js App Router Best Practices](https://nextjs.org/docs/app/building-your-application)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Vercel Analytics](https://vercel.com/analytics)
- [Web Vitals](https://web.dev/vitals/)
