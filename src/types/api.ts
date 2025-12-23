/**
 * Types API de base
 * Pagination, réponses et erreurs
 */

// =============================================================================
// PAGINATION
// =============================================================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginationParams {
  [key: string]: string | number | boolean | undefined | null;
  page?: number;
  page_size?: number;
}

// =============================================================================
// RESPONSES
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiSuccessResponse {
  success: boolean;
  message: string;
}

// =============================================================================
// ERRORS
// =============================================================================

export interface ApiError {
  detail?: string;
  code?: string;
  [field: string]: string | string[] | undefined;
}

export interface ValidationError {
  [field: string]: string[];
}

// =============================================================================
// HTTP
// =============================================================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

// =============================================================================
// ORDERING
// =============================================================================

export type OrderDirection = 'asc' | 'desc';

export interface OrderingParam {
  field: string;
  direction: OrderDirection;
}

// Helper pour construire le param ordering
export function buildOrdering(ordering: OrderingParam): string {
  return ordering.direction === 'desc' ? `-${ordering.field}` : ordering.field;
}
