/**
 * Hook Homepage
 * Données agrégées pour la page d'accueil
 */

import { useCallback, useMemo } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import { buildHeroSection } from '@/types';
import type { HomepageResponse, HeroSection } from '@/types';

// =============================================================================
// useHomepage - Données complètes homepage
// =============================================================================

export interface UseHomepageResult {
  data: HomepageResponse | null;
  hero: HeroSection | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useHomepage(options: UseFetchOptions = {}): UseHomepageResult {
  const fetchHomepage = useCallback(
    () => api.homepage.getData(),
    []
  );

  const { data, isLoading, error, refetch } = useFetch<HomepageResponse>(
    fetchHomepage,
    [],
    options as UseFetchOptions<HomepageResponse>
  );

  const hero = useMemo(() => {
    if (!data?.featured_articles) return null;
    return buildHeroSection(data.featured_articles);
  }, [data?.featured_articles]);

  return {
    data,
    hero,
    isLoading,
    error,
    refetch,
  };
}

// =============================================================================
// Hooks individuels pour sections spécifiques
// =============================================================================

export function useHomepageFeaturedArticles(options: UseFetchOptions = {}) {
  const { data, isLoading, error } = useHomepage(options);

  return {
    articles: data?.featured_articles ?? [],
    isLoading,
    error,
  };
}

export function useHomepageLatestArticles(options: UseFetchOptions = {}) {
  const { data, isLoading, error } = useHomepage(options);

  return {
    articles: data?.latest_articles ?? [],
    isLoading,
    error,
  };
}

export function useHomepageFeaturedVideos(options: UseFetchOptions = {}) {
  const { data, isLoading, error } = useHomepage(options);

  return {
    videos: data?.featured_videos ?? [],
    isLoading,
    error,
  };
}

export function useHomepageCategories(options: UseFetchOptions = {}) {
  const { data, isLoading, error } = useHomepage(options);

  return {
    categories: data?.categories ?? [],
    isLoading,
    error,
  };
}

export function useHomepageTrendingTags(options: UseFetchOptions = {}) {
  const { data, isLoading, error } = useHomepage(options);

  return {
    tags: data?.trending_tags ?? [],
    isLoading,
    error,
  };
}
