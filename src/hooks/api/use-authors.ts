/**
 * Hooks Authors
 * Récupération des auteurs
 */

import { useCallback } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type { Author } from '@/types';

// =============================================================================
// useAuthors - Tous les auteurs actifs
// =============================================================================

export function useAuthors(options: UseFetchOptions = {}) {
  const fetchAuthors = useCallback(
    () => api.authors.getAllActive(),
    []
  );

  return useFetch<Author[]>(fetchAuthors, [], options);
}

// =============================================================================
// useAuthor - Détail auteur
// =============================================================================

export interface UseAuthorOptions extends UseFetchOptions {
  slug: string;
}

export function useAuthor(options: UseAuthorOptions) {
  const { slug, ...fetchOptions } = options;

  const fetchAuthor = useCallback(
    () => api.authors.getBySlug(slug),
    [slug]
  );

  return useFetch<Author>(fetchAuthor, [slug], {
    enabled: !!slug,
    ...fetchOptions,
  });
}
