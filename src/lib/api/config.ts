/**
 * Configuration API
 * URLs et constantes
 * Updated: 2026-02-23 - Force rebuild with env vars
 */

// =============================================================================
// BASE URLs
// =============================================================================

// Appel direct au backend (production) — pas de proxy intermédiaire
// NEXT_PUBLIC_API_URL est accessible côté client et serveur
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:8000/api/v1';
export const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:8000';

// =============================================================================
// ENDPOINTS
// =============================================================================

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/refresh/',
    PROFILE: '/auth/profile/',
  },

  // Editorial
  EDITORIAL: {
    // Articles
    ARTICLES: '/editorial/articles/',
    ARTICLE: (slug: string) => `/editorial/articles/${slug}/`,
    ARTICLES_FEATURED: '/editorial/articles/featured/',

    // Videos
    VIDEOS: '/editorial/videos/',
    VIDEO: (slug: string) => `/editorial/videos/${slug}/`,
    VIDEOS_FEATURED: '/editorial/videos/featured/',

    // Categories
    CATEGORIES: '/editorial/categories/',
    CATEGORY: (slug: string) => `/editorial/categories/${slug}/`,

    // Authors
    AUTHORS: '/editorial/authors/',
    AUTHOR: (slug: string) => `/editorial/authors/${slug}/`,

    // Homepage
    HOMEPAGE: '/editorial/homepage/',
  },

  // Search
  SEARCH: {
    SEARCH: '/search/',
    SUGGESTIONS: '/search/suggestions/',
    TRENDING_TAGS: '/search/trending-tags/',
  },

  // Engagement
  ENGAGEMENT: {
    NEWSLETTER_SUBSCRIBE: '/engagement/newsletter/subscribe/',
    CONTACT: '/engagement/contact/',
  },
} as const;

// =============================================================================
// REQUEST CONFIG
// =============================================================================

export const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const DEFAULT_TIMEOUT = 10000; // 10 secondes

// =============================================================================
// PAGINATION
// =============================================================================

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// =============================================================================
// CACHE
// =============================================================================

export const CACHE_TIMES = {
  HOMEPAGE: 60,           // 1 minute
  ARTICLES: 60,           // 1 minute
  ARTICLE_DETAIL: 60,     // 1 minute (réduit de 5m pour plus de réactivité)
  VIDEO_DETAIL: 60,       // 1 minute
  CATEGORIES: 600,        // 10 minutes
  AUTHORS: 600,           // 10 minutes
  SEARCH: 30,             // 30 secondes
} as const;

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Construit l'URL complète d'un média
 */
export function getMediaUrl(path: string | null): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Éviter les doubles URLs (ex: cloudinary.com/upload/https://...)
  if (path.includes('http')) return path.substring(path.indexOf('http'));
  return `${MEDIA_BASE_URL}${path}`;
}

/**
 * Construit l'URL complète de l'API
 */
export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

/**
 * Construit les query params
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
