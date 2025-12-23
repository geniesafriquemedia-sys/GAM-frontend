/**
 * Types Recherche
 * Recherche globale et suggestions
 */

import type { ArticleSummary } from './editorial/article';
import type { VideoSummary } from './editorial/video';
import type { Category } from './editorial/category';
import type { AuthorSummary } from './editorial/author';

// =============================================================================
// SEARCH TYPES
// =============================================================================

export type SearchContentType = 'all' | 'articles' | 'videos' | 'categories' | 'authors';

// =============================================================================
// SEARCH PARAMS
// =============================================================================

export interface SearchParams {
  [key: string]: string | number | boolean | undefined | null;
  q: string;                      // Query (requis)
  type?: SearchContentType;       // Type de contenu
  page?: number;
  page_size?: number;
}

// =============================================================================
// SEARCH RESULTS
// =============================================================================

export interface SearchResultArticle extends ArticleSummary {
  type: 'article';
  highlight?: string;             // Extrait avec terme surligné
}

export interface SearchResultVideo extends VideoSummary {
  type: 'video';
  highlight?: string;
}

export interface SearchResultCategory {
  id: number;
  type: 'category';
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  articles_count: number;
}

export interface SearchResultAuthor {
  id: number;
  type: 'author';
  name: string;
  slug: string;
  photo: string | null;
  bio: string;
  articles_count: number;
}

export type SearchResultItem =
  | SearchResultArticle
  | SearchResultVideo
  | SearchResultCategory
  | SearchResultAuthor;

// =============================================================================
// SEARCH RESPONSE
// =============================================================================

export interface SearchResponse {
  articles: SearchResultArticle[];
  videos: SearchResultVideo[];
  categories: SearchResultCategory[];
  authors: SearchResultAuthor[];
  total_count: number;
}

// Recherche paginée par type
export interface SearchPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// =============================================================================
// SUGGESTIONS (Autocomplete)
// =============================================================================

export interface SuggestionsParams {
  q: string;                      // Query (min 2 caractères)
  limit?: number;
}

export interface SuggestionsResponse {
  suggestions: string[];
}

// =============================================================================
// TRENDING TAGS
// =============================================================================

export interface TrendingTagsResponse {
  tags: string[];
}

// =============================================================================
// SEARCH STATE
// =============================================================================

export interface SearchState {
  query: string;
  results: SearchResponse | null;
  suggestions: string[];
  isSearching: boolean;
  isLoadingSuggestions: boolean;
  error: string | null;
  activeType: SearchContentType;
}

export const initialSearchState: SearchState = {
  query: '',
  results: null,
  suggestions: [],
  isSearching: false,
  isLoadingSuggestions: false,
  error: null,
  activeType: 'all',
};

// =============================================================================
// HELPERS
// =============================================================================

export function getSearchResultUrl(result: SearchResultItem): string {
  switch (result.type) {
    case 'article':
      return `/articles/${result.slug}`;
    case 'video':
      return `/web-tv/${result.slug}`;
    case 'category':
      return `/categories/${result.slug}`;
    case 'author':
      return `/auteurs/${result.slug}`;
    default:
      return '#';
  }
}

export function getSearchResultIcon(type: SearchContentType): string {
  switch (type) {
    case 'articles':
      return 'FileText';
    case 'videos':
      return 'Play';
    case 'categories':
      return 'Folder';
    case 'authors':
      return 'User';
    default:
      return 'Search';
  }
}

export function getSearchResultLabel(type: SearchContentType): string {
  switch (type) {
    case 'articles':
      return 'Articles';
    case 'videos':
      return 'Vidéos';
    case 'categories':
      return 'Catégories';
    case 'authors':
      return 'Auteurs';
    default:
      return 'Tous';
  }
}

export function getTotalResultsCount(response: SearchResponse): number {
  return (
    response.articles.length +
    response.videos.length +
    response.categories.length +
    response.authors.length
  );
}

export function hasResults(response: SearchResponse): boolean {
  return getTotalResultsCount(response) > 0;
}

// =============================================================================
// SEARCH FILTERS
// =============================================================================

export interface SearchFilters {
  type: SearchContentType;
  category?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const defaultSearchFilters: SearchFilters = {
  type: 'all',
};
