/**
 * Types KPI - Indicateurs de Performance
 */

export interface PlatformKPI {
    total_articles: number;
    total_videos: number;
    monthly_readers: number;
    total_views: number;
    countries_covered: number;
    tv_experts: number;
    total_authors: number;
    last_updated: string;
}

// Helper pour formater les nombres
export function formatKPINumber(value: number): string {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
}

// Helper pour formater avec "+"
export function formatKPIWithPlus(value: number): string {
    return `${formatKPINumber(value)}+`;
}
