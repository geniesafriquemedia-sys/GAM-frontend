/**
 * Service Editorial
 * Articles, Videos, Categories, Authors, Homepage
 */

import { apiClient, serverFetch } from '../client';
import { ENDPOINTS, CACHE_TIMES, buildQueryString } from '../config';
import type {
  PaginatedResponse,
  Article,
  ArticleSummary,
  ArticleWithRelated,
  ArticleQueryParams,
  Video,
  VideoSummary,
  VideoWithRelated,
  VideoQueryParams,
  Category,
  CategoryQueryParams,
  Author,
  AuthorQueryParams,
  HomepageResponse,
} from '@/types';

// =============================================================================
// ARTICLES
// =============================================================================

export const articlesService = {
  /**
   * Liste des articles (paginée)
   */
  async getAll(params?: ArticleQueryParams): Promise<PaginatedResponse<ArticleSummary>> {
    return apiClient.get<PaginatedResponse<ArticleSummary>>(
      ENDPOINTS.EDITORIAL.ARTICLES,
      { params }
    );
  },

  /**
   * Détail d'un article par slug (avec articles liés)
   */
  async getBySlug(slug: string): Promise<ArticleWithRelated> {
    return apiClient.get<ArticleWithRelated>(ENDPOINTS.EDITORIAL.ARTICLE(slug));
  },

  /**
   * Articles à la une
   */
  async getFeatured(limit = 3): Promise<ArticleSummary[]> {
    return apiClient.get<ArticleSummary[]>(
      ENDPOINTS.EDITORIAL.ARTICLES_FEATURED,
      { params: { limit } }
    );
  },

  /**
   * Articles par catégorie
   */
  async getByCategory(
    categorySlug: string,
    params?: Omit<ArticleQueryParams, 'category_slug'>
  ): Promise<PaginatedResponse<ArticleSummary>> {
    return this.getAll({ ...params, category_slug: categorySlug });
  },

  /**
   * Articles par auteur
   */
  async getByAuthor(
    authorSlug: string,
    params?: Omit<ArticleQueryParams, 'author_slug'>
  ): Promise<PaginatedResponse<ArticleSummary>> {
    return this.getAll({ ...params, author_slug: authorSlug });
  },

  /**
   * Articles tendance
   */
  async getTrending(limit = 5): Promise<ArticleSummary[]> {
    const response = await this.getAll({
      is_trending: true,
      page_size: limit,
      ordering: '-published_at',
    });
    return response.results;
  },

  // ===========================================================================
  // SERVER-SIDE (SSR/SSG)
  // ===========================================================================

  /**
   * Liste articles (SSR)
   */
  async getAllServer(params?: ArticleQueryParams): Promise<PaginatedResponse<ArticleSummary>> {
    const queryString = params ? buildQueryString(params) : '';
    return serverFetch<PaginatedResponse<ArticleSummary>>(
      `${ENDPOINTS.EDITORIAL.ARTICLES}${queryString}`,
      { next: { revalidate: CACHE_TIMES.ARTICLES } }
    );
  },

  /**
   * Détail article (SSR) avec articles liés
   */
  async getBySlugServer(slug: string): Promise<ArticleWithRelated> {
    return serverFetch<ArticleWithRelated>(
      ENDPOINTS.EDITORIAL.ARTICLE(slug),
      { next: { revalidate: CACHE_TIMES.ARTICLE_DETAIL, tags: [`article-${slug}`] } }
    );
  },
};

// =============================================================================
// VIDEOS
// =============================================================================

export const videosService = {
  /**
   * Liste des vidéos (paginée)
   */
  async getAll(params?: VideoQueryParams): Promise<PaginatedResponse<VideoSummary>> {
    return apiClient.get<PaginatedResponse<VideoSummary>>(
      ENDPOINTS.EDITORIAL.VIDEOS,
      { params }
    );
  },

  /**
   * Détail d'une vidéo par slug (avec vidéos liées)
   */
  async getBySlug(slug: string): Promise<VideoWithRelated> {
    return apiClient.get<VideoWithRelated>(ENDPOINTS.EDITORIAL.VIDEO(slug));
  },

  /**
   * Vidéos en vedette
   */
  async getFeatured(limit = 4): Promise<VideoSummary[]> {
    return apiClient.get<VideoSummary[]>(
      ENDPOINTS.EDITORIAL.VIDEOS_FEATURED,
      { params: { limit } }
    );
  },

  /**
   * Vidéos par type
   */
  async getByType(
    videoType: string,
    params?: Omit<VideoQueryParams, 'video_type'>
  ): Promise<PaginatedResponse<VideoSummary>> {
    return this.getAll({ ...params, video_type: videoType as VideoQueryParams['video_type'] });
  },

  /**
   * Vidéos par catégorie
   */
  async getByCategory(
    categorySlug: string,
    params?: Omit<VideoQueryParams, 'category'>
  ): Promise<PaginatedResponse<VideoSummary>> {
    return this.getAll({ ...params, category: categorySlug });
  },

  // ===========================================================================
  // SERVER-SIDE (SSR/SSG)
  // ===========================================================================

  async getAllServer(params?: VideoQueryParams): Promise<PaginatedResponse<VideoSummary>> {
    const queryString = params ? buildQueryString(params) : '';
    return serverFetch<PaginatedResponse<VideoSummary>>(
      `${ENDPOINTS.EDITORIAL.VIDEOS}${queryString}`,
      { next: { revalidate: CACHE_TIMES.ARTICLES } }
    );
  },

  async getBySlugServer(slug: string): Promise<VideoWithRelated> {
    return serverFetch<VideoWithRelated>(
      ENDPOINTS.EDITORIAL.VIDEO(slug),
      { next: { revalidate: CACHE_TIMES.VIDEO_DETAIL, tags: [`video-${slug}`] } }
    );
  },
};

// =============================================================================
// CATEGORIES
// =============================================================================

export const categoriesService = {
  /**
   * Liste des catégories
   */
  async getAll(params?: CategoryQueryParams): Promise<PaginatedResponse<Category>> {
    return apiClient.get<PaginatedResponse<Category>>(
      ENDPOINTS.EDITORIAL.CATEGORIES,
      { params }
    );
  },

  /**
   * Toutes les catégories actives (sans pagination)
   */
  async getAllActive(): Promise<Category[]> {
    const response = await this.getAll({
      is_active: true,
      page_size: 100,
      ordering: 'order',
    });
    return response.results;
  },

  /**
   * Catégories en vedette
   */
  async getFeatured(): Promise<Category[]> {
    const response = await this.getAll({
      is_featured: true,
      is_active: true,
      ordering: 'order',
    });
    return response.results;
  },

  /**
   * Détail d'une catégorie par slug
   */
  async getBySlug(slug: string): Promise<Category> {
    return apiClient.get<Category>(ENDPOINTS.EDITORIAL.CATEGORY(slug));
  },

  // ===========================================================================
  // SERVER-SIDE (SSR/SSG)
  // ===========================================================================

  async getAllServer(): Promise<Category[]> {
    const response = await serverFetch<PaginatedResponse<Category>>(
      `${ENDPOINTS.EDITORIAL.CATEGORIES}?is_active=true&page_size=100&ordering=order`,
      { next: { revalidate: CACHE_TIMES.CATEGORIES } }
    );
    return response.results;
  },

  async getBySlugServer(slug: string): Promise<Category> {
    return serverFetch<Category>(
      ENDPOINTS.EDITORIAL.CATEGORY(slug),
      { next: { revalidate: CACHE_TIMES.CATEGORIES, tags: [`category-${slug}`] } }
    );
  },
};

// =============================================================================
// AUTHORS
// =============================================================================

export const authorsService = {
  /**
   * Liste des auteurs
   */
  async getAll(params?: AuthorQueryParams): Promise<PaginatedResponse<Author>> {
    return apiClient.get<PaginatedResponse<Author>>(
      ENDPOINTS.EDITORIAL.AUTHORS,
      { params }
    );
  },

  /**
   * Tous les auteurs actifs
   */
  async getAllActive(): Promise<Author[]> {
    const response = await this.getAll({
      is_active: true,
      page_size: 100,
      ordering: 'name',
    });
    return response.results;
  },

  /**
   * Détail d'un auteur par slug
   */
  async getBySlug(slug: string): Promise<Author> {
    return apiClient.get<Author>(ENDPOINTS.EDITORIAL.AUTHOR(slug));
  },

  // ===========================================================================
  // SERVER-SIDE (SSR/SSG)
  // ===========================================================================

  async getAllServer(): Promise<Author[]> {
    const response = await serverFetch<PaginatedResponse<Author>>(
      `${ENDPOINTS.EDITORIAL.AUTHORS}?is_active=true&page_size=100&ordering=name`,
      { next: { revalidate: CACHE_TIMES.AUTHORS } }
    );
    return response.results;
  },

  async getBySlugServer(slug: string): Promise<Author> {
    return serverFetch<Author>(
      ENDPOINTS.EDITORIAL.AUTHOR(slug),
      { next: { revalidate: CACHE_TIMES.AUTHORS, tags: [`author-${slug}`] } }
    );
  },
};

// =============================================================================
// HOMEPAGE
// =============================================================================

export const homepageService = {
  /**
   * Données de la page d'accueil
   */
  async getData(): Promise<HomepageResponse> {
    return apiClient.get<HomepageResponse>(ENDPOINTS.EDITORIAL.HOMEPAGE);
  },

  /**
   * Données homepage (SSR)
   */
  async getDataServer(): Promise<HomepageResponse> {
    return serverFetch<HomepageResponse>(
      ENDPOINTS.EDITORIAL.HOMEPAGE,
      { next: { revalidate: CACHE_TIMES.HOMEPAGE, tags: ['homepage'] } }
    );
  },
};
