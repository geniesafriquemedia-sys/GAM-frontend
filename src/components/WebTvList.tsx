"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Tv, Loader2, Radio, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "@/components/VideoCard";
import { useVideos } from "@/hooks";
import type { VideoType, VideoSummary, PaginatedResponse } from "@/types";
import { getVideoThumbnailUrl, getVideoTypeLabel } from "@/types";
import { PageWithSidebar } from "@/components/layouts/PageWithSidebar";

type VideoTypeFilter = "all" | VideoType;

const FILTER_TABS: { value: VideoTypeFilter; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "emission", label: "Émissions" },
  { value: "reportage", label: "Reportages" },
  { value: "interview", label: "Interviews" },
  { value: "documentary", label: "Documentaires" },
  { value: "short", label: "Courts métrages" },
];

interface WebTvListProps {
  initialVideos: PaginatedResponse<VideoSummary>;
  featuredVideo: VideoSummary | null;
}

export function WebTvList({ initialVideos, featuredVideo }: WebTvListProps) {
  const [activeFilter, setActiveFilter] = useState<VideoTypeFilter>("all");

  const {
    videos,
    pagination,
    isLoading,
    setVideoType,
    setPage,
  } = useVideos({
    initialParams: {
      page_size: 12,
      ordering: "-published_at",
      is_live: false,
    },
    initialData: initialVideos,
    refetchOnMount: false,
  });

  const handleFilterChange = (type: VideoTypeFilter) => {
    setActiveFilter(type);
    setVideoType(type === "all" ? undefined : type);
  };

  const handleLoadMore = () => {
    if (pagination.hasNext) {
      setPage(pagination.page + 1);
    }
  };

  return (
    <PageWithSidebar showTopAd={true}>
      <div className="space-y-12">

      {/* ── Hero / Featured Video ─────────────────────────────────── */}
      {featuredVideo && (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          {/* Ambient blobs */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-primary/5 blur-[180px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-1/2 h-2/3 bg-accent/5 blur-[120px]" />

          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left – Info */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8 order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                    <Tv className="h-4 w-4" />
                    <span>Web TV</span>
                  </div>
                  {featuredVideo.is_live ? (
                    <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      EN DIRECT
                    </div>
                  ) : (
                    <Badge
                      className="font-black uppercase tracking-widest text-xs border-none"
                      style={{
                        backgroundColor: featuredVideo.category?.color || "var(--primary)",
                        color: "#fff",
                      }}
                    >
                      {featuredVideo.category?.name || getVideoTypeLabel(featuredVideo.video_type)}
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
                  {featuredVideo.title}
                </h1>

                {featuredVideo.description && (
                  <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                    {featuredVideo.description.length > 180
                      ? `${featuredVideo.description.substring(0, 180)}…`
                      : featuredVideo.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30 transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href={`/web-tv/${featuredVideo.slug}`}>
                      <Play className="mr-2 h-5 w-5 fill-white" />
                      Regarder
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right – Thumbnail (larger, with play overlay) */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="order-1 lg:order-2"
              >
                <Link href={`/web-tv/${featuredVideo.slug}`} className="block group">
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/30 border border-border/50 ring-1 ring-border/30 ring-offset-4 ring-offset-background">
                    <div className="aspect-video relative">
                      <Image
                        src={getVideoThumbnailUrl(featuredVideo)}
                        alt={featuredVideo.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-300" />

                      {/* Central play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.12 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className="h-24 w-24 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 shadow-2xl group-hover:bg-primary group-hover:border-primary transition-colors duration-300"
                        >
                          <Play className="h-12 w-12 fill-white text-white translate-x-1" />
                        </motion.div>
                      </div>

                      {/* Bottom label */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <span className="text-white font-black text-sm line-clamp-1 drop-shadow-lg">
                          {featuredVideo.title}
                        </span>
                        {featuredVideo.duration_formatted && (
                          <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg ml-2 shrink-0">
                            {featuredVideo.duration_formatted}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── Direct CTA Banner ─────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-8">
        <Link
          href="/direct"
          className="block rounded-3xl bg-gradient-to-r from-red-500 to-red-600 p-8 md:p-12 text-white hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Radio className="h-8 w-8 animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                  GAM en Direct
                </h3>
                <p className="text-white/90 font-medium">
                  Suivez notre direct en continu – Actualités et débats en temps réel
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-white/90 font-black rounded-full px-8 shadow-lg group-hover:scale-105 transition-transform shrink-0"
            >
              Voir le direct
              <Play className="ml-2 h-5 w-5 fill-current" />
            </Button>
          </div>
        </Link>
      </section>

      {/* ── Catalogue + Filters ───────────────────────────────────── */}
      <section className="container mx-auto px-4 mt-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                <Tv className="h-4 w-4" />
                <span>Catalogue</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                Toutes nos vidéos.
              </h2>
            </div>
            <div className="text-muted-foreground font-medium text-sm">
              {isLoading ? (
                <span className="animate-pulse">Chargement…</span>
              ) : (
                <span>
                  {pagination.totalCount} vidéo{pagination.totalCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleFilterChange(tab.value)}
                disabled={isLoading}
                className={[
                  "relative px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  activeFilter === tab.value
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
              >
                {tab.label}
                {activeFilter === tab.value && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-primary -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        <div className="relative">
          {isLoading && videos.length > 0 && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Full-page loading (first fetch) */}
          {isLoading && videos.length === 0 && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {/* Videos grid */}
          <AnimatePresence mode="wait">
            {videos.length > 0 && (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-x-8 lg:gap-y-16"
              >
                {videos.map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!isLoading && videos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 space-y-4"
            >
              <Tv className="h-16 w-16 text-muted-foreground mx-auto" />
              <h3 className="text-2xl font-black tracking-tight">Aucune vidéo trouvée</h3>
              <p className="text-muted-foreground text-lg">
                {activeFilter !== "all"
                  ? `Aucune vidéo de ce type disponible pour le moment.`
                  : "Aucune vidéo disponible pour le moment."}
              </p>
              {activeFilter !== "all" && (
                <Button
                  variant="outline"
                  className="rounded-full font-bold mt-4"
                  onClick={() => handleFilterChange("all")}
                >
                  Voir toutes les vidéos
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Load More ─────────────────────────────────────────── */}
        {pagination.hasNext && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mt-16 gap-4"
          >
            <p className="text-sm text-muted-foreground font-medium">
              {videos.length} sur {pagination.totalCount} vidéos affichées
            </p>
            {/* Progress bar */}
            <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(videos.length / pagination.totalCount) * 100}%` }}
              />
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              className="mt-2 h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs border-border hover:bg-muted hover:border-primary/50 transition-all gap-2"
            >
              <ChevronDown className="h-5 w-5" />
              Charger plus de vidéos
            </Button>
          </motion.div>
        )}
      </section>

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 mt-32">
        <div className="rounded-[4rem] bg-card p-12 md:p-24 border border-border relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
              Ne manquez rien.
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Abonnez-vous pour recevoir une notification à chaque nouvelle vidéo ou direct exclusif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 bg-muted border border-border rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary outline-none"
              />
              <Button className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 shrink-0">
                S'abonner
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-primary/5 blur-[100px] -z-0" />
        </div>
      </section>
      </div>
    </PageWithSidebar>
  );
}
