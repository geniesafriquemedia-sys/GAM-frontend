"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
  };
}

export function Hero({ article }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-6">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[650px] md:min-h-[800px] w-full overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-foreground text-background shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/20 to-transparent md:block hidden" />
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 lg:p-24">
            <div className="max-w-4xl space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-none">
                  Éditorial
                </Badge>
                <div className="flex items-center gap-2 text-secondary">
                  <Sparkles className="h-4 w-4 fill-secondary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{article.category}</span>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl lg:text-[9rem] max-w-5xl"
              >
                {article.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-background/60 md:text-xl lg:text-2xl line-clamp-2 max-w-2xl font-medium leading-relaxed"
              >
                {article.excerpt}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-6"
              >
                <Button asChild size="lg" className="rounded-2xl px-12 h-18 text-lg font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 group">
                  <Link href={`/articles/${article.id}`} className="flex items-center gap-3">
                    Lire l'histoire
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Button>
                
                <button className="flex items-center gap-3 group text-background/60 hover:text-white transition-colors">
                  <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all group-hover:bg-white/10 group-hover:border-white/20">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Partager</span>
                </button>
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
        </div>
      </div>
    </section>
  );
}

