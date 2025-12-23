/**
 * Hooks Recherche
 * Recherche avec debounce et suggestions
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type {
  SearchResponse,
  SearchContentType,
} from '@/types';

// =============================================================================
// useSearch - Recherche globale
// =============================================================================

export interface UseSearchOptions extends UseFetchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

export interface UseSearchResult {
  results: SearchResponse | null;
  query: string;
  activeType: SearchContentType;
  isSearching: boolean;
  error: string | null;
  // Actions
  setQuery: (query: string) => void;
  setType: (type: SearchContentType) => void;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchResult {
  const { debounceMs = 300, minQueryLength = 2, ...fetchOptions } = options;

  const [query, setQueryState] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchContentType>('all');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce query
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs]);

  // Execute search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= minQueryLength) {
      performSearch(debouncedQuery);
    } else {
      setResults(null);
    }
  }, [debouncedQuery, activeType]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await api.search.searchQuery(searchQuery, activeType);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de recherche');
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  }, [activeType, minQueryLength]);

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
  }, []);

  const setType = useCallback((type: SearchContentType) => {
    setActiveType(type);
  }, []);

  const search = useCallback(async (searchQuery: string) => {
    setQueryState(searchQuery);
    setDebouncedQuery(searchQuery);
    await performSearch(searchQuery);
  }, [performSearch]);

  const clear = useCallback(() => {
    setQueryState('');
    setDebouncedQuery('');
    setResults(null);
    setError(null);
  }, []);

  return {
    results,
    query,
    activeType,
    isSearching,
    error,
    setQuery,
    setType,
    search,
    clear,
  };
}

// =============================================================================
// useSearchSuggestions - Autocomplete
// =============================================================================

export interface UseSearchSuggestionsOptions {
  debounceMs?: number;
  minQueryLength?: number;
  limit?: number;
}

export interface UseSearchSuggestionsResult {
  suggestions: string[];
  isLoading: boolean;
  query: string;
  setQuery: (query: string) => void;
  clear: () => void;
}

export function useSearchSuggestions(
  options: UseSearchSuggestionsOptions = {}
): UseSearchSuggestionsResult {
  const { debounceMs = 200, minQueryLength = 2, limit = 5 } = options;

  const [query, setQueryState] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < minQueryLength) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const result = await api.search.getSuggestions(query, limit);
        setSuggestions(result);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs, minQueryLength, limit]);

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
  }, []);

  const clear = useCallback(() => {
    setQueryState('');
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    query,
    setQuery,
    clear,
  };
}

// =============================================================================
// useTrendingTags - Tags populaires
// =============================================================================

export function useTrendingTags(limit = 10, options: UseFetchOptions = {}) {
  const fetchTags = useCallback(
    () => api.search.getTrendingTags(limit),
    [limit]
  );

  return useFetch<string[]>(fetchTags, [limit], options);
}
