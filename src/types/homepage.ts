/**
 * Types Page d'Accueil
 * Données agrégées pour la homepage
 */

import type { ArticleSummary } from './editorial/article';
import type { VideoSummary } from './editorial/video';
import type { Category } from './editorial/category';

// =============================================================================
// HOMEPAGE RESPONSE
// =============================================================================

export interface HomepageResponse {
  featured_articles: ArticleSummary[];    // Articles "À la Une" (max 3)
  latest_articles: ArticleSummary[];      // Derniers articles (12)
  featured_videos: VideoSummary[];        // Vidéos en vedette (4)
  categories: CategoryWithContent[];      // Catégories avec contenus
  trending_tags: string[];                // Tags populaires
}

// =============================================================================
// CATEGORY WITH CONTENT
// =============================================================================

export interface CategoryWithContent extends Category {
  latest_articles: ArticleSummary[];      // 4 derniers articles de la catégorie
  latest_videos: VideoSummary[];          // 2 dernières vidéos
}

// =============================================================================
// HOMEPAGE SECTIONS
// =============================================================================

export interface HeroSection {
  main_article: ArticleSummary;           // Article principal
  secondary_articles: ArticleSummary[];   // 2 articles secondaires
}

export interface NewsSection {
  title: string;
  articles: ArticleSummary[];
  view_all_url: string;
}

export interface VideoSection {
  title: string;
  videos: VideoSummary[];
  view_all_url: string;
}

export interface CategorySection {
  category: Category;
  articles: ArticleSummary[];
  videos: VideoSummary[];
  view_all_url: string;
}

// =============================================================================
// HOMEPAGE STATE
// =============================================================================

export interface HomepageState {
  data: HomepageResponse | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const initialHomepageState: HomepageState = {
  data: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// =============================================================================
// HELPERS
// =============================================================================

export function buildHeroSection(articles: ArticleSummary[]): HeroSection | null {
  if (articles.length === 0) return null;

  return {
    main_article: articles[0],
    secondary_articles: articles.slice(1, 3),
  };
}

export function groupArticlesByCategory(
  articles: ArticleSummary[]
): Map<string, ArticleSummary[]> {
  const grouped = new Map<string, ArticleSummary[]>();

  for (const article of articles) {
    const categorySlug = article.category.slug;
    const existing = grouped.get(categorySlug) || [];
    grouped.set(categorySlug, [...existing, article]);
  }

  return grouped;
}

export function getLatestContent<T extends { published_at: string | null }>(
  items: T[],
  limit: number
): T[] {
  return [...items]
    .sort((a, b) => {
      const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
      const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}
