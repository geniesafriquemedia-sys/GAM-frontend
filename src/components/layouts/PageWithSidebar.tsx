"use client";

import { ReactNode } from "react";
import { Advertisement } from "@/components/Advertisement";

interface PageWithSidebarProps {
  children: ReactNode;
  showTopAd?: boolean;
}

export function PageWithSidebar({ children, showTopAd = true }: PageWithSidebarProps) {
  return (
    <div className="min-h-screen">
      {/* Top Ad Banner */}
      {showTopAd && (
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <Advertisement type="banner" className="mx-auto" />
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
                  🔥 Tendances
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex gap-4 group cursor-pointer">
                      <span className="text-4xl font-black text-muted-foreground/20 group-hover:text-primary transition-colors">
                        {num}
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          Article tendance #{num}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          12.5k vues
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="rounded-2xl border bg-primary text-primary-foreground p-6 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest">
                  📧 Newsletter
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
              <Advertisement type="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
