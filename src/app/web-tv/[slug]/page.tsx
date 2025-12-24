import { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { VideoDetail } from "@/components/VideoDetail";
import type { VideoWithRelated } from "@/types";
import { getVideoThumbnailUrl } from "@/types";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO (US-11)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const video = await api.videos.getBySlugServer(slug);
    const thumbnailUrl = getVideoThumbnailUrl(video);

    return {
      title: `${video.title} | GAM Web TV`,
      description: video.description || video.meta_description || `Regardez "${video.title}" sur GAM Web TV.`,
      keywords: video.tags?.split(',').map((t: string) => t.trim()) || [],
      openGraph: {
        title: video.title,
        description: video.description || '',
        url: `${SITE_URL}/web-tv/${slug}`,
        siteName: 'GAM - Geniesdafriquemedia',
        type: 'video.other',
        videos: video.youtube_id ? [
          {
            url: `https://www.youtube.com/watch?v=${video.youtube_id}`,
            width: 1280,
            height: 720,
          },
        ] : undefined,
        images: thumbnailUrl ? [
          {
            url: thumbnailUrl,
            width: 1280,
            height: 720,
            alt: video.title,
          },
        ] : undefined,
      },
      twitter: {
        card: 'player',
        title: video.title,
        description: video.description || '',
        images: thumbnailUrl ? [thumbnailUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'Vidéo non trouvée | GAM Web TV',
      description: 'Cette vidéo n\'existe pas ou a été supprimé.',
    };
  }
}

export default async function VideoPlayerPage({ params }: PageProps) {
  const { slug } = await params;

  let video: VideoWithRelated;

  try {
    video = await api.videos.getBySlugServer(slug);
  } catch (error) {
    notFound();
  }

  return <VideoDetail initialVideo={video} slug={slug} />;
}
