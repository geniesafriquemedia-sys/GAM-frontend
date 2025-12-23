/**
 * Sitemap dynamique pour SEO (US-11)
 * Génère automatiquement le sitemap.xml
 */

import { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/lib/api/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

interface ArticleSlug {
  slug: string;
  updated_at: string;
}

interface VideoSlug {
  slug: string;
  updated_at: string;
}

interface CategorySlug {
  slug: string;
}

interface AuthorSlug {
  slug: string;
}

async function getArticles(): Promise<ArticleSlug[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/editorial/articles/?page_size=1000&fields=slug,updated_at`, {
      next: { revalidate: 3600 }, // Cache 1 heure
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

async function getVideos(): Promise<VideoSlug[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/editorial/videos/?page_size=1000&fields=slug,updated_at`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

async function getCategories(): Promise<CategorySlug[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/editorial/categories/?fields=slug`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

async function getAuthors(): Promise<AuthorSlug[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/editorial/authors/?fields=slug`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

// Helper pour valider les dates
function safeDate(dateString: string | undefined | null): Date {
  if (!dateString) return new Date();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer les données en parallèle
  const [articles, videos, categories, authors] = await Promise.all([
    getArticles(),
    getVideos(),
    getCategories(),
    getAuthors(),
  ]);

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/actualites`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/web-tv`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/direct`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Pages d'articles
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: safeDate(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Pages de vidéos
  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${SITE_URL}/web-tv/${video.slug}`,
    lastModified: safeDate(video.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Pages de catégories
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // Pages d'auteurs
  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${SITE_URL}/auteurs/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...videoPages,
    ...categoryPages,
    ...authorPages,
  ];
}
