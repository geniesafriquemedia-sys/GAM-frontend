import { Metadata } from "next";
import { api } from "@/lib/api";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getVideoThumbnailUrl } from "@/types";
import { ContinuousInfo } from "@/components/ContinuousInfo";
import { Advertisement } from "@/components/Advertisement";
import { BreakingNewsTicker } from "@/components/BreakingNewsTicker";
import { AdvertisingShowcase } from "@/components/AdvertisingShowcase";
import { TendancesCarousel } from "@/components/TendancesCarousel";


export const dynamic = "force-dynamic";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "GAM - Génies D'Afrique Media | Actualités & Web TV",
  description:
    "Plateforme média panafricaine - Actualités, reportages, documentaires et émissions exclusives sur les transformations du continent africain.",
};

async function getHomeData() {
  try {
    // ── Phase 1 : fetches parallèles ──────────────────────────────────────────
    const [
      featuredRes,
      latestRes,
      videosRes,
      continuousArticles,
      continuousVideos,
      trendingRes,
      homepageTopAds,
      homepageMidAds,
    ] = await Promise.all([
      api.articles.getAllServer({
        is_featured: true,
        page_size: 3,
        ordering: "-published_at",
      }),
      api.articles.getAllServer({ page_size: 7, ordering: "-published_at" }),
      api.videos.getAllServer({ page_size: 2, ordering: "-published_at" }),
      api.articles.getAllServer({ page_size: 15, ordering: "-published_at" }),
      api.videos.getAllServer({ page_size: 4, ordering: "-published_at" }),
      api.articles.getAllServer({ is_trending: true, page_size: 8, ordering: "-published_at" }),
      api.advertising.getActiveAdsServer("HOMEPAGE_TOP"),
      api.advertising.getActiveAdsServer("HOMEPAGE_MID"),
    ]);

    // ── Hero + flux articles ──────────────────────────────────────────────────
    let heroArticles = featuredRes.results.slice(0, 3);
    if (heroArticles.length < 3) {
      const heroIds = new Set(heroArticles.map((a) => a.id));
      const extras = latestRes.results
        .filter((a) => !heroIds.has(a.id))
        .slice(0, 3 - heroArticles.length);
      heroArticles = [...heroArticles, ...extras];
    }

    const featuredIds = new Set(heroArticles.map((a) => a.id));
    const latestArticles = latestRes.results
      .filter((a) => !featuredIds.has(a.id))
      .slice(0, 4);

    return {
      featuredArticles: heroArticles,
      latestArticles,
      videos: videosRes.results,
      continuousArticles,
      continuousVideos,
      trendingArticles: trendingRes.results,
      homepageTopAds,
      homepageMidAds,
    };
  } catch (error) {
    // Erreur lors du chargement des données
    return {
      featuredArticles: [],
      latestArticles: [],
      videos: [],
      continuousArticles: { count: 0, next: null, previous: null, results: [] },
      continuousVideos: { count: 0, next: null, previous: null, results: [] },
      trendingArticles: [],
      homepageTopAds: [],
      homepageMidAds: [],
    };
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const {
    featuredArticles,
    latestArticles,
    videos,
    continuousArticles,
    continuousVideos,
    trendingArticles,
    homepageTopAds,
    homepageMidAds,
  } = await getHomeData();

  const excludeIds = [
    ...featuredArticles.map((a) => a.id),
    ...latestArticles.map((a) => a.id),
  ];

  return (
    <div className="flex flex-col pb-32">
      {/* ── Breaking News Ticker ── */}
      <BreakingNewsTicker initialArticles={continuousArticles} />

      {/* ── Main content + sidebar ── */}
      <section className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Hero carousel */}
            <Hero articles={featuredArticles} />

            {/* Pub HOMEPAGE_TOP – Leaderboard */}
            <div className="flex justify-center py-2">
              <Advertisement position="HOMEPAGE_TOP" />
            </div>

            {/* Latest articles header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-border/50">
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span>Le Flux GAM</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                  Pépites de{" "}
                  <span className="text-primary italic">demain</span>.
                </h2>
              </div>
              <Button
                variant="outline"
                asChild
                className="rounded-2xl h-12 px-8 font-black border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group text-sm"
              >
                <Link href="/actualites">
                  Tout le flux{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Articles grid */}
            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 gap-y-12">
                {latestArticles.map((article, index) => (
                  <div key={article.id} className="relative">
                    {article.is_trending && (
                      <div className="absolute -top-3 left-4 z-10">
                        <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] border-none flex items-center gap-1 shadow-lg">
                          <TrendingUp className="h-2.5 w-2.5" />
                          Tendance
                        </Badge>
                      </div>
                    )}
                    <ArticleCard article={article} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucun article disponible.</p>
              </div>
            )}


            {/* ── Tendances ── */}
            {trendingArticles.length > 0 && (
              <div className="pt-8 border-t border-border/50 space-y-8">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Flame className="h-4 w-4" />
                  </div>
                  <span>Tendances</span>
                </div>
                <TendancesCarousel articles={trendingArticles} />
              </div>
            )}

          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-4 pl-4 relative">
            <div className="sticky top-24 h-[calc(100vh-6rem)] min-h-[600px]">
              <ContinuousInfo
                excludeArticleIds={excludeIds}
                initialArticles={continuousArticles}
                initialVideos={continuousVideos}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Advertising Showcase ── */}
      <AdvertisingShowcase
        initialAds={[...homepageTopAds, ...homepageMidAds]}
      />

      {/* ── Web TV Section ── */}
      <section className="relative bg-primary/5 py-32 text-foreground overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Regardez <br /> l&apos;
                <span className="text-primary">Afrique</span>.
              </h2>
              <Button
                asChild
                className="rounded-2xl h-16 px-12 font-black bg-primary text-white"
              >
                <Link href="/web-tv">
                  Explorer la Web TV{" "}
                  <Play className="h-4 w-4 fill-current ml-2" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-7">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.slice(0, 2).map((video, index) => (
                    <div
                      key={video.id}
                      className={`group relative overflow-hidden rounded-[3rem] bg-card border border-border transition-transform duration-500 hover:-translate-y-2 ${
                        index === 1 ? "md:translate-y-12" : ""
                      }`}
                    >
                      <Link href={`/web-tv/${video.slug}`} className="block">
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={getVideoThumbnailUrl(video)}
                            alt={video.title}
                            fill
                            sizes="50vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                              <Play className="h-8 w-8 fill-foreground group-hover:fill-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-2xl font-black leading-tight tracking-tighter group-hover:text-primary transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
