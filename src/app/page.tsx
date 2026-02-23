import { Suspense } from "react";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getVideoThumbnailUrl } from "@/types";
import { ContinuousInfo } from "@/components/ContinuousInfo";

// Force dynamic rendering to avoid build-time fetch errors
export const dynamic = 'force-dynamic';

// ISR - Régénération toutes les 5 minutes
export const revalidate = 300;

// Metadata SEO
export const metadata: Metadata = {
  title: "GAM - Génies D'Afrique Media | Actualités & Web TV",
  description: "Plateforme média panafricaine - Actualités, reportages, documentaires et émissions exclusives sur les transformations du continent africain.",
};

// Data fetching côté serveur avec Promise.all (parallèle)
async function getHomeData() {
  try {
    const [featuredRes, latestRes, videosRes, continuousArticles, continuousVideos] = await Promise.all([
      api.articles.getAllServer({ is_featured: true, page_size: 1, ordering: '-published_at' }),
      api.articles.getAllServer({ page_size: 4, ordering: '-published_at' }),
      api.videos.getAllServer({ page_size: 2, ordering: '-published_at' }),
      api.articles.getAllServer({ page_size: 15, ordering: '-published_at' }),
      api.videos.getAllServer({ page_size: 4, ordering: '-published_at' }),
    ]);

    return {
      featuredArticle: featuredRes.results[0] || null,
      latestArticles: featuredRes.results[0]
        ? latestRes.results.filter(a => a.id !== featuredRes.results[0].id).slice(0, 4)
        : latestRes.results.slice(0, 4),
      videos: videosRes.results,
      continuousArticles,
      continuousVideos,
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      featuredArticle: null,
      latestArticles: [],
      videos: [],
      continuousArticles: { count: 0, next: null, previous: null, results: [] },
      continuousVideos: { count: 0, next: null, previous: null, results: [] },
    };
  }
}

// Loading skeleton pour ContinuousInfo
function ContinuousInfoSkeleton() {
  return (
    <div className="h-full bg-card rounded-3xl border border-border p-6 animate-pulse">
      <div className="h-6 w-32 bg-muted rounded mb-6" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex gap-4">
            <div className="w-20 h-16 bg-muted rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const {
    featuredArticle,
    latestArticles,
    videos,
    continuousArticles,
    continuousVideos,
  } = await getHomeData();

  return (
    <div className="flex flex-col gap-32 pb-32">
      <section className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Hero + Feed */}
          <div className="lg:col-span-8 space-y-16">
            <Hero article={featuredArticle} />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-border/50">
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span>Le Flux GAM</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                  Pépites de <span className="text-primary italic">demain</span>.
                </h2>
              </div>
              <Button variant="outline" asChild className="rounded-2xl h-12 px-8 font-black border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group text-sm">
                <Link href="/actualites">
                  Tout le flux <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Articles Grid - Server rendered */}
            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {latestArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
              </div>
            )}
          </div>

          {/* Right Column: Continuous Info */}
          <div className="lg:col-span-4 pl-4 relative">
            <div className="sticky top-24 h-[calc(100vh-6rem)] min-h-[600px]">
              <ContinuousInfo
                excludeArticleIds={[
                  ...(featuredArticle ? [featuredArticle.id] : []),
                  ...latestArticles.map(a => a.id)
                ]}
                initialArticles={continuousArticles}
                initialVideos={continuousVideos}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Web TV Section */}
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
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.slice(0, 2).map((video, index) => (
                    <div
                      key={video.id}
                      className={`group relative overflow-hidden rounded-[3rem] bg-card border border-border transition-transform duration-500 hover:-translate-y-2 ${index === 1 ? 'md:translate-y-12' : ''}`}
                    >
                      <Link href={`/web-tv/${video.slug}`} className="block">
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={getVideoThumbnailUrl(video)}
                            alt={video.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                              <Play className="h-8 w-8 fill-foreground group-hover:fill-white text-foreground group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          <div className="absolute bottom-8 left-8 right-8 space-y-3">
                            <h3 className="text-2xl font-black leading-tight tracking-tighter group-hover:text-primary transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Aucune vidéo disponible pour le moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
