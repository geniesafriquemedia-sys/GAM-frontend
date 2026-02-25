/**
 * Hook de base pour les requêtes API
 * Gestion du loading, error, data
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// TYPES
// =============================================================================

export interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  isSuccess: boolean;
}

export interface UseFetchOptions<T = unknown> {
  enabled?: boolean;
  refetchOnMount?: boolean;
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export interface UseFetchResult<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

// =============================================================================
// HOOK: useFetch
// =============================================================================

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = [],
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const { enabled = true, refetchOnMount = true, initialData, onSuccess, onError } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: initialData ?? null,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: !!initialData,
  });

  const mountedRef = useRef(true);
  const fetchIdRef = useRef(0);
  const isFirstMount = useRef(true);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    const fetchId = ++fetchIdRef.current;

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      isError: false,
    }));

    try {
      const data = await fetchFn();

      // Vérifier si le composant est toujours monté et si c'est la dernière requête
      if (mountedRef.current && fetchId === fetchIdRef.current) {
        setState({
          data,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
        });
        onSuccess?.(data);
      }
    } catch (err) {
      if (mountedRef.current && fetchId === fetchIdRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          isError: true,
          isSuccess: false,
        }));
        onError?.(errorMessage);
      }
    }
  }, [fetchFn, enabled, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Skip fetch on initial mount if refetchOnMount is false AND we have initial data
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (!refetchOnMount && initialData) {
        return;
      }
    }

    // Fetch when deps change (or on mount if refetchOnMount is true)
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [...deps]);

  return {
    ...state,
    refetch: fetchData,
    reset,
  };
}

// =============================================================================
// HOOK: useMutation
// =============================================================================

export interface UseMutationState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  isSuccess: boolean;
}

export interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export interface UseMutationResult<T, V> extends UseMutationState<T> {
  mutate: (variables: V) => Promise<T | null>;
  reset: () => void;
}

export function useMutation<T, V = void>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T> = {}
): UseMutationResult<T, V> {
  const { onSuccess, onError } = options;

  const [state, setState] = useState<UseMutationState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: false,
  });

  const mutate = useCallback(
    async (variables: V): Promise<T | null> => {
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
      }));

      try {
        const data = await mutationFn(variables);

        setState({
          data,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
        });

        onSuccess?.(data);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';

        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          isError: true,
          isSuccess: false,
        }));

        onError?.(errorMessage);
        return null;
      }
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}
