/**
 * Hooks Categories
 * Récupération des catégories
 */

import { useCallback } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type { Category } from '@/types';

// =============================================================================
// useCategories - Toutes les catégories actives
// =============================================================================

export function useCategories(options: UseFetchOptions = {}) {
  const fetchCategories = useCallback(
    () => api.categories.getAllActive(),
    []
  );

  return useFetch<Category[]>(fetchCategories, [], options);
}

// =============================================================================
// useFeaturedCategories - Catégories en vedette
// =============================================================================

export function useFeaturedCategories(options: UseFetchOptions = {}) {
  const fetchCategories = useCallback(
    () => api.categories.getFeatured(),
    []
  );

  return useFetch<Category[]>(fetchCategories, [], options);
}

// =============================================================================
// useCategory - Détail catégorie
// =============================================================================

export interface UseCategoryOptions extends UseFetchOptions {
  slug: string;
}

export function useCategory(options: UseCategoryOptions) {
  const { slug, ...fetchOptions } = options;

  const fetchCategory = useCallback(
    () => api.categories.getBySlug(slug),
    [slug]
  );

  return useFetch<Category>(fetchCategory, [slug], {
    enabled: !!slug,
    ...fetchOptions,
  });
}
