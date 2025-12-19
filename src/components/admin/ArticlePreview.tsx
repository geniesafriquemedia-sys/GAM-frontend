"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight,
  Bookmark,
  MessageCircle,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ArticlePreviewProps {
  data: {
    title: string;
    content: string;
    category: string;
    image: string;
    excerpt?: string;
  };
  trigger: React.ReactNode;
}

export function ArticlePreview({ data, trigger }: ArticlePreviewProps) {
  const { title, content, category, image, excerpt } = data;
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  const author = "Auteur Aperçu";
  const readTime = "5 min";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-background rounded-[3rem] shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Prévisualisation de l'article</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-8 right-8 z-[100] h-12 w-12 rounded-full bg-background/20 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:text-white transition-all"
            onClick={(e) => {
              const closeButton = (e.currentTarget.parentElement?.parentElement?.querySelector('button[aria-label="Close"]') as HTMLButtonElement);
              closeButton?.click();
            }}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="flex flex-col gap-12 pb-24 bg-background">
            {/* Hero Section Mockup */}
            <section className="relative w-full pt-12 md:pt-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />
              <div className="container mx-auto px-4 md:px-12">
                <div className="max-w-5xl mx-auto">
                  <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Accueil</span>
                    <ChevronRight className="h-3 w-3" />
                    <span>Actualités</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-primary">{category || "Catégorie"}</span>
                  </nav>
                  
                  <div className="space-y-10 mb-16">
                    <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                      {category || "Catégorie"}
                    </Badge>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85] text-foreground italic">
                      {title || "Titre de l'article"}
                    </h1>
                    {excerpt && (
                      <p className="text-xl md:text-3xl font-medium text-foreground/80 leading-tight max-w-4xl italic">
                        "{excerpt}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-8 py-10 border-y border-primary/10 mb-16">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20 rotate-3">
                         {author.charAt(0)}
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Expert GAM</p>
                         <p className="text-2xl font-black tracking-tight">{author}</p>
                         <p className="text-sm font-medium text-muted-foreground">Rédacteur</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted p-6 rounded-[2rem]">
                      <div className="flex flex-col gap-1">
                         <span className="text-primary/60">Date de publication</span>
                         <span className="text-foreground text-sm">{date}</span>
                      </div>
                      <div className="w-[1px] h-8 bg-primary/10" />
                      <div className="flex flex-col gap-1">
                         <span className="text-primary/60">Temps de lecture</span>
                         <span className="text-foreground text-sm">{readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Image Mockup */}
            {image && (
              <section className="container mx-auto px-4 md:px-12">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[4rem] max-w-7xl mx-auto shadow-2xl ring-1 ring-primary/5">
                  <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                </div>
              </section>
            )}

            {/* Content Mockup */}
            <section className="container mx-auto px-4 md:px-12 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                <div className="hidden lg:block lg:col-span-1">
                   <div className="sticky top-12 flex flex-col gap-6">
                      <div className="h-16 w-16 rounded-3xl border border-primary/10 flex items-center justify-center text-muted-foreground">
                         <Bookmark className="h-6 w-6" />
                      </div>
                      <div className="h-16 w-16 rounded-3xl border border-primary/10 flex items-center justify-center text-muted-foreground">
                         <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="h-12 w-[1px] bg-primary/10 mx-auto my-2" />
                      <div className="h-16 w-16 rounded-3xl border border-primary/10 flex items-center justify-center text-muted-foreground">
                         <Share2 className="h-6 w-6" />
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-11">
                  <div 
                    className="prose prose-zinc prose-2xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[3rem] prose-strong:text-foreground prose-strong:font-black"
                  >
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <p className="italic text-muted-foreground">Le contenu apparaîtra ici...</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
