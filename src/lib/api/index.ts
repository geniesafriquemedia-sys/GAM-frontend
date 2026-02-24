/**
 * GAM API Client - Export Principal
 *
 * Structure:
 * - config.ts     : Configuration (URLs, endpoints, cache)
 * - client.ts     : Client HTTP de base
 * - services/     : Services par domaine
 *
 * Usage:
 * ```typescript
 * import { api } from '@/lib/api';
 *
 * // Articles
 * const articles = await api.articles.getAll({ page: 1 });
 * const article = await api.articles.getBySlug('mon-article');
 *
 * // Videos
 * const videos = await api.videos.getFeatured();
 *
 * // Search
 * const results = await api.search.search({ q: 'africa' });
 *
 * // Newsletter
 * await api.newsletter.subscribe('email@example.com');
 * ```
 */

// =============================================================================
// SERVICES
// =============================================================================

import { authService } from './services/auth.service';
import {
  articlesService,
  videosService,
  categoriesService,
  authorsService,
  homepageService,
} from './services/editorial.service';
import { searchService } from './services/search.service';
import { newsletterService, contactService } from './services/engagement.service';
import { kpiService } from './services/kpi.service';
import { advertisingService } from './services/advertising.service';

// =============================================================================
// API NAMESPACE
// =============================================================================

export const api = {
  // Auth
  auth: authService,

  // Editorial
  articles: articlesService,
  videos: videosService,
  categories: categoriesService,
  authors: authorsService,
  homepage: homepageService,

  // Search
  search: searchService,

  // Engagement
  newsletter: newsletterService,
  contact: contactService,

  // KPI
  kpi: kpiService,

  // Advertising
  advertising: advertisingService,
} as const;

// =============================================================================
// RE-EXPORTS
// =============================================================================

// Config
export {
  API_BASE_URL,
  MEDIA_BASE_URL,
  ENDPOINTS,
  CACHE_TIMES,
  getMediaUrl,
  getApiUrl,
  buildQueryString,
} from './config';

// Client
export {
  apiClient,
  serverFetch,
  safeFetch,
  ApiClientError,
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from './client';

export type { FetchOptions } from './client';

// Services
export * from './services';

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default api;
