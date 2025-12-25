"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Tv, Loader2, Filter, Radio } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { VideoCard } from "@/components/VideoCard";
import { useVideos } from "@/hooks";
import type { VideoType, VideoSummary, PaginatedResponse } from "@/types";

type VideoTypeFilter = 'all' | VideoType;

const VIDEO_TYPE_LABELS: Record<VideoTypeFilter, string> = {
    all: 'Tout',
    emission: 'Émissions',
    reportage: 'Reportages',
    interview: 'Interviews',
    documentary: 'Documentaires',
    short: 'Courts métrages',
};

interface WebTvListProps {
    initialVideos: PaginatedResponse<VideoSummary>;
    featuredVideo: VideoSummary | null;
}

export function WebTvList({ initialVideos, featuredVideo }: WebTvListProps) {
    // Track active filter for UI
    const [activeFilter, setActiveFilter] = useState<VideoTypeFilter>('all');

    // Fetch videos with filters
    const {
        videos,
        pagination,
        isLoading,
        setVideoType,
    } = useVideos({
        initialParams: {
            page_size: 12,
            ordering: '-published_at',
            is_live: false,
        },
        initialData: initialVideos,
        refetchOnMount: false, // Don't double-fetch on mount
    });

    // Handler for filter change
    const handleFilterChange = (type: VideoTypeFilter) => {
        setActiveFilter(type);
        if (type === 'all') {
            setVideoType(undefined);
        } else {
            setVideoType(type);
        }
    };

    return (
        <div className="bg-background text-foreground min-h-screen pb-24">

            {/* Hero Section with Featured Video */}
            {featuredVideo ? (
                <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
                    {/* Background blur effects */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 blur-[100px]" />

                    <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left: Info */}
                            <div className="space-y-8 order-2 lg:order-1">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                                        <Tv className="h-4 w-4" />
                                        <span>Web TV</span>
                                    </div>
                                    <Badge
                                        className="font-black uppercase tracking-widest text-xs"
                                        style={{
                                            backgroundColor: featuredVideo.category?.color,
                                            color: '#fff',
                                        }}
                                    >
                                        {featuredVideo.category?.name || 'Vidéo'}
                                    </Badge>
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
                                    {featuredVideo.title}
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                                    {featuredVideo.description?.substring(0, 200)}
                                    {featuredVideo.description && featuredVideo.description.length > 200 ? '...' : ''}
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30"
                                        asChild
                                    >
                                        <Link href={`/web-tv/${featuredVideo.slug}`}>
                                            <Play className="mr-2 h-5 w-5 fill-white" /> Regarder
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Right: Thumbnail */}
                            <div className="order-1 lg:order-2">
                                <Link href={`/web-tv/${featuredVideo.slug}`} className="block group">
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
                                        <div className="aspect-video relative">
                                            <img
                                                src={featuredVideo.thumbnail_url}
                                                alt={featuredVideo.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Play overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 group-hover:scale-110 transition-transform">
                                                    <Play className="h-10 w-10 fill-white text-white translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Direct CTA Banner */}
            <section className="container mx-auto px-4 py-8">
                <Link
                    href="/direct"
                    className="block rounded-3xl bg-gradient-to-r from-red-500 to-red-600 p-8 md:p-12 text-white hover:shadow-2xl hover:shadow-red-500/20 transition-all group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                <Radio className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
                                    GAM en Direct
                                </h3>
                                <p className="text-white/90 font-medium">
                                    Suivez notre direct en continu - Actualités et débats en temps réel
                                </p>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            className="bg-white text-red-600 hover:bg-white/90 font-black rounded-full px-8 shadow-lg group-hover:scale-105 transition-transform"
                        >
                            Voir le direct
                            <Play className="ml-2 h-5 w-5 fill-current" />
                        </Button>
                    </div>
                </Link>
            </section>

            {/* Filters & Video Grid */}
            <section className="container mx-auto px-4 mt-16">

                {/* Header with Filters */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                                <Tv className="h-4 w-4" />
                                <span>Catalogue</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                                Toutes nos vidéos.
                            </h2>
                        </div>
                        <div className="text-muted-foreground font-medium">
                            {isLoading ? (
                                <span className="animate-pulse">Chargement...</span>
                            ) : (
                                <span>{pagination.totalCount} vidéo{pagination.totalCount > 1 ? 's' : ''}</span>
                            )}
                        </div>
                    </div>

                    {/* Type Filters */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
                            <Filter className="h-4 w-4" />
                            <span>Filtrer :</span>
                        </div>
                        {(Object.keys(VIDEO_TYPE_LABELS) as VideoTypeFilter[]).map((type) => (
                            <Button
                                key={type}
                                variant={activeFilter === type ? "default" : "outline"}
                                size="sm"
                                className="rounded-full font-bold text-xs uppercase tracking-wider"
                                onClick={() => handleFilterChange(type)}
                                disabled={isLoading}
                            >
                                {VIDEO_TYPE_LABELS[type]}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Loading Overlay for List */}
                <div className="relative">
                    {isLoading && videos.length > 0 && (
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl" />
                    )}

                    {/* Videos Grid */}
                    {videos.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {videos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && videos.length === 0 && (
                        <div className="text-center py-20 space-y-4">
                            <Tv className="h-16 w-16 text-muted-foreground mx-auto" />
                            <h3 className="text-2xl font-black tracking-tight">Aucune vidéo trouvée</h3>
                            <p className="text-muted-foreground text-lg">
                                {activeFilter !== 'all'
                                    ? `Aucune vidéo de type "${VIDEO_TYPE_LABELS[activeFilter]}" disponible.`
                                    : 'Aucune vidéo disponible pour le moment.'}
                            </p>
                            {activeFilter !== 'all' && (
                                <Button
                                    variant="outline"
                                    className="rounded-full font-bold mt-4"
                                    onClick={() => handleFilterChange('all')}
                                >
                                    Voir toutes les vidéos
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
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
                            <Button className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                                S'abonner
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/5 blur-[100px] -z-10" />
                </div>
            </section>
        </div>
    );
}
