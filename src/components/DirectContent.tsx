"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, Volume2, Tv, Share2, Info, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useVideos } from "@/hooks";
import { VideoCard } from "@/components/VideoCard";
import type { VideoSummary, PaginatedResponse } from "@/types";

interface DirectContentProps {
    initialLiveVideo: PaginatedResponse<VideoSummary>;
    initialRecentVideos: PaginatedResponse<VideoSummary>;
}

export function DirectContent({ initialLiveVideo, initialRecentVideos }: DirectContentProps) {
    // Use videos hook for live status (with hydration)
    const { videos: liveVideos, isLoading: liveLoading } = useVideos({
        initialParams: {
            is_live: true,
            page_size: 1,
        },
        initialData: initialLiveVideo,
        refetchOnMount: false,
    });

    // Use videos hook for recent videos (with hydration)
    const { videos: recentVideos, isLoading: recentLoading } = useVideos({
        initialParams: {
            page_size: 6,
            ordering: '-published_at',
            is_live: false,
        },
        initialData: initialRecentVideos,
        refetchOnMount: false,
    });

    const liveVideo = liveVideos?.[0];

    // Build YouTube embed URL with autoplay for live
    const getLiveEmbedUrl = (youtubeId: string) => {
        return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`;
    };

    return (
        <div className="bg-background text-foreground min-h-screen">

            {/* Live Stream Section */}
            <section className="container mx-auto px-4 py-8 lg:py-12">

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            <span className="font-black text-xs uppercase tracking-widest">Direct</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">GAM Live</h1>
                    </div>
                    <p className="text-lg text-muted-foreground font-medium">
                        Suivez notre direct en continu - Actualités, débats et reportages en temps réel
                    </p>
                </div>

                {/* Loading/Live State */}
                {liveLoading && liveVideos.length === 0 ? (
                    <div className="aspect-video bg-muted rounded-3xl animate-pulse flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : liveVideo ? (
                    /* Live Video Player */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Player - Left Column (2/3) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Video Player */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-500/20 bg-black">
                                {/* Live indicator overlay */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                                    <Radio className="h-4 w-4" />
                                    <span className="font-bold text-xs uppercase tracking-wider">En Direct</span>
                                </div>

                                {/* YouTube Embed */}
                                <div className="aspect-video">
                                    <iframe
                                        src={getLiveEmbedUrl(liveVideo.youtube_id || '')}
                                        title={liveVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="space-y-6 bg-card rounded-3xl p-8 border border-border">
                                <div className="flex flex-wrap items-center gap-3">
                                    {liveVideo.category && (
                                        <Badge
                                            className="font-black uppercase tracking-widest text-xs px-4 py-1.5"
                                            style={{
                                                backgroundColor: liveVideo.category.color,
                                                color: '#fff',
                                            }}
                                        >
                                            {liveVideo.category.name}
                                        </Badge>
                                    )}
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        {liveVideo.video_type === 'emission' ? 'Émission' :
                                            liveVideo.video_type === 'reportage' ? 'Reportage' :
                                                liveVideo.video_type === 'interview' ? 'Interview' : 'Direct'}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                                    {liveVideo.title}
                                </h2>

                                {liveVideo.description && (
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {liveVideo.description}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        className="rounded-full font-semibold"
                                    >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Partager
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full font-semibold"
                                        asChild
                                    >
                                        <a
                                            href={`https://www.youtube.com/watch?v=${liveVideo.youtube_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Voir sur YouTube
                                        </a>
                                    </Button>
                                </div>

                                {/* Audio Notice */}
                                <div className="flex items-start gap-3 bg-muted/50 rounded-2xl p-4 border border-border">
                                    <Volume2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Le son est activé par défaut. Vous pouvez le désactiver via les contrôles du lecteur.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Column (1/3) */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Quick Links */}
                            <div className="bg-card rounded-3xl p-6 border border-border space-y-4">
                                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                                    <span className="p-1 bg-primary/10 rounded-lg">
                                        <Info className="h-4 w-4 text-primary" />
                                    </span>
                                    À propos du direct
                                </h3>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <p>
                                        GAM diffuse en continu l'actualité africaine et internationale avec des émissions, débats et reportages exclusifs.
                                    </p>
                                    <Button variant="link" className="p-0 h-auto font-semibold text-primary" asChild>
                                        <Link href="/web-tv">
                                            Voir toutes les vidéos
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Recent Videos Sidebar */}
                            {recentVideos.length > 0 && (
                                <div className="bg-card rounded-3xl p-6 border border-border space-y-6">
                                    <h3 className="text-lg font-black tracking-tight">
                                        Derniers Replays
                                    </h3>
                                    <div className="space-y-4">
                                        {recentVideos.slice(0, 3).map((video) => (
                                            <Link
                                                key={video.id}
                                                href={`/web-tv/${video.slug}`}
                                                className="block group"
                                            >
                                                <div className="space-y-2">
                                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
                                                        <img
                                                            src={video.thumbnail_url}
                                                            alt={video.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <h4 className="font-bold leading-tight text-sm line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                                                        {video.title}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        {video.duration_formatted}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="w-full rounded-full font-semibold" asChild>
                                        <Link href="/web-tv">
                                            Voir tous les replays
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* No Live Video - Offline State */
                    <div className="rounded-3xl bg-gradient-to-br from-muted/50 to-background border border-border p-12 md:p-24 text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted border-2 border-border">
                            <Tv className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                                Pas de direct en cours
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                Notre direct est actuellement hors ligne. Revenez bientôt ou découvrez nos replays.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <Button size="lg" className="rounded-full font-bold" asChild>
                                <Link href="/web-tv">
                                    Voir les replays
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full font-bold" asChild>
                                <Link href="/actualites">
                                    Lire les articles
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </section>

            {/* Recent Videos Grid (when live is active) */}
            {liveVideo && recentVideos.length > 0 && (
                <section className="container mx-auto px-4 py-16 border-t border-border">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-3">
                            À voir en replay
                        </h2>
                        <p className="text-muted-foreground font-medium">
                            Rattrapez les émissions et reportages récents
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline" className="rounded-full font-bold" asChild>
                            <Link href="/web-tv">
                                Voir toutes les vidéos
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="container mx-auto px-4 py-16">
                <div className="rounded-[4rem] bg-gradient-to-br from-red-950/20 to-background border border-border p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-4">
                            <Radio className="h-4 w-4" />
                            <span className="font-bold text-xs uppercase tracking-wider">Alertes Direct</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                            Ne manquez aucun direct
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Recevez une notification quand nous passons en direct ou publions un nouveau contenu exclusif.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 bg-background border border-border rounded-full px-6 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none"
                            />
                            <Button className="rounded-full px-8 py-6 font-bold bg-red-500 hover:bg-red-600 text-white">
                                S'abonner
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
