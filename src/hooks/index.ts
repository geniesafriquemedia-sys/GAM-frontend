/**
 * Hooks - Export centralisé
 *
 * Usage:
 * ```typescript
 * import { useIsMobile } from '@/hooks';
 * import { useArticles, useSearch } from '@/hooks/api';
 * ```
 */

// =============================================================================
// UI HOOKS
// =============================================================================
export { useIsMobile } from './use-mobile';

// =============================================================================
// API HOOKS (re-export)
// =============================================================================
export * from './api';
