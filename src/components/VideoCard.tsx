"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import type { VideoSummary } from "@/types";
import { getVideoThumbnailUrl, getVideoTypeLabel } from "@/types";

interface VideoCardProps {
  video: VideoSummary;
  index?: number;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return count.toString();
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const {
    slug,
    title,
    video_type,
    category,
    is_live,
    duration_formatted,
  } = video;

  // views_count only exists on the full Video type, not VideoSummary
  const views_count = (video as { views_count?: number }).views_count;

  const thumbnail = getVideoThumbnailUrl(video);
  const typeLabel = getVideoTypeLabel(video_type);
  
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Extraire l'ID YouTube de la vidéo
  const youtubeId = (video as { youtube_video_id?: string }).youtube_video_id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col gap-4"
    >
      {/* Thumbnail */}
      <Link
        href={`/web-tv/${slug}`}
        className="relative aspect-video overflow-hidden rounded-[2rem] bg-muted shadow-xl transition-shadow duration-300 hover:shadow-2xl block"
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-14 w-14 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-md border border-white/30 shadow-lg transition-colors duration-300 group-hover:bg-primary group-hover:border-primary"
          >
            <Play className="h-6 w-6 fill-foreground group-hover:fill-white text-foreground group-hover:text-white translate-x-0.5 transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Live badge */}
        {is_live && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 shadow-lg shadow-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            EN DIRECT
          </div>
        )}

        {/* Duration badge */}
        {!is_live && duration_formatted && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration_formatted}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="space-y-2 px-1">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="border-none text-[9px] font-black uppercase tracking-widest px-3 shrink-0"
            style={{
              backgroundColor: category?.color ? `${category.color}20` : "var(--primary-10)",
              color: category?.color || "var(--primary)",
            }}
          >
            {category?.name || typeLabel}
          </Badge>

          {/* View count */}
          {typeof views_count === "number" && views_count > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground shrink-0">
              <Eye className="h-3 w-3" />
              {formatViews(views_count)}
            </span>
          )}
        </div>

        <Link href={`/web-tv/${slug}`} className="block">
          <h3 className="text-xl font-black leading-tight tracking-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Type label */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          {typeLabel}
        </p>
      </div>
    </motion.div>
  );
}
