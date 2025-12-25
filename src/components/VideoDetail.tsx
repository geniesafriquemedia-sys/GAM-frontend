"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoCard } from "@/components/VideoCard";
import { SocialShare } from "@/components/SocialShare";
import { useVideo } from "@/hooks";
import type { VideoWithRelated, VideoSummary } from "@/types";
import { getVideoThumbnailUrl, getVideoTypeLabel, getVideoEmbedUrl } from "@/types";

interface VideoDetailProps {
    initialVideo: VideoWithRelated;
    slug: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gam.africa';

function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function VideoDetail({ initialVideo, slug }: VideoDetailProps) {
    const { data: video } = useVideo({
        slug,
        initialData: initialVideo,
        refetchOnMount: false
    });

    if (!video) return null;

    const {
        title,
        description,
        video_type,
        category,
        embed_url,
        youtube_id,
        is_live,
        published_at,
        related_videos
    } = video;

    const embedUrl = embed_url || getVideoEmbedUrl(video);
    const formattedDate = formatDate(published_at);
    const typeLabel = getVideoTypeLabel(video_type);

    return (
        <div className="flex flex-col gap-12 pb-24 bg-background text-foreground">
            <section className="bg-background pt-12 pb-24">
                <div className="container mx-auto px-4">
                    <Button variant="ghost" size="sm" asChild className="mb-12 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full font-black uppercase tracking-widest text-[10px] border border-transparent hover:border-border">
                        <Link href="/web-tv">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la Web TV
                        </Link>
                    </Button>

                    <div className="max-w-6xl mx-auto space-y-12">
                        <div className="relative aspect-video w-full overflow-hidden rounded-[3rem] bg-muted shadow-2xl border border-border ring-1 ring-border ring-offset-4 ring-offset-background">
                            <iframe
                                src={embedUrl}
                                title={title}
                                className="absolute inset-0 h-full w-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Badge
                                            className="font-black uppercase tracking-widest border-none px-4 py-1 shadow-lg"
                                            style={{
                                                backgroundColor: category?.color || 'var(--primary)',
                                                color: '#fff',
                                                boxShadow: category?.color ? `0 10px 25px ${category.color}40` : undefined
                                            }}
                                        >
                                            {category?.name || typeLabel}
                                        </Badge>
                                        {is_live && (
                                            <div className="flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground bg-card px-4 py-1.5 rounded-full border border-border">
                                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2" /> EN DIRECT
                                            </div>
                                        )}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-foreground">
                                        {title}
                                    </h1>

                                    <div className="flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
                                        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-muted-foreground/60">Type</span>
                                                <span className="text-foreground text-xs">{typeLabel}</span>
                                            </div>
                                            <div className="h-8 w-[1px] bg-border" />
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-muted-foreground/60">Diffusé le</span>
                                                <span className="text-foreground text-xs">{formattedDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <SocialShare url={`${SITE_URL}/web-tv/${video.slug}`} title={title} />
                                            <Button asChild className="rounded-full h-10 px-6 font-black uppercase tracking-widest text-xs bg-primary text-white shadow-lg shadow-primary/20">
                                                <a href={`https://www.youtube.com/watch?v=${youtube_id}`} target="_blank" rel="noopener noreferrer">
                                                    Voir sur YouTube
                                                </a>
                                            </Button>
                                        </div>
                                    </div>

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
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-12">
                                {related_videos && related_videos.length > 0 && (
                                    <div className="bg-card rounded-[2.5rem] p-8 border border-border">
                                        <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3 text-foreground">
                                            <PlayCircle className="h-6 w-6 text-primary" />
                                            Vidéos similaires
                                        </h3>
                                        <div className="space-y-8">
                                            {related_videos.slice(0, 3).map((v: VideoSummary) => (
                                                <Link key={v.id} href={`/web-tv/${v.slug}`} className="block group">
                                                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border border-border">
                                                        <Image
                                                            src={getVideoThumbnailUrl(v)}
                                                            alt={v.title}
                                                            fill
                                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                                        />
                                                    </div>
                                                    <h4 className="font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">{v.title}</h4>
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

            {/* More Videos */}
            {related_videos && related_videos.length > 0 && (
                <section className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tighter text-foreground">Continuer de regarder.</h2>
                        </div>
                        <Button variant="outline" asChild className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-border hover:bg-muted">
                            <Link href="/web-tv">
                                Voir tout le catalogue
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {related_videos.slice(0, 6).map((v: VideoSummary) => (
                            <VideoCard key={v.id} video={v} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
