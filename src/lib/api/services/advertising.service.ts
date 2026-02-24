/**
 * Advertising Service - API Régie Publicitaire GAM
 */

import { apiClient, serverFetch, safeFetch } from '../client';
import type { Advertisement, AdPosition } from '@/types/advertising';

const ENDPOINTS = {
  ACTIVE: '/advertising/active/',
  TRACK: '/advertising/track/',
} as const;

export const advertisingService = {
  /**
   * Récupère les publicités actives (client-side)
   */
  getActiveAds(position?: AdPosition): Promise<Advertisement[]> {
    return apiClient.get<Advertisement[]>(ENDPOINTS.ACTIVE, {
      params: position ? { position } : undefined,
    });
  },

  /**
   * Récupère les publicités actives (server-side / SSR)
   */
  async getActiveAdsServer(position?: AdPosition): Promise<Advertisement[]> {
    const result = await safeFetch<Advertisement[]>(
      ENDPOINTS.ACTIVE,
      {
        params: position ? { position } : undefined,
        next: { revalidate: 300 },
      },
      []
    );
    return result ?? [];
  },

  /**
   * Enregistre une impression (fire-and-forget, client-side uniquement)
   */
  trackImpression(adId: number): Promise<void> {
    return apiClient
      .post<{ status: string }>(ENDPOINTS.TRACK, { ad_id: adId, event: 'impression' })
      .then(() => undefined)
      .catch(() => undefined); // Silencieux : ne pas bloquer l'UX
  },

  /**
   * Enregistre un clic (fire-and-forget, client-side uniquement)
   */
  trackClick(adId: number): Promise<void> {
    return apiClient
      .post<{ status: string }>(ENDPOINTS.TRACK, { ad_id: adId, event: 'click' })
      .then(() => undefined)
      .catch(() => undefined); // Silencieux : ne pas bloquer l'UX
  },
};
