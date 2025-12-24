import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ArticleDetail } from "@/components/ArticleDetail";
import { getMediaUrl } from "@/lib/api/config";
import type { ArticleWithRelated, ArticleSummary } from "@/types";

// Revalidate toutes les 60 secondes
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper pour obtenir l'URL d'image d'un article
function getImageUrl(article: ArticleWithRelated | ArticleSummary): string | null {
  const rawUrl = article.image_url || null;
  return rawUrl ? getMediaUrl(rawUrl) : null;
}

// Generate metadata for SEO (US-11)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await api.articles.getBySlugServer(slug);
    const imageUrl = getImageUrl(article);

    return {
      title: `${article.title} | GAM`,
      description: article.excerpt || article.meta_description || `Lire l'article "${article.title}" sur GAM.`,
      keywords: article.tags?.split(',').map((t: string) => t.trim()) || [],
      authors: article.author ? [{ name: article.author.name }] : undefined,
      openGraph: {
        title: article.title,
        description: article.excerpt || '',
        url: `${SITE_URL}/articles/${slug}`,
        siteName: 'GAM - Génies Afrique Médias',
        type: 'article',
        publishedTime: article.published_at || undefined,
        authors: article.author ? [article.author.name] : undefined,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || '',
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'Article non trouvé | GAM',
      description: 'Cet article n\'existe pas ou a été supprimé.',
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article: ArticleWithRelated;

  try {
    article = await api.articles.getBySlugServer(slug);
  } catch (error) {
    notFound();
  }

  return <ArticleDetail initialArticle={article} slug={slug} />;
}
