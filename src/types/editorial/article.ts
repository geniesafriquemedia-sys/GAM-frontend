/**
 * Types Article
 * Articles avec blocs StreamField
 */

import type { AuthorSummary } from './author';
import type { CategorySummary } from './category';

// =============================================================================
// PUBLICATION STATUS
// =============================================================================

export type PublicationStatus = 'draft' | 'published';

// =============================================================================
// ARTICLE BLOCKS (StreamField)
// =============================================================================

export type ArticleBlockType =
  | 'text'
  | 'image'
  | 'quote'
  | 'video'
  | 'tweet'
  | 'heading'
  | 'list'
  | 'code'
  | 'cta';

// Block values par type
export interface TextBlockValue {
  content: string; // HTML riche
}

export interface ImageBlockValue {
  image: {
    id: number;
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  caption: string;
  attribution: string;
}

export interface QuoteBlockValue {
  quote: string;
  author: string;
  source: string;
}

export interface VideoBlockValue {
  video: {
    url: string;
    html: string; // Embed HTML
  };
  caption: string;
}

export interface TweetBlockValue {
  tweet_url: string;
}

export interface HeadingBlockValue {
  heading: string;
  level: 'h2' | 'h3' | 'h4';
}

export interface ListBlockValue {
  items: string[];
  list_type: 'ul' | 'ol';
}

export interface CodeBlockValue {
  language: 'python' | 'javascript' | 'html' | 'css' | 'bash' | 'json' | 'other';
  code: string;
}

export interface CtaBlockValue {
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'success';
}

// Union type pour toutes les valeurs de bloc
export type ArticleBlockValue =
  | TextBlockValue
  | ImageBlockValue
  | QuoteBlockValue
  | VideoBlockValue
  | TweetBlockValue
  | HeadingBlockValue
  | ListBlockValue
  | CodeBlockValue
  | CtaBlockValue;

// Structure d'un bloc
export interface ArticleBlock<T extends ArticleBlockType = ArticleBlockType> {
  id: string;
  type: T;
  value: T extends 'text' ? TextBlockValue :
         T extends 'image' ? ImageBlockValue :
         T extends 'quote' ? QuoteBlockValue :
         T extends 'video' ? VideoBlockValue :
         T extends 'tweet' ? TweetBlockValue :
         T extends 'heading' ? HeadingBlockValue :
         T extends 'list' ? ListBlockValue :
         T extends 'code' ? CodeBlockValue :
         T extends 'cta' ? CtaBlockValue :
         ArticleBlockValue;
}

// =============================================================================
// ARTICLE
// =============================================================================

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  image_url: string;                // URL de l'image (uploadée ou externe)
  featured_image_caption: string;
  author: AuthorSummary;
  category: CategorySummary;
  tags: string;                    // "tag1, tag2, tag3"
  tags_list: string[];             // Tags en tableau
  body_blocks: ArticleBlock[];     // Blocs StreamField (Wagtail)
  content: string;                 // Contenu HTML legacy
  reading_time: number;            // Minutes
  views_count: number;
  is_featured: boolean;
  is_trending: boolean;
  status: PublicationStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
}

// Version allégée pour les listes (cards)
export interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  image_url: string;                // URL de l'image (uploadée ou externe)
  author: AuthorSummary;
  category: CategorySummary;
  reading_time: number;
  is_featured: boolean;
  is_trending: boolean;
  published_at: string | null;
}

// Article avec articles liés
export interface ArticleWithRelated extends Article {
  related_articles: ArticleSummary[];
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

export interface ArticleQueryParams {
  [key: string]: string | number | boolean | undefined | null;
  page?: number;
  page_size?: number;
  category?: string;        // ID catégorie
  category_slug?: string;   // Slug catégorie
  author?: number;          // ID auteur
  author_slug?: string;     // Slug auteur
  is_featured?: boolean;
  is_trending?: boolean;
  tags?: string;            // Tag à filtrer
  search?: string;
  ordering?: string;        // '-published_at', 'title', '-views_count'
}

// =============================================================================
// HELPERS
// =============================================================================

export function getArticleUrl(article: Article | ArticleSummary): string {
  return `/articles/${article.slug}`;
}

export function getArticleTags(article: Article | ArticleSummary): string[] {
  if ('tags' in article && article.tags) {
    return article.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
}

export function formatReadingTime(minutes: number): string {
  if (minutes <= 1) return '1 min de lecture';
  return `${minutes} min de lecture`;
}

export function getArticleImageUrl(
  article: Article | ArticleSummary,
  fallback = '/images/article-placeholder.jpg'
): string {
  // Priorité: image_url (inclut uploaded et external), puis featured_image, puis fallback
  return article.image_url || article.featured_image || fallback;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isTextBlock(block: ArticleBlock): block is ArticleBlock<'text'> {
  return block.type === 'text';
}

export function isImageBlock(block: ArticleBlock): block is ArticleBlock<'image'> {
  return block.type === 'image';
}

export function isQuoteBlock(block: ArticleBlock): block is ArticleBlock<'quote'> {
  return block.type === 'quote';
}

export function isVideoBlock(block: ArticleBlock): block is ArticleBlock<'video'> {
  return block.type === 'video';
}

export function isHeadingBlock(block: ArticleBlock): block is ArticleBlock<'heading'> {
  return block.type === 'heading';
}
