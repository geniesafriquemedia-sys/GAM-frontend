/**
 * Hooks API - Export centralisé
 *
 * Usage:
 * ```typescript
 * import { useArticles, useSearch, useNewsletter } from '@/hooks/api';
 * ```
 */

// =============================================================================
// BASE
// =============================================================================
export { useFetch, useMutation } from './use-fetch';
export type {
  UseFetchState,
  UseFetchOptions,
  UseFetchResult,
  UseMutationState,
  UseMutationOptions,
  UseMutationResult,
} from './use-fetch';

// =============================================================================
// ARTICLES
// =============================================================================
export {
  useArticles,
  useArticle,
  useFeaturedArticles,
  useArticlesByCategory,
  useArticlesByAuthor,
  useTrendingArticles,
} from './use-articles';
export type {
  UseArticlesOptions,
  UseArticlesResult,
  UseArticleOptions,
} from './use-articles';

// =============================================================================
// VIDEOS
// =============================================================================
export {
  useVideos,
  useVideo,
  useFeaturedVideos,
  useVideosByType,
  useVideosByCategory,
} from './use-videos';
export type {
  UseVideosOptions,
  UseVideosResult,
  UseVideoOptions,
} from './use-videos';

// =============================================================================
// CATEGORIES
// =============================================================================
export {
  useCategories,
  useFeaturedCategories,
  useCategory,
} from './use-categories';
export type { UseCategoryOptions } from './use-categories';

// =============================================================================
// AUTHORS
// =============================================================================
export {
  useAuthors,
  useAuthor,
} from './use-authors';
export type { UseAuthorOptions } from './use-authors';

// =============================================================================
// SEARCH
// =============================================================================
export {
  useSearch,
  useSearchSuggestions,
  useTrendingTags,
} from './use-search';
export type {
  UseSearchOptions,
  UseSearchResult,
  UseSearchSuggestionsOptions,
  UseSearchSuggestionsResult,
} from './use-search';

// =============================================================================
// ENGAGEMENT
// =============================================================================
export {
  useNewsletter,
  useNewsletterForm,
  useContact,
} from './use-engagement';
export type {
  UseNewsletterOptions,
  UseNewsletterResult,
  UseNewsletterFormResult,
  UseContactOptions,
  UseContactFormData,
  UseContactResult,
} from './use-engagement';

// =============================================================================
// HOMEPAGE
// =============================================================================
export {
  useHomepage,
  useHomepageFeaturedArticles,
  useHomepageLatestArticles,
  useHomepageFeaturedVideos,
  useHomepageCategories,
  useHomepageTrendingTags,
} from './use-homepage';
export type { UseHomepageResult } from './use-homepage';
