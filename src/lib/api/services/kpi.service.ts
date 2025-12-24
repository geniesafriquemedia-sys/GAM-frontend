/**
 * KPI Service - API pour les indicateurs de performance
 */

import { apiClient } from '../client';
import type { PlatformKPI } from '@/types';

const ENDPOINTS = {
    PLATFORM: '/kpi/platform/',
} as const;

export const kpiService = {
    /**
     * Récupère les KPI de la plateforme (client-side)
     */
    getPlatformKPI: () => {
        return apiClient.get<PlatformKPI>(ENDPOINTS.PLATFORM);
    },

    /**
     * Récupère les KPI de la plateforme (server-side)
     */
    getPlatformKPIServer: async () => {
        return apiClient.get<PlatformKPI>(ENDPOINTS.PLATFORM);
    },
};
