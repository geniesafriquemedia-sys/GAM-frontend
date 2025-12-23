/**
 * Types Auteur
 * Gestion des auteurs d'articles
 */

// =============================================================================
// AUTHOR
// =============================================================================

export interface Author {
  id: number;
  name: string;
  slug: string;
  photo: string | null;
  bio: string;
  email: string;
  twitter: string;
  linkedin: string;
  website: string;
  is_active: boolean;
  articles_count: number;
  created_at: string;
  updated_at: string;
}

// Version allégée pour les listes et relations
export interface AuthorSummary {
  id: number;
  name: string;
  slug: string;
  photo: string | null;
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

export interface AuthorQueryParams {
  [key: string]: string | number | boolean | undefined | null;
  page?: number;
  page_size?: number;
  is_active?: boolean;
  search?: string;
  ordering?: string; // 'name', '-name', 'articles_count', '-articles_count'
}

// =============================================================================
// SOCIAL LINKS
// =============================================================================

export interface AuthorSocialLinks {
  twitter: string;
  linkedin: string;
  website: string;
}

export function getAuthorSocialLinks(author: Author): AuthorSocialLinks {
  return {
    twitter: author.twitter,
    linkedin: author.linkedin,
    website: author.website,
  };
}

// =============================================================================
// HELPERS
// =============================================================================

export function getAuthorPhotoUrl(author: Author | AuthorSummary, fallback = '/images/avatar-placeholder.png'): string {
  return author.photo || fallback;
}

export function getAuthorUrl(author: Author | AuthorSummary): string {
  return `/auteurs/${author.slug}`;
}
