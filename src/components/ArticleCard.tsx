"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight, ImageIcon, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { ArticleSummary } from "@/types";
import { formatReadingTime } from "@/types";
import { getMediaUrl } from "@/lib/api/config";
import { AuthorAvatar } from "@/components/AuthorAvatar";

interface ArticleCardProps {
  article: ArticleSummary;
  index?: number;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Placeholder component quand pas d'image disponible
function ImagePlaceholder({ categoryColor }: { categoryColor?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: categoryColor
          ? `linear-gradient(135deg, ${categoryColor}15 0%, ${categoryColor}30 100%)`
          : 'linear-gradient(135deg, hsl(var(--primary)/0.1) 0%, hsl(var(--primary)/0.2) 100%)'
      }}
    >
      <ImageIcon
        className="h-16 w-16 mb-3 opacity-30"
        style={{ color: categoryColor || 'hsl(var(--primary))' }}
      />
      <span className="text-xs font-medium opacity-50 uppercase tracking-wider">
        Image à venir
      </span>
    </div>
  );
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const {
    slug,
    title,
    excerpt,
    category,
    reading_time,
    published_at,
    is_trending,
    author,
  } = article;

  const rawImageUrl = article.image_url || null;
  const imageUrl = rawImageUrl ? getMediaUrl(rawImageUrl) : null;
  const hasImage = !!imageUrl;
  const formattedDate = formatDate(published_at);
  const readTimeText = formatReadingTime(reading_time);

  // Reading progress indicator: a thin colored bar at the bottom of the image
  // (static decorative element indicating article "weight" via reading_time)
  const progressWidth = Math.min(100, Math.max(20, (reading_time / 15) * 100));
  const barColor = category?.color || 'hsl(var(--primary))';

  return (
    <motion.article
      className="group flex flex-col space-y-5"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image wrapper */}
      <Link
        href={`/articles/${slug}`}
        className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5"
      >
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <ImagePlaceholder categoryColor={category?.color} />
        )}

        {/* Hover dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Reading progress bar — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Category badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <Badge
              className="backdrop-blur-md border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
              style={{
                backgroundColor: category.color ? `${category.color}20` : 'rgba(255,255,255,0.9)',
                color: category.color || 'var(--primary)'
              }}
            >
              {category.name}
            </Badge>
          </div>
        )}

        {/* Trending badge */}
        {is_trending && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
            >
              <Badge className="backdrop-blur-md border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg bg-orange-500/90 text-white flex items-center gap-1">
                <Flame className="h-3 w-3" />
                Tendance
              </Badge>
            </motion.div>
          </div>
        )}

        {/* Arrow CTA on hover */}
        <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-primary text-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </Link>

      {/* Text content */}
      <div className="flex flex-col space-y-3 px-2">
        {/* Meta row */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
            {formattedDate}
          </span>
          <div className="h-px flex-1 bg-primary/10" />
          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {readTimeText}
          </div>
        </div>

        {/* Title */}
        <Link href={`/articles/${slug}`} className="block">
          <h3 className="text-2xl font-black leading-[1.1] tracking-tighter transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground/80 line-clamp-2 font-medium leading-relaxed">
          {excerpt}
        </p>

        {/* Author row */}
        {author?.name && (
          <div className="flex items-center gap-2 pt-1">
            <AuthorAvatar photo={author.photo} name={author.name} size="xs" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">
              {author.name}
            </span>
          </div>
        )}

        {/* Read link */}
        <div className="pt-2">
          <Link
            href={`/articles/${slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary group/link"
          >
            Lire l'article
            <div className="w-8 h-px bg-primary transition-all duration-300 group-hover/link:w-12" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
