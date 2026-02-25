"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/types";
import { getMediaUrl } from "@/lib/api/config";

interface TendancesCarouselProps {
  articles: ArticleSummary[];
}

export function TendancesCarousel({ articles }: TendancesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // passive: false est obligatoire pour pouvoir appeler e.preventDefault()
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
    >
      {articles.map((article) => {
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
  );
}
