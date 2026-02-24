"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArticleSummary } from "@/types";
import { formatReadingTime } from "@/types";
import { getMediaUrl } from "@/lib/api/config";
import { AuthorAvatar } from "@/components/AuthorAvatar";

interface HeroProps {
  articles: ArticleSummary[];
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const SLIDE_DURATION = 5000; // ms

export function Hero({ articles }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = articles.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, count, next]);

  // Empty / loading state
  if (!articles || count === 0) {
    return (
      <div className="relative min-h-[400px] md:min-h-[480px] lg:min-h-[520px] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-muted animate-pulse" />
    );
  }

  const article = articles[current];
  const imageUrl = article.image_url ? getMediaUrl(article.image_url) : null;

  return (
    <div
      className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-foreground text-background shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background image with cross-fade ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${article.id}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover opacity-60"
              priority
              sizes="(max-width: 1024px) 100vw, 67vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  article.category?.color
                    ? `linear-gradient(135deg, ${article.category.color}30 0%, ${article.category.color}60 100%)`
                    : "linear-gradient(135deg, hsl(var(--primary)/0.3) 0%, hsl(var(--primary)/0.5) 100%)",
              }}
            >
              <ImageIcon className="h-24 w-24 opacity-20 text-white" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${article.id}`}
          className="relative z-10 flex flex-col justify-end h-full min-h-[350px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] w-full p-4 sm:p-5 md:p-10 lg:p-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl space-y-3 md:space-y-5">
            {/* Badges row */}
            <div className="flex items-center flex-wrap gap-2">
              {article.category && (
                <Badge
                  className="rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] border-none"
                  style={{
                    backgroundColor: article.category.color
                      ? `${article.category.color}25`
                      : "hsl(var(--primary)/0.2)",
                    color: article.category.color || "hsl(var(--primary))",
                  }}
                >
                  {article.category.name}
                </Badge>
              )}
              {article.is_trending && (
                <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] border-none flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Tendance
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl max-w-2xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-[11px] sm:text-xs text-background/70 md:text-sm line-clamp-2 max-w-lg font-medium leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-background/50">
              {article.published_at && (
                <span>{formatDate(article.published_at)}</span>
              )}
              {article.reading_time > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {formatReadingTime(article.reading_time)}
                </span>
              )}
            </div>

            {/* Author + CTA row */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Author */}
              {article.author && (
                <div className="flex items-center gap-2">
                  <AuthorAvatar
                    photo={article.author.photo}
                    name={article.author.name}
                    size="sm"
                    className="border border-white/20 bg-white/10"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-background/60">
                    {article.author.name}
                  </span>
                </div>
              )}

              <Button
                asChild
                size="lg"
                className="rounded-lg px-5 h-10 text-xs font-black bg-primary hover:bg-primary/90 transition-colors"
              >
                <Link href={`/articles/${article.slug}`}>
                  Lire l&apos;histoire <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Progress indicators (bottom-right) ── */}
      {count > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 md:bottom-12 md:right-12 z-20 flex flex-col gap-2 sm:gap-4 items-end">
          {/* Dot/bar selectors */}
          <div className="flex gap-2 items-center">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPaused(true);
                  goTo(i);
                  // resume after interaction
                  setTimeout(() => setPaused(false), 2000);
                }}
                aria-label={`Aller à l'article ${i + 1}`}
                className="focus:outline-none group"
              >
                <motion.div
                  animate={{
                    width: i === current ? 40 : 10,
                    opacity: i === current ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1.5 rounded-full bg-white"
                  style={{ width: i === current ? 40 : 10 }}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-background/40 tabular-nums">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")} STORIES
          </div>

          {/* Pause indicator */}
          {paused && (
            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-background/30">
              En pause
            </div>
          )}
        </div>
      )}

      {/* ── Auto-progress bar (bottom edge) ── */}
      {count > 1 && !paused && (
        <motion.div
          key={`progress-${article.id}`}
          className="absolute bottom-0 left-0 h-[3px] bg-primary z-20 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}
