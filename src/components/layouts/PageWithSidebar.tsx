"use client";

import { ReactNode } from "react";
import { useArticles } from "@/hooks";
import Link from "next/link";
import { Eye } from "lucide-react";

interface PageWithSidebarProps {
  children: ReactNode;
  showTopAd?: boolean;
}

export function PageWithSidebar({ children, showTopAd = true }: PageWithSidebarProps) {
  // Fetch top 5 trending articles
  const { data: trendingData } = useArticles({ ordering: '-views_count', page_size: 5 });
  const trendingArticles = trendingData?.results || [];

  return (
    <div className="min-h-screen">
      {/* Top Ad Banner */}
      {showTopAd && (
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-[728px] h-[90px] bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Publicité Banner</p>
                <p className="text-[10px] text-muted-foreground/60">728 x 90</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content - 8 colonnes */}
          <main className="lg:col-span-8">
            {children}
          </main>

          {/* Sidebar - 4 colonnes */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Trending Widget */}
              <div className="rounded-2xl border bg-card p-6 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                  Tendances
                </h3>
                <div className="space-y-4">
                  {trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <Link key={article.id} href={`/articles/${article.slug}`} className="flex gap-4 group cursor-pointer">
                        <span className="text-4xl font-black text-muted-foreground/20 group-hover:text-primary transition-colors">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views_count?.toLocaleString() || 0} vues</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Chargement...</div>
                  )}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="rounded-2xl border bg-primary text-primary-foreground p-6 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest">
                  Newsletter
                </h3>
                <p className="text-sm opacity-90">
                  Recevez nos meilleures analyses chaque semaine
                </p>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-lg text-foreground"
                />
                <button className="w-full bg-white text-primary py-3 rounded-lg font-black hover:bg-white/90 transition-colors">
                  S'ABONNER
                </button>
              </div>

              {/* Sidebar Ad */}
              <div className="w-[300px] h-[250px] bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Publicité Sidebar</p>
                  <p className="text-[10px] text-muted-foreground/60">300 x 250</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
