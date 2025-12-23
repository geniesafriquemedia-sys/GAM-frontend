"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, type Variants } from "framer-motion";
import type { ArticleSummary } from "@/types";
import { formatReadingTime, getArticleImageUrl } from "@/types";

interface ArticleCardProps {
  article: ArticleSummary;
  index?: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const {
    slug,
    title,
    excerpt,
    category,
    featured_image,
    reading_time,
    published_at
  } = article;

  const imageUrl = getArticleImageUrl(article);
  const formattedDate = formatDate(published_at);
  const readTimeText = formatReadingTime(reading_time);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col space-y-5"
    >
      <Link href={`/articles/${slug}`} className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

        <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
          <div className="bg-primary text-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </Link>

      <div className="flex flex-col space-y-3 px-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{formattedDate}</span>
          <div className="h-px flex-1 bg-primary/10" />
          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {readTimeText}
          </div>
        </div>

        <Link href={`/articles/${slug}`} className="block">
          <h3 className="text-2xl font-black leading-[1.1] tracking-tighter transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground/80 line-clamp-2 font-medium leading-relaxed">
          {excerpt}
        </p>

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
