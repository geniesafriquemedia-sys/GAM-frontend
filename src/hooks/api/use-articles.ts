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
  ArticleQueryParams,
  PaginatedResponse,
} from '@/types';

// =============================================================================
// useArticles - Liste paginée
// =============================================================================

export interface UseArticlesOptions extends UseFetchOptions {
  initialParams?: ArticleQueryParams;
}

export interface UseArticlesResult {
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

  const fetchArticles = useCallback(
    () => api.articles.getAll(params),
    [JSON.stringify(params)]
  );

  const { data, isLoading, error, refetch } = useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [JSON.stringify(params)],
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

export interface UseArticleOptions extends UseFetchOptions {
  slug: string;
}

export function useArticle(options: UseArticleOptions) {
  const { slug, ...fetchOptions } = options;

  const fetchArticle = useCallback(
    () => api.articles.getBySlug(slug),
    [slug]
  );

  return useFetch<Article>(fetchArticle, [slug], {
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

  return useFetch<ArticleSummary[]>(fetchFeatured, [limit], options);
}

// =============================================================================
// useArticlesByCategory - Articles par catégorie
// =============================================================================

export function useArticlesByCategory(
  categorySlug: string,
  params: Omit<ArticleQueryParams, 'category'> = {},
  options: UseFetchOptions = {}
) {
  const fetchArticles = useCallback(
    () => api.articles.getByCategory(categorySlug, params),
    [categorySlug, JSON.stringify(params)]
  );

  return useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [categorySlug, JSON.stringify(params)],
    { enabled: !!categorySlug, ...options }
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
  const fetchArticles = useCallback(
    () => api.articles.getByAuthor(authorSlug, params),
    [authorSlug, JSON.stringify(params)]
  );

  return useFetch<PaginatedResponse<ArticleSummary>>(
    fetchArticles,
    [authorSlug, JSON.stringify(params)],
    { enabled: !!authorSlug, ...options }
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

  return useFetch<ArticleSummary[]>(fetchTrending, [limit], options);
}
