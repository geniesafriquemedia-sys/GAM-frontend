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
import { RubriqueSection } from "@/components/RubriqueSection";
import type { Category, ArticleSummary } from "@/types";
import type { CategoryWithArticles } from "@/components/RubriqueSection";
import { getMediaUrl } from "@/lib/api/config";

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
      allCategories,
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
      api.categories.getAllServer(),
      api.articles.getAllServer({ is_trending: true, page_size: 8, ordering: "-published_at" }),
      api.advertising.getActiveAdsServer("HOMEPAGE_TOP"),
      api.advertising.getActiveAdsServer("HOMEPAGE_MID"),
    ]);

    // ── Catégories featured (pour RubriqueSection) ────────────────────────────
    const activeCategories = allCategories.filter((c: Category) => c.is_active);
    const featuredCategories = activeCategories
      .filter((c: Category) => c.is_featured && c.articles_count > 0)
      .slice(0, 6);

    // ── Phase 2 : articles par catégorie featured ─────────────────────────────
    const categoryArticlesResults = await Promise.all(
      featuredCategories.map((cat: Category) =>
        api.articles
          .getAllServer({ category_slug: cat.slug, page_size: 4, ordering: "-published_at" })
          .then((res) => ({ category: cat, articles: res.results }))
          .catch(() => ({ category: cat, articles: [] }))
      )
    );

    const categoriesWithArticles: CategoryWithArticles[] = categoryArticlesResults.filter(
      (c) => c.articles.length > 0
    );

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
      categories: activeCategories,
      categoriesWithArticles,
      trendingArticles: trendingRes.results,
      homepageTopAds,
      homepageMidAds,
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      featuredArticles: [],
      latestArticles: [],
      videos: [],
      continuousArticles: { count: 0, next: null, previous: null, results: [] },
      continuousVideos: { count: 0, next: null, previous: null, results: [] },
      categories: [],
      categoriesWithArticles: [],
      trendingArticles: [],
      homepageTopAds: [],
      homepageMidAds: [],
    };
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getContrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const {
    featuredArticles,
    latestArticles,
    videos,
    continuousArticles,
    continuousVideos,
    categories,
    categoriesWithArticles,
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
            {homepageTopAds.length > 0 && (
              <div className="flex justify-center py-2">
                <Advertisement
                  position="HOMEPAGE_TOP"
                  initialAds={homepageTopAds}
                />
              </div>
            )}

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

            {/* ── Rubriques par catégorie ── */}
            {categoriesWithArticles.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <span>Nos Rubriques</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                      L&apos;Afrique sous{" "}
                      <span className="text-primary italic">tous les angles</span>.
                    </h2>
                  </div>
                </div>
                <RubriqueSection
                  categoriesWithArticles={categoriesWithArticles}
                  midAds={homepageMidAds}
                />
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
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
                  {trendingArticles.map((article) => {
                    const imageUrl = article.image_url ? getMediaUrl(article.image_url) : null;
                    return (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="group flex-none w-64 snap-start rounded-2xl border border-border overflow-hidden bg-card hover:-translate-y-1 transition-transform duration-300"
                      >
                        <div className="relative aspect-[4/3] bg-muted">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={article.title}
                              fill
                              sizes="256px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          {article.category && (
                            <span
                              className="text-[9px] font-black uppercase tracking-[0.2em]"
                              style={{ color: article.category.color || "hsl(var(--primary))" }}
                            >
                              {article.category.name}
                            </span>
                          )}
                          <h3 className="text-sm font-bold leading-snug line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Categories explorer ── */}
            {categories.length > 0 && (
              <div className="space-y-8 pt-8 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <span>Explorer</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                      Toutes les{" "}
                      <span className="text-primary italic">thématiques</span>.
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-2xl h-12 px-8 font-black border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group text-sm shrink-0"
                  >
                    <Link href="/categories">
                      Toutes les catégories{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category: Category) => {
                    const textColor = category.color
                      ? getContrastColor(category.color)
                      : "#ffffff";
                    return (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        style={{
                          backgroundColor: category.color
                            ? `${category.color}18`
                            : "hsl(var(--primary)/0.1)",
                          color: category.color || "hsl(var(--primary))",
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: category.color
                            ? `${category.color}40`
                            : "hsl(var(--primary)/0.2)",
                        }}
                        onMouseEnter={(e) => {
                          if (category.color) {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              category.color;
                            (e.currentTarget as HTMLAnchorElement).style.color = textColor;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (category.color) {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              `${category.color}18`;
                            (e.currentTarget as HTMLAnchorElement).style.color = category.color;
                          }
                        }}
                      >
                        <span className="uppercase tracking-[0.15em] text-[10px]">
                          {category.name}
                        </span>
                        {category.articles_count > 0 && (
                          <span className="text-[9px] font-black opacity-60 tabular-nums">
                            {category.articles_count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
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

      {/* ── Web TV Section ── */}
      <section className="relative bg-primary/5 py-32 text-foreground overflow-hidden mt-32">
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
