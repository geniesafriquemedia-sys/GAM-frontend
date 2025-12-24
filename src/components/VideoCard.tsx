"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VideoSummary } from "@/types";
import { getVideoThumbnailUrl, getVideoTypeLabel } from "@/types";

interface VideoCardProps {
  video: VideoSummary;
}

export function VideoCard({ video }: VideoCardProps) {
  const {
    slug,
    title,
    duration_formatted,
    video_type,
    category,
    is_live
  } = video;

  const thumbnail = getVideoThumbnailUrl(video);
  const typeLabel = getVideoTypeLabel(video_type);

  return (
    <div className="group relative flex flex-col gap-4">
      <Link href={`/web-tv/${slug}`} className="relative aspect-video overflow-hidden rounded-[2rem] bg-muted shadow-xl transition-all hover:shadow-2xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-md border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
            <Play className="h-6 w-6 fill-foreground group-hover:fill-white text-foreground group-hover:text-white translate-x-0.5 transition-colors" />
          </div>
        </div>
        {is_live && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            EN DIRECT
          </div>
        )}
      </Link>
      <div className="space-y-2 px-2">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="border-none text-[9px] font-black uppercase tracking-widest px-3"
            style={{
              backgroundColor: category?.color ? `${category.color}20` : 'var(--primary-10)',
              color: category?.color || 'var(--primary)'
            }}
          >
            {category?.name || typeLabel}
          </Badge>
        </div>
        <Link href={`/web-tv/${slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xl font-black leading-tight tracking-tight line-clamp-2 text-foreground">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
