/**
 * Hooks Articles
 * Récupération et gestion des articles
 */

import { useState, useCallback, useMemo } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type {
  Article,
  ArticleSummary,
  ArticleWithRelated,
  ArticleQueryParams,
  PaginatedResponse,
} from '@/types';

// =============================================================================
// useArticles - Liste paginée
// =============================================================================

export interface UseArticlesOptions extends UseFetchOptions<PaginatedResponse<ArticleSummary>> {
  initialParams?: ArticleQueryParams;
}

export interface UseArticlesResult {
  // ... existing interface ...
  // This interface is just for context, I will only replace the implementation part
  // if I can't match strictly. But let's try to match the implementation.
  articles: ArticleSummary[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  isLoading: boolean;
  error: string | null;
  // Actions
  setPage: (page: number) => void;
  setFilters: (filters: Partial<ArticleQueryParams>) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
}

export function useArticles(options: UseArticlesOptions = {}): UseArticlesResult {
  const { initialParams = {}, ...fetchOptions } = options;

  const [params, setParams] = useState<ArticleQueryParams>({
    page: 1,
    page_size: 12,
    ...initialParams,
  });

  // Extraire les dépendances primitives pour éviter les re-renders inutiles
  const { page, page_size, category, category_slug, author, author_slug, is_featured, is_trending, tags, search, ordering } = params;

  const fetchArticles = useCallback(
    () => api.articles.getAll(params),
    [page, page_size, category, category_slug, author, author_slug, is_featured, is_trending, tags, search, ordering]
  );

  const { data, isLoading, error, refetch } = useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [page, page_size, category, category_slug, author, author_slug, is_featured, is_trending, tags, search, ordering],
    fetchOptions
  );

  const pagination = useMemo(() => {
    const totalCount = data?.count ?? 0;
    const pageSize = params.page_size ?? 12;
    const page = params.page ?? 1;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      page,
      pageSize,
      totalCount,
      totalPages,
      hasNext: !!data?.next,
      hasPrevious: !!data?.previous,
    };
  }, [data, params]);

  const setPage = useCallback((page: number) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const setFilters = useCallback((filters: Partial<ArticleQueryParams>) => {
    setParams(prev => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setParams({ page: 1, page_size: 12, ...initialParams });
  }, [initialParams]);

  return {
    articles: data?.results ?? [],
    pagination,
    isLoading,
    error,
    setPage,
    setFilters,
    resetFilters,
    refetch,
  };
}

// =============================================================================
// useArticle - Détail article
// =============================================================================

export interface UseArticleOptions extends UseFetchOptions<ArticleWithRelated> {
  slug: string;
}

export function useArticle(options: UseArticleOptions) {
  const { slug, ...fetchOptions } = options;

  const fetchArticle = useCallback(
    () => api.articles.getBySlug(slug),
    [slug]
  );

  return useFetch<ArticleWithRelated>(fetchArticle, [slug], {
    enabled: !!slug,
    ...fetchOptions,
  });
}

// =============================================================================
// useFeaturedArticles - Articles à la une
// =============================================================================

export function useFeaturedArticles(limit = 3, options: UseFetchOptions = {}) {
  const fetchFeatured = useCallback(
    () => api.articles.getFeatured(limit),
    [limit]
  );

  return useFetch<ArticleSummary[]>(fetchFeatured, [limit], options as UseFetchOptions<ArticleSummary[]>);
}

// =============================================================================
// useArticlesByCategory - Articles par catégorie
// =============================================================================

export function useArticlesByCategory(
  categorySlug: string,
  params: Omit<ArticleQueryParams, 'category'> = {},
  options: UseFetchOptions = {}
) {
  const { page, page_size, author, author_slug, is_featured, is_trending, tags, search, ordering } = params;

  const fetchArticles = useCallback(
    () => api.articles.getByCategory(categorySlug, params),
    [categorySlug, page, page_size, author, author_slug, is_featured, is_trending, tags, search, ordering]
  );

  return useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [categorySlug, page, page_size, author, author_slug, is_featured, is_trending, tags, search, ordering],
    { enabled: !!categorySlug, ...options } as UseFetchOptions<PaginatedResponse<ArticleSummary>>
  );
}

// =============================================================================
// useArticlesByAuthor - Articles par auteur
// =============================================================================

export function useArticlesByAuthor(
  authorSlug: string,
  params: Omit<ArticleQueryParams, 'author'> = {},
  options: UseFetchOptions = {}
) {
  const { page, page_size, category, category_slug, is_featured, is_trending, tags, search, ordering } = params;

  const fetchArticles = useCallback(
    () => api.articles.getByAuthor(authorSlug, params),
    [authorSlug, page, page_size, category, category_slug, is_featured, is_trending, tags, search, ordering]
  );

  return useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [authorSlug, page, page_size, category, category_slug, is_featured, is_trending, tags, search, ordering],
    { enabled: !!authorSlug, ...options } as UseFetchOptions<PaginatedResponse<ArticleSummary>>
  );
}

// =============================================================================
// useTrendingArticles - Articles tendance
// =============================================================================

export function useTrendingArticles(limit = 5, options: UseFetchOptions = {}) {
  const fetchTrending = useCallback(
    () => api.articles.getTrending(limit),
    [limit]
  );

  return useFetch<ArticleSummary[]>(fetchTrending, [limit], options as UseFetchOptions<ArticleSummary[]>);
}
