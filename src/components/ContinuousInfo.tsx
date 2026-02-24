"use client";

import Link from "next/link";
import Image from "next/image";
import { useArticles, useVideos } from "@/hooks";
import { Loader2, Play, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getVideoThumbnailUrl, type ArticleSummary, type VideoSummary, type PaginatedResponse } from "@/types";
import { getMediaUrl } from "@/lib/api";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
};

type ContentItem =
    | { type: 'article'; data: ArticleSummary }
    | { type: 'video'; data: VideoSummary };

interface ContinuousInfoProps {
    excludeArticleIds?: number[];
    initialArticles?: PaginatedResponse<ArticleSummary>;
    initialVideos?: PaginatedResponse<VideoSummary>;
}

export function ContinuousInfo({
    excludeArticleIds = [],
    initialArticles,
    initialVideos
}: ContinuousInfoProps) {
    const { articles, isLoading: articlesLoading } = useArticles({
        initialParams: {
            page_size: 15,
            ordering: '-published_at'
        },
        initialData: initialArticles,
        refetchOnMount: false
    });

    const { videos, isLoading: videosLoading } = useVideos({
        initialParams: {
            page_size: 4,
            ordering: '-published_at'
        },
        initialData: initialVideos,
        refetchOnMount: false
    });

    const isLoading = articlesLoading || videosLoading;

    // Filter out excluced articles
    const filteredArticles = articles.filter(a => !excludeArticleIds.includes(a.id));

    // Mix articles and videos, sorted by published date
    const mixedContent: ContentItem[] = [
        ...filteredArticles.map(article => ({ type: 'article' as const, data: article })),
        ...videos.map(video => ({ type: 'video' as const, data: video }))
    ].sort((a, b) => {
        const dateA = a.data.published_at ? new Date(a.data.published_at).getTime() : 0;
        const dateB = b.data.published_at ? new Date(b.data.published_at).getTime() : 0;
        return dateB - dateA; // Most recent first
    }).slice(0, 10); // Limit to 10 items

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 h-full flex flex-col tracking-tight overflow-hidden shadow-2xl shadow-black/5"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
                <h3 className="font-black uppercase tracking-[0.2em] text-sm text-primary">
                    L'info en continu
                </h3>
            </div>

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <ScrollArea className="flex-1 min-h-0 pr-4 -mr-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="space-y-5 relative border-l border-border/50 ml-2 pl-6 pb-2"
                    >
                        {mixedContent.map((item, index) => {
                            const date = item.data.published_at ? new Date(item.data.published_at) : null;
                            const time = date ? format(date, "HH:mm") : "--:--";

                            if (item.type === 'article') {
                                const article = item.data;
                                return (
                                    <motion.div
                                        key={`article-${article.id}`}
                                        variants={itemVariants}
                                        className="relative group"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground/30 group-hover:bg-primary group-hover:scale-125 transition-all" />

                                        <Link href={`/articles/${article.slug}`} className="block group-hover:translate-x-1 transition-transform">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-primary tabular-nums">
                                                        {time}
                                                    </span>
                                                    {article.category && (
                                                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                                                            {article.category.name}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex gap-3 relative">
                                                    <h4 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3 text-sm flex-1">
                                                        {article.title}
                                                    </h4>

                                                    {/* Article Thumbnail */}
                                                    <div className="relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                                        {article.image_url ? (
                                                            <Image
                                                                src={getMediaUrl(article.image_url)}
                                                                alt={article.title}
                                                                fill
                                                                sizes="96px"
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                                                                <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            } else {
                                const video = item.data;
                                return (
                                    <motion.div
                                        key={`video-${video.id}`}
                                        variants={itemVariants}
                                        className="relative group"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary/50 group-hover:bg-primary group-hover:scale-125 transition-all" />

                                        <Link href={`/web-tv/${video.slug}`} className="block group-hover:translate-x-1 transition-transform">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-primary tabular-nums">
                                                        {time}
                                                    </span>
                                                    <Badge variant="secondary" className="text-[8px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20">
                                                        <Play className="h-2 w-2 mr-0.5 fill-current" />
                                                        WEB TV
                                                    </Badge>
                                                </div>

                                                <div className="flex gap-3 relative">
                                                    {/* Title */}
                                                    <h4 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3 text-sm flex-1">
                                                        {video.title}
                                                    </h4>

                                                    {/* Small Thumbnail */}
                                                    <div className="relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                                        <Image
                                                            src={getVideoThumbnailUrl(video)}
                                                            alt={video.title}
                                                            fill
                                                            sizes="96px"
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            }
                        })}

                        {mixedContent.length === 0 && (
                            <div className="text-sm text-muted-foreground italic">
                                Aucune information récente.
                            </div>
                        )}
                    </motion.div>
                </ScrollArea>
            )}

            <div className="mt-6 pt-4 border-t border-border grid">
                <Link
                    href="/actualites"
                    className="text-center text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                    Voir tout le fil
                </Link>
            </div>
        </motion.div>
    );
}
