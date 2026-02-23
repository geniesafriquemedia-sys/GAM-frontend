"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, Info, Eye, Calendar, Tag, Tv2, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/VideoCard";
import { SocialShare } from "@/components/SocialShare";
import { useVideo } from "@/hooks";
import type { VideoWithRelated, VideoSummary } from "@/types";
import { getVideoThumbnailUrl, getVideoTypeLabel } from "@/types";

interface VideoDetailProps {
  initialVideo: VideoWithRelated;
  slug: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gam.africa";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M vues`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k vues`;
  return `${count} vue${count !== 1 ? "s" : ""}`;
}

/** Builds a privacy-enhanced (no-cookie) YouTube embed URL */
function buildEmbedUrl(youtubeId: string, autoplay: boolean): string {
  const base = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `${base}?${params.toString()}`;
}

export function VideoDetail({ initialVideo, slug }: VideoDetailProps) {
  const [autoplay, setAutoplay] = useState(false);

  const { data: video } = useVideo({
    slug,
    initialData: initialVideo,
    refetchOnMount: false,
  });

  if (!video) return null;

  const {
    title,
    description,
    video_type,
    category,
    youtube_id,
    is_live,
    published_at,
    related_videos,
  } = video;

  // views_count exists on the full Video type (VideoWithRelated extends Video)
  const views_count = (video as { views_count?: number }).views_count;

  const embedUrl = buildEmbedUrl(youtube_id, autoplay);
  const formattedDate = formatDate(published_at);
  const typeLabel = getVideoTypeLabel(video_type);
  const shareUrl = `${SITE_URL}/web-tv/${video.slug}`;

  return (
    <div className="flex flex-col gap-12 pb-24 bg-background text-foreground">
      <section className="bg-background pt-12 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full font-black uppercase tracking-widest text-[10px] border border-transparent hover:border-border"
          >
            <Link href="/web-tv">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la Web TV
            </Link>
          </Button>

          <div className="max-w-6xl mx-auto space-y-10">

            {/* ── YouTube Player (16:9, no-cookie iframe) ──────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full overflow-hidden rounded-[3rem] bg-black shadow-2xl border border-border ring-1 ring-border/50 ring-offset-4 ring-offset-background"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>

            {/* ── Autoplay toggle ───────────────────────────────────── */}
            <div className="flex justify-end">
              <button
                onClick={() => setAutoplay((v) => !v)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                aria-pressed={autoplay}
              >
                {autoplay ? (
                  <ToggleRight className="h-5 w-5 text-primary" />
                ) : (
                  <ToggleLeft className="h-5 w-5" />
                )}
                Lecture automatique {autoplay ? "activée" : "désactivée"}
              </button>
            </div>

            {/* ── Main content grid ─────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Left – Video info */}
              <div className="lg:col-span-8 space-y-8">

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    className="font-black uppercase tracking-widest border-none px-4 py-1.5 shadow-lg text-xs"
                    style={{
                      backgroundColor: category?.color || "var(--primary)",
                      color: "#fff",
                      boxShadow: category?.color ? `0 8px 24px ${category.color}40` : undefined,
                    }}
                  >
                    {category?.name || typeLabel}
                  </Badge>
                  {is_live && (
                    <div className="flex items-center gap-1.5 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      EN DIRECT
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-foreground">
                  {title}
                </h1>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-6 border-y border-border py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Tv2 className="h-4 w-4 text-primary/70" />
                    <span className="text-foreground">{typeLabel}</span>
                  </div>
                  {formattedDate && (
                    <>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary/70" />
                        <span className="text-foreground normal-case font-semibold">{formattedDate}</span>
                      </div>
                    </>
                  )}
                  {typeof views_count === "number" && views_count > 0 && (
                    <>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4 text-primary/70" />
                        <span className="text-foreground normal-case font-semibold">{formatViews(views_count)}</span>
                      </div>
                    </>
                  )}
                  {category && (
                    <>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-primary/70" />
                        <span className="text-foreground">{category.name}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Share + YouTube link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <SocialShare url={shareUrl} title={title} />
                  {youtube_id && (
                    <Button
                      asChild
                      className="rounded-full h-10 px-6 font-black uppercase tracking-widest text-xs bg-primary text-white shadow-lg shadow-primary/20 shrink-0"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir sur YouTube
                      </a>
                    </Button>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                      <span className="p-1 bg-primary/10 rounded-lg">
                        <Info className="h-3.5 w-3.5" />
                      </span>
                      À propos de cette vidéo
                    </div>
                    <p className="text-xl text-foreground/80 font-medium leading-relaxed italic">
                      {description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right – Related videos sidebar */}
              <div className="lg:col-span-4 space-y-12">
                {related_videos && related_videos.length > 0 && (
                  <div className="bg-card rounded-[2.5rem] p-8 border border-border sticky top-24">
                    <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3 text-foreground">
                      <PlayCircle className="h-6 w-6 text-primary" />
                      Vidéos similaires
                    </h3>
                    <div className="space-y-6">
                      {related_videos.slice(0, 4).map((v: VideoSummary) => (
                        <Link
                          key={v.id}
                          href={`/web-tv/${v.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4 items-start">
                            {/* Thumbnail */}
                            <div className="relative w-28 shrink-0 aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                              <Image
                                src={getVideoThumbnailUrl(v)}
                                alt={v.title}
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400"
                                sizes="112px"
                              />
                              {/* Mini play button */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="h-7 w-7 rounded-full bg-primary/90 flex items-center justify-center shadow">
                                  <PlayCircle className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              {/* Duration */}
                              {v.duration_formatted && (
                                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  {v.duration_formatted}
                                </span>
                              )}
                              {/* Live badge */}
                              {v.is_live && (
                                <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                  Live
                                </span>
                              )}
                            </div>
                            {/* Title + meta */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <h4 className="font-black text-sm leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                                {v.title}
                              </h4>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                {getVideoTypeLabel(v.video_type)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Videos section ───────────────────────────────────── */}
      {related_videos && related_videos.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                <PlayCircle className="h-4 w-4" />
                <span>Continuer à regarder</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-foreground">
                Vous aimerez aussi.
              </h2>
            </div>
            <Button
              variant="outline"
              asChild
              className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-border hover:bg-muted"
            >
              <Link href="/web-tv">Voir tout le catalogue</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {related_videos.slice(0, 6).map((v: VideoSummary, i: number) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
