"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMediaUrl } from "@/lib/api/config";
import type { Category, ArticleSummary } from "@/types";

// ── Icon lookup ───────────────────────────────────────────────────────────────

import {
  Globe, Briefcase, Cpu, BookOpen, Film, Music,
  Camera, Heart, Star, Zap, Users, TrendingUp, Palette, Flame,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe, briefcase: Briefcase, cpu: Cpu, book: BookOpen,
  film: Film, music: Music, camera: Camera, heart: Heart,
  star: Star, zap: Zap, users: Users, trending: TrendingUp,
  culture: Palette, societe: Users, economie: Globe, sport: Flame,
  tech: Cpu,
};

// ── Helper ────────────────────────────────────────────────────────────────────

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short",
  });
}

// ── Main Card (large, left) ───────────────────────────────────────────────────

function MainArticleCard({ article, accentColor }: { article: ArticleSummary; accentColor: string }) {
  const imageUrl = article.image_url ? getMediaUrl(article.image_url) : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-card border border-border aspect-[3/2] lg:aspect-auto lg:row-span-2"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}40 100%)`,
          }}
        >
          <ImageIcon className="absolute inset-0 m-auto h-16 w-16 opacity-20" style={{ color: accentColor }} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {article.category && (
          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded mb-3"
            style={{ backgroundColor: `${accentColor}30`, color: accentColor }}
          >
            {article.category.name}
          </span>
        )}
        <h3 className="text-xl font-black tracking-tight leading-tight line-clamp-3 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span>{formatDate(article.published_at)}</span>
          {article.reading_time > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.reading_time} min
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Secondary Card (small, right) ────────────────────────────────────────────

function SecondaryArticleCard({ article, accentColor }: { article: ArticleSummary; accentColor: string }) {
  const imageUrl = article.image_url ? getMediaUrl(article.image_url) : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex gap-4 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors"
    >
      <div className="relative flex-none w-20 h-16 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${accentColor}20` }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <span className="text-[11px] text-muted-foreground mt-1 block">
          {formatDate(article.published_at)}
        </span>
      </div>
    </Link>
  );
}

// ── CategorySection ───────────────────────────────────────────────────────────

interface CategorySectionProps {
  category: Category;
  articles: ArticleSummary[];
}

export function CategorySection({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  const Icon = ICON_MAP[category.icon] ?? Globe;
  const accentColor = category.color || "hsl(var(--primary))";
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon className="h-4 w-4" style={{ color: accentColor }} />
          </div>
          <h2 className="text-lg font-black uppercase tracking-[0.15em] text-sm">
            {category.name}
          </h2>
          <div
            className="h-px flex-1 min-w-[2rem]"
            style={{ backgroundColor: `${accentColor}30` }}
          />
        </div>
        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all"
          style={{ color: accentColor }}
        >
          Tout voir <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main article */}
        <div>
          <MainArticleCard article={mainArticle} accentColor={accentColor} />
        </div>

        {/* Secondary articles */}
        {secondaryArticles.length > 0 && (
          <div className="flex flex-col justify-between gap-2">
            {secondaryArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <SecondaryArticleCard article={article} accentColor={accentColor} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default CategorySection;
