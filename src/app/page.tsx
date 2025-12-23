"use client";

import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useArticles, useVideos } from "@/hooks";
import { getVideoThumbnailUrl } from "@/types";
import { ContinuousInfo } from "@/components/ContinuousInfo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function Home() {
  // Fetch featured article for Hero
  const { articles: featuredArticles, isLoading: featuredLoading } = useArticles({
    initialParams: {
      is_featured: true,
      page_size: 1,
      ordering: '-published_at'
    }
  });

  // Fetch latest articles
  const { articles: latestArticles, isLoading: latestLoading } = useArticles({
    initialParams: {
      page_size: 4,
      ordering: '-published_at'
    }
  });

  // Fetch featured videos
  const { videos, isLoading: videosLoading } = useVideos({
    initialParams: {
      page_size: 2,
      ordering: '-published_at'
    }
  });

  const featuredArticle = featuredArticles?.[0] || null;

  return (
    <div className="flex flex-col gap-32 pb-32">
      <section className="container mx-auto px-4 mt-6">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hero + Feed */}
          <div className="lg:col-span-8 space-y-16">
            <Hero article={featuredArticle} />

            {/* Header Section of Feed */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-border/50"
            >
              <motion.div variants={itemVariants} className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span>Le Flux GAM</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                  Pépites de <span className="text-primary italic">demain</span>.
                </h2>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button variant="outline" asChild className="rounded-2xl h-12 px-8 font-black border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group text-sm">
                  <Link href="/actualites">
                    Tout le flux <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Loading State */}
            {latestLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* Articles Grid */}
            {!latestLoading && latestArticles.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
              >
                {latestArticles.map((article, index) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <ArticleCard article={article} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!latestLoading && latestArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
              </div>
            )}
          </div>

          {/* Right Column: Continuous Info */}
          <div className="lg:col-span-4 pl-4 relative">
            <div className="sticky top-24 h-[calc(100vh-6rem)] min-h-[600px]">
              <ContinuousInfo excludeArticleId={featuredArticle?.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-primary/5 py-32 text-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                  <span>GAM WEB TV</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                  Regardez <br /> l'<span className="text-primary">Afrique</span>.
                </h2>
                <p className="text-lg text-foreground/60 font-medium max-w-md leading-relaxed">
                  Découvrez nos reportages, documentaires et émissions exclusives sur les transformations du continent africain.
                </p>
              </div>
              <Button asChild className="rounded-2xl h-16 px-12 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="/web-tv" className="flex items-center gap-3">
                  Explorer la Web TV <Play className="h-4 w-4 fill-current" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-7">
              {videosLoading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {!videosLoading && videos.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {videos.slice(0, 2).map((video, index) => (
                    <motion.div
                      key={video.id}
                      variants={itemVariants}
                      className={`group relative overflow-hidden rounded-[3rem] bg-card border border-border ${index === 1 ? 'md:translate-y-12' : ''}`}
                    >
                      <Link href={`/web-tv/${video.slug}`} className="block">
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={getVideoThumbnailUrl(video)}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                              <Play className="h-8 w-8 fill-foreground group-hover:fill-white text-foreground group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          <div className="absolute bottom-8 left-8 right-8 space-y-3">
                            <Badge className="bg-primary/20 backdrop-blur-md text-primary border-primary/30 text-[9px] font-black uppercase tracking-widest">
                              {video.duration_formatted}
                            </Badge>
                            <h3 className="text-2xl font-black leading-tight tracking-tighter group-hover:text-primary transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {!videosLoading && videos.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Aucune vidéo disponible pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
