/**
 * Hooks Recherche
 * - Une seule requête par (query + type) grâce à un cache in-memory de session
 * - Abort automatique des requêtes en vol si la query change
 * - Filtrage client-side quand on change de type (pas de nouvelle requête)
 * - Debounce propre avec nettoyage
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useFetch, type UseFetchOptions } from './use-fetch';
import { api } from '@/lib/api';
import type { SearchResponse, SearchContentType } from '@/types';

// =============================================================================
// Cache in-memory de session (évite les re-requêtes pour la même query)
// =============================================================================

const searchCache = new Map<string, SearchResponse>();

function getCacheKey(query: string): string {
  return query.trim().toLowerCase();
}

// =============================================================================
// useSearch - Recherche globale
// =============================================================================

export interface UseSearchOptions extends UseFetchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

export interface UseSearchResult {
  /** Résultats complets (tous types) depuis l'API */
  allResults: SearchResponse | null;
  /** Résultats filtrés selon activeType (filtrage client-side) */
  results: SearchResponse | null;
  query: string;
  activeType: SearchContentType;
  isSearching: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  setType: (type: SearchContentType) => void;
  /** Déclenche une recherche immédiate (bypass debounce) */
  search: (query: string, type?: SearchContentType) => void;
  clear: () => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchResult {
  const { debounceMs = 350, minQueryLength = 2 } = options;

  const [query, setQueryState] = useState('');
  const [activeType, setActiveTypeState] = useState<SearchContentType>('all');
  const [allResults, setAllResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Abort controller pour annuler les requêtes en vol
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Effectue la requête API (une seule fois par query unique).
   * Utilise le cache in-memory pour éviter les appels redondants.
   */
  const fetchResults = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < minQueryLength) {
      setAllResults(null);
      setIsSearching(false);
      return;
    }

    const cacheKey = getCacheKey(trimmed);

    // Hit cache → pas de requête réseau
    if (searchCache.has(cacheKey)) {
      setAllResults(searchCache.get(cacheKey)!);
      setIsSearching(false);
      return;
    }

    // Annule la requête précédente si encore en vol
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setIsSearching(true);
    setError(null);

    try {
      // On récupère toujours tous les types depuis l'API (type=all)
      // Le filtrage par type se fait côté client sur allResults
      const response = await api.search.searchQuery(trimmed, 'all');
      searchCache.set(cacheKey, response);
      setAllResults(response);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return; // requête annulée, silencieux
      setError(err instanceof Error ? err.message : 'Erreur de recherche');
      setAllResults(null);
    } finally {
      setIsSearching(false);
    }
  }, [minQueryLength]);

  /**
   * Filtre client-side les résultats selon activeType.
   * Évite une requête réseau quand l'utilisateur change juste de filtre.
   */
  const results: SearchResponse | null = allResults
    ? activeType === 'all'
      ? allResults
      : (() => {
          const filtered = {
            articles: activeType === 'articles' ? allResults.articles : [],
            videos: activeType === 'videos' ? allResults.videos : [],
            categories: activeType === 'categories' ? allResults.categories : [],
            authors: activeType === 'authors' ? allResults.authors : [],
          };
          return {
            ...filtered,
            total_count:
              filtered.articles.length +
              filtered.videos.length +
              filtered.categories.length +
              filtered.authors.length,
          };
        })()
    : null;

  /**
   * Mise à jour de la query avec debounce.
   */
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (newQuery.trim().length < minQueryLength) {
      setAllResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true); // feedback immédiat pendant le debounce
    debounceRef.current = setTimeout(() => {
      fetchResults(newQuery);
    }, debounceMs);
  }, [fetchResults, debounceMs, minQueryLength]);

  /**
   * Changement de type : filtrage purement client-side, aucune requête.
   */
  const setType = useCallback((type: SearchContentType) => {
    setActiveTypeState(type);
  }, []);

  /**
   * Recherche immédiate (bypass debounce) — ex: soumission du formulaire ou
   * chargement initial depuis l'URL.
   */
  const search = useCallback((q: string, type?: SearchContentType) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQueryState(q);
    if (type) setActiveTypeState(type);
    fetchResults(q);
  }, [fetchResults]);

  const clear = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();
    setQueryState('');
    setAllResults(null);
    setError(null);
    setIsSearching(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return {
    allResults,
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
// useSearchSuggestions - Autocomplete avec abort + cache
// =============================================================================

const suggestionsCache = new Map<string, string[]>();

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
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < minQueryLength) {
      setSuggestions([]);
      return;
    }

    const cacheKey = `${query.toLowerCase()}:${limit}`;
    if (suggestionsCache.has(cacheKey)) {
      setSuggestions(suggestionsCache.get(cacheKey)!);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setIsLoading(true);
      try {
        const result = await api.search.getSuggestions(query, limit);
        suggestionsCache.set(cacheKey, result);
        setSuggestions(result);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, debounceMs, minQueryLength, limit]);

  const setQuery = useCallback((newQuery: string) => {
    setQueryState(newQuery);
  }, []);

  const clear = useCallback(() => {
    setQueryState('');
    setSuggestions([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return { suggestions, isLoading, query, setQuery, clear };
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
