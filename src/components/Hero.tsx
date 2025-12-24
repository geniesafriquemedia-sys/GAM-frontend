"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ShareMenu } from "@/components/ShareMenu";
import type { ArticleSummary } from "@/types";
import { getMediaUrl } from "@/lib/api/config";

interface HeroProps {
  article: ArticleSummary | null;
}

export function Hero({ article }: HeroProps) {
  if (!article) {
    return (
      <section className="relative w-full overflow-hidden bg-background pt-6">
        <div className="container mx-auto px-4">
          <div className="relative min-h-[650px] md:min-h-[800px] w-full overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-muted animate-pulse" />
        </div>
      </section>
    );
  }

  // Priorité: image_url (backend calcule: uploaded > external)
  // getMediaUrl ajoute le préfixe http://localhost:8000 pour les chemins relatifs (/media/...)
  const rawImageUrl = article.image_url || null;
  const imageUrl = rawImageUrl ? getMediaUrl(rawImageUrl) : null;
  const hasImage = !!imageUrl;

  return (
    <section className="relative w-full overflow-hidden bg-background pt-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-end min-h-[400px] md:min-h-[480px] lg:min-h-[520px] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-foreground text-background shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 z-0">
            {hasImage ? (
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover opacity-60 transition-transform duration-[2s]"
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background: article.category?.color
                    ? `linear-gradient(135deg, ${article.category.color}30 0%, ${article.category.color}60 100%)`
                    : 'linear-gradient(135deg, hsl(var(--primary)/0.3) 0%, hsl(var(--primary)/0.5) 100%)'
                }}
              >
                <ImageIcon className="h-24 w-24 opacity-20 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full p-5 md:p-10 lg:p-12 mt-auto">
            <div className="max-w-3xl space-y-3 md:space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] border-none">
                  Éditorial
                </Badge>
                {article.category && (
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Sparkles className="h-3 w-3 fill-secondary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em]">{article.category.name}</span>
                  </div>
                )}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl font-black leading-[1.1] tracking-tighter md:text-4xl lg:text-5xl max-w-2xl"
              >
                {article.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-background/70 md:text-sm lg:text-base line-clamp-2 max-w-lg font-medium leading-relaxed"
              >
                {article.excerpt}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <Button asChild size="lg" className="rounded-lg px-5 h-10 text-xs font-black bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 group">
                  <Link href={`/articles/${article.slug}`} className="flex items-center gap-2">
                    Lire l'histoire
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <ShareMenu
                  title={article.title}
                  url={`${typeof window !== 'undefined' ? window.location.origin : ''}/articles/${article.slug}`}
                />
              </motion.div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-6 items-end">
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === 1 ? 'w-16 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]' : 'w-3 bg-white/20'}`} />
              ))}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-background/40">
              01 / 03 STORIES
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
