/**
 * Site Service - Paramètres du site (réseaux sociaux, config globale)
 */

import { apiClient, serverFetch, safeFetch } from '../client';
import { ENDPOINTS } from '../config';
import type { SocialNetwork } from '@/types';

// =============================================================================
// SOCIAL NETWORKS
// =============================================================================

export const siteService = {
  /**
   * Client-side : liste des réseaux sociaux actifs
   */
  getSocialNetworks(): Promise<SocialNetwork[]> {
    return apiClient.get<SocialNetwork[]>(ENDPOINTS.CORE.SOCIAL_NETWORKS);
  },

  /**
   * SSR : liste des réseaux sociaux actifs (avec cache 10 min)
   */
  async getSocialNetworksServer(): Promise<SocialNetwork[]> {
    return serverFetch<SocialNetwork[]>(ENDPOINTS.CORE.SOCIAL_NETWORKS, {
      next: { revalidate: 600, tags: ['social-networks'] },
    });
  },

  /**
   * SSR avec fallback silencieux (ne bloque jamais le rendu)
   */
  async getSocialNetworksSafe(): Promise<SocialNetwork[]> {
    return safeFetch<SocialNetwork[]>(
      ENDPOINTS.CORE.SOCIAL_NETWORKS,
      { next: { revalidate: 600 } },
      []
    ).then(r => r ?? []);
  },
};
