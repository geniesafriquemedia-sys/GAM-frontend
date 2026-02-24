"use client";

import Link from "next/link";
import { useRef } from "react";
import type { ArticleSummary, PaginatedResponse } from "@/types";

interface BreakingNewsTickerProps {
  initialArticles?: PaginatedResponse<ArticleSummary>;
}

export function BreakingNewsTicker({ initialArticles }: BreakingNewsTickerProps) {
  const articles = initialArticles?.results?.slice(0, 10) ?? [];

  if (articles.length === 0) return null;

  // Dupliquer les titres pour une boucle infinie fluide
  const items = [...articles, ...articles];

  return (
    <div className="w-full bg-primary text-primary-foreground overflow-hidden py-2 flex items-center">
      {/* Label */}
      <div className="flex-none flex items-center gap-2 px-4 border-r border-primary-foreground/30 mr-4 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
          Dernières infos
        </span>
      </div>

      {/* Ticker scroll container */}
      <div className="overflow-hidden flex-1 relative">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "ticker-scroll 40s linear infinite",
          }}
        >
          {items.map((article, i) => (
            <Link
              key={`${article.id}-${i}`}
              href={`/articles/${article.slug}`}
              className="inline-flex items-center gap-3 text-sm font-medium hover:underline shrink-0 transition-opacity hover:opacity-80"
            >
              {article.category && (
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  {article.category.name}
                </span>
              )}
              <span>{article.title}</span>
              <span className="opacity-40 mx-2">·</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default BreakingNewsTicker;
