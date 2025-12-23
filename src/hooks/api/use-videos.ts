/**
 * Hooks Videos
 * Récupération et gestion des vidéos Web TV
 */

import { useState, useCallback, useMemo } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type {
  Video,
  VideoSummary,
  VideoQueryParams,
  VideoType,
  PaginatedResponse,
} from '@/types';

// =============================================================================
// useVideos - Liste paginée
// =============================================================================

export interface UseVideosOptions extends UseFetchOptions {
  initialParams?: VideoQueryParams;
}

export interface UseVideosResult {
  videos: VideoSummary[];
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
  setFilters: (filters: Partial<VideoQueryParams>) => void;
  setVideoType: (type: VideoType | undefined) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
}

export function useVideos(options: UseVideosOptions = {}): UseVideosResult {
  const { initialParams = {}, ...fetchOptions } = options;

  const [params, setParams] = useState<VideoQueryParams>({
    page: 1,
    page_size: 12,
    ...initialParams,
  });

  const fetchVideos = useCallback(
    () => api.videos.getAll(params),
    [JSON.stringify(params)]
  );

  const { data, isLoading, error, refetch } = useFetch<PaginatedResponse<VideoSummary>>(
    fetchVideos,
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

  const setFilters = useCallback((filters: Partial<VideoQueryParams>) => {
    setParams(prev => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const setVideoType = useCallback((type: VideoType | undefined) => {
    setParams(prev => ({ ...prev, video_type: type, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setParams({ page: 1, page_size: 12, ...initialParams });
  }, [initialParams]);

  return {
    videos: data?.results ?? [],
    pagination,
    isLoading,
    error,
    setPage,
    setFilters,
    setVideoType,
    resetFilters,
    refetch,
  };
}

// =============================================================================
// useVideo - Détail vidéo
// =============================================================================

export interface UseVideoOptions extends UseFetchOptions {
  slug: string;
}

export function useVideo(options: UseVideoOptions) {
  const { slug, ...fetchOptions } = options;

  const fetchVideo = useCallback(
    () => api.videos.getBySlug(slug),
    [slug]
  );

  return useFetch<Video>(fetchVideo, [slug], {
    enabled: !!slug,
    ...fetchOptions,
  });
}

// =============================================================================
// useFeaturedVideos - Vidéos en vedette
// =============================================================================

export function useFeaturedVideos(limit = 4, options: UseFetchOptions = {}) {
  const fetchFeatured = useCallback(
    () => api.videos.getFeatured(limit),
    [limit]
  );

  return useFetch<VideoSummary[]>(fetchFeatured, [limit], options);
}

// =============================================================================
// useVideosByType - Vidéos par type
// =============================================================================

export function useVideosByType(
  videoType: VideoType,
  params: Omit<VideoQueryParams, 'video_type'> = {},
  options: UseFetchOptions = {}
) {
  const fetchVideos = useCallback(
    () => api.videos.getByType(videoType, params),
    [videoType, JSON.stringify(params)]
  );

  return useFetch<PaginatedResponse<VideoSummary>>(
    fetchVideos,
    [videoType, JSON.stringify(params)],
    { enabled: !!videoType, ...options }
  );
}

// =============================================================================
// useVideosByCategory - Vidéos par catégorie
// =============================================================================

export function useVideosByCategory(
  categorySlug: string,
  params: Omit<VideoQueryParams, 'category'> = {},
  options: UseFetchOptions = {}
) {
  const fetchVideos = useCallback(
    () => api.videos.getByCategory(categorySlug, params),
    [categorySlug, JSON.stringify(params)]
  );

  return useFetch<PaginatedResponse<VideoSummary>>(
    fetchVideos,
    [categorySlug, JSON.stringify(params)],
    { enabled: !!categorySlug, ...options }
  );
}
