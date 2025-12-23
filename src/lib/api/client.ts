/**
 * Client API Base
 * Gestion des requêtes HTTP avec error handling
 */

import { API_BASE_URL, DEFAULT_HEADERS, DEFAULT_TIMEOUT, buildQueryString } from './config';
import type { ApiError, HttpMethod } from '@/types';

// =============================================================================
// ERROR CLASS
// =============================================================================

export class ApiClientError extends Error {
  status: number;
  data: ApiError | null;

  constructor(message: string, status: number, data: ApiError | null = null) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.data = data;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isValidationError(): boolean {
    return this.status === 400;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

// =============================================================================
// REQUEST OPTIONS
// =============================================================================

export interface FetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  timeout?: number;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

// =============================================================================
// TOKEN MANAGEMENT
// =============================================================================

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken(): void {
  accessToken = null;
}

// =============================================================================
// BASE FETCH
// =============================================================================

async function baseFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    timeout = DEFAULT_TIMEOUT,
    cache,
    next,
  } = options;

  // Build URL
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_BASE_URL}${endpoint}${queryString}`;

  // Build headers
  const requestHeaders: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...headers,
  };

  // Add auth token if available
  if (accessToken) {
    requestHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  // Build fetch options
  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: requestHeaders,
    credentials: 'include', // Envoyer les cookies cross-origin (session Django)
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  if (cache) {
    fetchOptions.cache = cache;
  }

  if (next) {
    fetchOptions.next = next;
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  fetchOptions.signal = controller.signal;

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    // Handle no content
    if (response.status === 204) {
      return {} as T;
    }

    // Parse response
    const data = await response.json().catch(() => null);

    // Handle errors
    if (!response.ok) {
      const errorMessage = data?.detail || `HTTP Error ${response.status}`;
      throw new ApiClientError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 408);
      }
      throw new ApiClientError(error.message, 0);
    }

    throw new ApiClientError('Unknown error', 0);
  }
}

// =============================================================================
// HTTP METHODS
// =============================================================================

export const apiClient = {
  /**
   * GET request
   */
  get<T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST request
   */
  post<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, method: 'POST', body });
  },

  /**
   * PUT request
   */
  put<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, method: 'PUT', body });
  },

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> {
    return baseFetch<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

// =============================================================================
// SERVER-SIDE FETCH (pour Next.js SSR/SSG)
// =============================================================================

export async function serverFetch<T>(
  endpoint: string,
  options?: Omit<FetchOptions, 'timeout'>
): Promise<T> {
  const fetchOptions: FetchOptions = {
    ...options,
    timeout: 30000, // 30s pour SSR
  };

  return baseFetch<T>(endpoint, fetchOptions);
}

// =============================================================================
// HELPER: Safe fetch avec fallback
// =============================================================================

export async function safeFetch<T>(
  endpoint: string,
  options?: FetchOptions,
  fallback?: T
): Promise<T | null> {
  try {
    return await baseFetch<T>(endpoint, options);
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return fallback ?? null;
  }
}
