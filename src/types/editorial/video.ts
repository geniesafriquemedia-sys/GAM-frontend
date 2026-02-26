/**
 * Types Vidéo (Web TV)
 * Gestion des vidéos YouTube
 */

import type { CategorySummary } from './category';
import type { PublicationStatus } from './article';

// =============================================================================
// VIDEO TYPE
// =============================================================================

export type VideoType =
  | 'emission'      // Émission
  | 'reportage'     // Reportage
  | 'interview'     // Interview
  | 'documentary'   // Documentaire
  | 'short';        // Court métrage

export const VIDEO_TYPE_LABELS: Record<VideoType, string> = {
  emission: 'Émission',
  reportage: 'Reportage',
  interview: 'Interview',
  documentary: 'Documentaire',
  short: 'Court métrage',
};

// =============================================================================
// VIDEO
// =============================================================================

export interface Video {
  id: number;
  title: string;
  slug: string;
  description: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail: string | null;        // Miniature personnalisée
  youtube_thumbnail: string;       // Miniature auto YouTube
  thumbnail_url: string;           // URL finale (priorité: custom > youtube)
  embed_url: string;               // URL embed YouTube
  video_type: VideoType;
  category: CategorySummary | null;
  tags: string;
  duration: number;                // Secondes
  duration_formatted: string;      // "5:30" ou "1:05:30"
  views_count: number;
  is_featured: boolean;
  is_live: boolean;
  status: PublicationStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
}

// Version allégée pour les listes (cards)
export interface VideoSummary {
  id: number;
  title: string;
  slug: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string;
  video_type: VideoType;
  category: CategorySummary | null;
  duration_formatted: string;
  is_featured: boolean;
  is_live: boolean;
  published_at: string | null;
}

// Vidéo avec vidéos liées
export interface VideoWithRelated extends Video {
  related_videos: VideoSummary[];
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

export interface VideoQueryParams {
  [key: string]: string | number | boolean | undefined | null;
  page?: number;
  page_size?: number;
  category?: string;         // Slug catégorie
  video_type?: VideoType;
  is_featured?: boolean;
  is_live?: boolean;
  tags?: string;
  search?: string;
  ordering?: string;         // '-published_at', 'title', '-views_count'
}

// =============================================================================
// HELPERS
// =============================================================================

export function getVideoUrl(video: Video | VideoSummary): string {
  return `/web-tv/${video.slug}`;
}

export function getVideoTags(video: Video): string[] {
  if (video.tags) {
    return video.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
}

export function getVideoTypeLabel(type: VideoType): string {
  return VIDEO_TYPE_LABELS[type] || type;
}

export function getVideoThumbnailUrl(
  video: Video | VideoSummary,
  fallback = '/images/logo.png'
): string {
  // Priority 1: precomputed URL from backend (custom upload or YouTube auto)
  if (video.thumbnail_url) return video.thumbnail_url;
  // Priority 2: build YouTube thumbnail directly from youtube_id
  if (video.youtube_id) {
    return `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
  }
  return fallback;
}

export function getVideoEmbedUrl(video: Video): string {
  return video.embed_url || `https://www.youtube.com/embed/${video.youtube_id}`;
}

// =============================================================================
// YOUTUBE HELPERS
// =============================================================================

export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function getYoutubeThumbnail(
  videoId: string,
  quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function formatDuration(seconds: number): string {
  if (!seconds) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// =============================================================================
// PLAYER OPTIONS
// =============================================================================

export interface YouTubePlayerOptions {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  mute?: boolean;
  start?: number;      // Timestamp en secondes
  rel?: boolean;       // Afficher vidéos suggérées
  modestbranding?: boolean;
}

export function buildEmbedUrl(videoId: string, options: YouTubePlayerOptions = {}): string {
  const params = new URLSearchParams();

  if (options.autoplay) params.set('autoplay', '1');
  if (options.controls === false) params.set('controls', '0');
  if (options.loop) params.set('loop', '1');
  if (options.mute) params.set('mute', '1');
  if (options.start) params.set('start', options.start.toString());
  if (options.rel === false) params.set('rel', '0');
  if (options.modestbranding) params.set('modestbranding', '1');

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}
