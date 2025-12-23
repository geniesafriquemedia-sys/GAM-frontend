# Conventions API - GAM Frontend

Guide d'intégration des APIs backend Django REST pour le frontend Next.js.

## Base URL

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
```

## Authentification

### Endpoints Auth
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/auth/login/` | POST | Connexion |
| `/auth/register/` | POST | Inscription |
| `/auth/logout/` | POST | Déconnexion |
| `/auth/refresh/` | POST | Rafraîchir token |
| `/auth/profile/` | GET | Profil utilisateur |

### Headers
```typescript
// Requête authentifiée
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
}
```

### Tokens JWT
```typescript
interface AuthTokens {
  access: string;   // Durée: 60 minutes
  refresh: string;  // Durée: 7 jours
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}
```

---

## Conventions de Nommage

### URLs API
- **snake_case** pour les paramètres de query: `?page_size=10&is_featured=true`
- **kebab-case** pour les endpoints: `/editorial/articles/`
- **slug** pour les identifiants lisibles: `/articles/mon-article-slug/`

### Réponses JSON
- **snake_case** pour toutes les clés JSON retournées par l'API
- Le frontend doit gérer la conversion vers camelCase si nécessaire

```typescript
// Réponse API (snake_case)
{
  "id": 1,
  "title": "Mon Article",
  "featured_image": "/media/articles/image.jpg",
  "published_at": "2024-12-22T10:00:00Z",
  "reading_time": 5,
  "is_featured": true,
  "created_at": "2024-12-20T08:00:00Z"
}

// Conversion frontend (camelCase) - optionnel
{
  id: 1,
  title: "Mon Article",
  featuredImage: "/media/articles/image.jpg",
  publishedAt: "2024-12-22T10:00:00Z",
  readingTime: 5,
  isFeatured: true,
  createdAt: "2024-12-20T08:00:00Z"
}
```

---

## Types TypeScript

### Modèles Principaux

```typescript
// =============================================================================
// AUTHOR (Auteur)
// =============================================================================
interface Author {
  id: number;
  name: string;
  slug: string;
  photo: string | null;        // URL de la photo
  bio: string;
  email: string;
  twitter: string;
  linkedin: string;
  website: string;
  is_active: boolean;
  articles_count: number;
  created_at: string;          // ISO 8601
}

// =============================================================================
// CATEGORY (Catégorie)
// =============================================================================
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;               // Code hex: "#3B82F6"
  icon: string;                // Nom icône: "globe", "briefcase"
  image: string | null;
  parent: number | null;       // ID catégorie parente
  is_active: boolean;
  is_featured: boolean;
  articles_count: number;
  videos_count: number;
  order: number;
}

// =============================================================================
// ARTICLE
// =============================================================================
interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  featured_image_caption: string;
  author: Author;              // Objet complet en lecture
  category: Category;          // Objet complet en lecture
  tags: string;                // "tag1, tag2, tag3"
  body: ArticleBlock[];        // Blocs StreamField
  content: string;             // Contenu HTML legacy
  reading_time: number;        // Minutes
  views_count: number;
  is_featured: boolean;
  is_trending: boolean;
  status: 'draft' | 'published';
  published_at: string | null; // ISO 8601
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
}

// Blocs de contenu StreamField
interface ArticleBlock {
  id: string;
  type: 'text' | 'image' | 'quote' | 'video' | 'tweet' | 'heading' | 'list' | 'code' | 'cta';
  value: TextBlockValue | ImageBlockValue | QuoteBlockValue | VideoBlockValue | HeadingBlockValue;
}

interface TextBlockValue {
  content: string;             // HTML riche
}

interface ImageBlockValue {
  image: number;               // ID image Wagtail
  caption: string;
  attribution: string;
}

interface QuoteBlockValue {
  quote: string;
  author: string;
  source: string;
}

interface VideoBlockValue {
  video: string;               // URL embed
  caption: string;
}

interface HeadingBlockValue {
  heading: string;
  level: 'h2' | 'h3' | 'h4';
}

// =============================================================================
// VIDEO (Web TV)
// =============================================================================
interface Video {
  id: number;
  title: string;
  slug: string;
  description: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail: string | null;    // Miniature personnalisée
  youtube_thumbnail: string;   // Miniature auto YouTube
  thumbnail_url: string;       // URL finale (custom ou YouTube)
  embed_url: string;           // URL embed YouTube
  video_type: 'emission' | 'reportage' | 'interview' | 'documentary' | 'short';
  category: Category | null;
  tags: string;
  duration: number;            // Secondes
  duration_formatted: string;  // "5:30" ou "1:05:30"
  views_count: number;
  is_featured: boolean;
  is_live: boolean;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  meta_title: string;
  meta_description: string;
}

// =============================================================================
// USER
// =============================================================================
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'reader' | 'author' | 'editor' | 'admin';
  avatar: string | null;
  bio: string;
  is_active: boolean;
  date_joined: string;
}

// =============================================================================
// NEWSLETTER
// =============================================================================
interface NewsletterSubscription {
  email: string;
  status: 'pending' | 'confirmed' | 'unsubscribed';
}

// =============================================================================
// CONTACT
// =============================================================================
interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

---

## Endpoints Editorial

### Articles
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/editorial/articles/` | GET | Liste articles publiés |
| `/editorial/articles/{slug}/` | GET | Détail article par slug |
| `/editorial/articles/featured/` | GET | Articles "À la Une" |

### Paramètres de Query - Articles
```typescript
interface ArticleQueryParams {
  page?: number;               // Pagination (défaut: 1)
  page_size?: number;          // Items par page (défaut: 12)
  category?: string;           // Filtrer par slug catégorie
  author?: string;             // Filtrer par slug auteur
  is_featured?: boolean;       // Filtrer articles vedette
  is_trending?: boolean;       // Filtrer articles tendance
  search?: string;             // Recherche texte
  ordering?: string;           // Tri: "-published_at", "title"
}

// Exemple
fetch(`${API_BASE_URL}/editorial/articles/?category=tech&page=1&page_size=10`)
```

### Vidéos
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/editorial/videos/` | GET | Liste vidéos publiées |
| `/editorial/videos/{slug}/` | GET | Détail vidéo par slug |
| `/editorial/videos/featured/` | GET | Vidéos en vedette |

### Paramètres de Query - Vidéos
```typescript
interface VideoQueryParams {
  page?: number;
  page_size?: number;
  category?: string;           // Slug catégorie
  video_type?: string;         // 'emission', 'reportage', 'interview'
  is_featured?: boolean;
  ordering?: string;           // "-published_at", "title"
}
```

### Catégories & Auteurs
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/editorial/categories/` | GET | Liste catégories actives |
| `/editorial/categories/{slug}/` | GET | Détail catégorie |
| `/editorial/authors/` | GET | Liste auteurs actifs |
| `/editorial/authors/{slug}/` | GET | Détail auteur |

### Homepage
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/editorial/homepage/` | GET | Données page d'accueil |

```typescript
interface HomepageResponse {
  featured_articles: Article[];     // Articles "À la Une" (max 3)
  latest_articles: Article[];       // Derniers articles (12)
  featured_videos: Video[];         // Vidéos vedettes (4)
  categories: Category[];           // Catégories avec contenus
  trending_tags: string[];          // Tags populaires
}
```

---

## Endpoints Recherche

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/search/` | GET | Recherche globale |
| `/search/suggestions/` | GET | Auto-complétion |
| `/search/trending-tags/` | GET | Tags populaires |

```typescript
// Recherche
interface SearchParams {
  q: string;                   // Terme de recherche (requis)
  type?: 'all' | 'articles' | 'videos';
  page?: number;
  page_size?: number;
}

interface SearchResponse {
  articles: Article[];
  videos: Video[];
  categories: Category[];
  authors: Author[];
  total_count: number;
}

// Suggestions (autocomplete)
// GET /search/suggestions/?q=afri
interface SuggestionsResponse {
  suggestions: string[];       // ["Afrique", "African Tech", ...]
}
```

---

## Endpoints Engagement

### Newsletter
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/engagement/newsletter/subscribe/` | POST | Inscription newsletter |

```typescript
// POST /engagement/newsletter/subscribe/
interface NewsletterRequest {
  email: string;
}

interface NewsletterResponse {
  success: boolean;
  message: string;
  already_subscribed?: boolean;
}
```

### Contact
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/engagement/contact/` | POST | Envoyer message contact |

```typescript
// POST /engagement/contact/
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}
```

---

## Format des Réponses

### Réponse Paginée
```typescript
interface PaginatedResponse<T> {
  count: number;               // Total items
  next: string | null;         // URL page suivante
  previous: string | null;     // URL page précédente
  results: T[];                // Items de la page
}

// Exemple
{
  "count": 156,
  "next": "http://localhost:8000/api/v1/editorial/articles/?page=2",
  "previous": null,
  "results": [...]
}
```

### Réponse Erreur
```typescript
interface ErrorResponse {
  detail?: string;             // Message d'erreur simple
  [field: string]: string[];   // Erreurs de validation par champ
}

// Exemples
{ "detail": "Not found." }
{ "detail": "Authentication credentials were not provided." }
{ "email": ["Enter a valid email address."] }
{ "title": ["This field is required."], "category": ["This field is required."] }
```

### Codes HTTP
| Code | Signification |
|------|---------------|
| 200 | OK - Succès |
| 201 | Created - Ressource créée |
| 204 | No Content - Succès sans contenu |
| 400 | Bad Request - Erreur de validation |
| 401 | Unauthorized - Non authentifié |
| 403 | Forbidden - Accès refusé |
| 404 | Not Found - Ressource non trouvée |
| 429 | Too Many Requests - Rate limit dépassé |
| 500 | Internal Server Error |

---

## Utilitaires Fetch

```typescript
// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Fetch générique
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API Error');
  }

  return response.json();
}

// Exemples d'utilisation
export const api = {
  // Articles
  getArticles: (params?: ArticleQueryParams) =>
    apiFetch<PaginatedResponse<Article>>(`/editorial/articles/?${new URLSearchParams(params as any)}`),

  getArticle: (slug: string) =>
    apiFetch<Article>(`/editorial/articles/${slug}/`),

  getFeaturedArticles: () =>
    apiFetch<Article[]>('/editorial/articles/featured/'),

  // Videos
  getVideos: (params?: VideoQueryParams) =>
    apiFetch<PaginatedResponse<Video>>(`/editorial/videos/?${new URLSearchParams(params as any)}`),

  getVideo: (slug: string) =>
    apiFetch<Video>(`/editorial/videos/${slug}/`),

  // Homepage
  getHomepage: () =>
    apiFetch<HomepageResponse>('/editorial/homepage/'),

  // Search
  search: (query: string, type?: string) =>
    apiFetch<SearchResponse>(`/search/?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`),

  getSuggestions: (query: string) =>
    apiFetch<SuggestionsResponse>(`/search/suggestions/?q=${encodeURIComponent(query)}`),

  // Newsletter
  subscribeNewsletter: (email: string) =>
    apiFetch<NewsletterResponse>('/engagement/newsletter/subscribe/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Contact
  sendContact: (data: ContactRequest) =>
    apiFetch<ContactResponse>('/engagement/contact/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```

---

## Variables d'Environnement Frontend

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_MEDIA_URL=http://localhost:8000/media
```

## URLs Médias

Les images et fichiers sont servis depuis le backend:

```typescript
// Construire URL complète pour les médias
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:8000';

function getMediaUrl(path: string | null): string {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${MEDIA_URL}${path}`;
}

// Usage
<img src={getMediaUrl(article.featured_image)} alt={article.title} />
```
