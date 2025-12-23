/**
 * Service Recherche
 * Recherche globale, suggestions, tags tendance
 */

import { apiClient, serverFetch } from '../client';
import { ENDPOINTS, CACHE_TIMES } from '../config';
import type {
  SearchParams,
  SearchResponse,
  SuggestionsResponse,
  TrendingTagsResponse,
} from '@/types';

// =============================================================================
// SEARCH SERVICE
// =============================================================================

// Type de réponse brute de l'API
interface RawSearchResponse {
  query: string;
  results: SearchResponse;
}

export const searchService = {
  /**
   * Recherche globale
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    const response = await apiClient.get<RawSearchResponse>(ENDPOINTS.SEARCH.SEARCH, { params });
    return response.results;
  },

  /**
   * Recherche avec query simple
   */
  async searchQuery(
    query: string,
    type?: SearchParams['type'],
    page = 1,
    pageSize = 12
  ): Promise<SearchResponse> {
    return this.search({
      q: query,
      type,
      page,
      page_size: pageSize,
    });
  },

  /**
   * Suggestions (autocomplete)
   */
  async getSuggestions(query: string, limit = 5): Promise<string[]> {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await apiClient.get<SuggestionsResponse>(
        ENDPOINTS.SEARCH.SUGGESTIONS,
        { params: { q: query, limit } }
      );
      return response.suggestions || [];
    } catch {
      return [];
    }
  },

  /**
   * Tags tendance
   */
  async getTrendingTags(limit = 10): Promise<string[]> {
    try {
      const response = await apiClient.get<TrendingTagsResponse>(
        ENDPOINTS.SEARCH.TRENDING_TAGS,
        { params: { limit } }
      );
      return response.tags || [];
    } catch {
      return [];
    }
  },

  // ===========================================================================
  // SERVER-SIDE (SSR)
  // ===========================================================================

  /**
   * Recherche (SSR)
   */
  async searchServer(params: SearchParams): Promise<SearchResponse> {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();

    const response = await serverFetch<RawSearchResponse>(
      `${ENDPOINTS.SEARCH.SEARCH}?${queryString}`,
      { next: { revalidate: CACHE_TIMES.SEARCH } }
    );
    return response.results;
  },

  /**
   * Tags tendance (SSR)
   */
  async getTrendingTagsServer(limit = 10): Promise<string[]> {
    try {
      const response = await serverFetch<TrendingTagsResponse>(
        `${ENDPOINTS.SEARCH.TRENDING_TAGS}?limit=${limit}`,
        { next: { revalidate: CACHE_TIMES.HOMEPAGE } }
      );
      return response.tags || [];
    } catch {
      return [];
    }
  },
};

// =============================================================================
// SEARCH HELPERS
// =============================================================================

/**
 * Debounce pour les suggestions
 */
export function createSearchDebounce(delay = 300) {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounce<T>(
    fn: () => Promise<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

/**
 * Highlight du terme recherché dans le texte
 */
export function highlightSearchTerm(text: string, term: string): string {
  if (!term) return text;

  const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Construire l'URL de recherche
 */
export function buildSearchUrl(query: string, type?: string): string {
  const params = new URLSearchParams({ q: query });
  if (type && type !== 'all') {
    params.set('type', type);
  }
  return `/search?${params.toString()}`;
}
