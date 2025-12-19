"use client";

import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Mock Data
const featuredArticle = {
  id: "1",
  title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
  excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent. Entre innovation numérique et durabilité, retour sur une transformation exemplaire.",
  category: "Technologie",
  image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000&auto=format&fit=crop",
};

const latestArticles = [
  {
    id: "2",
    title: "Éducation : Le boom des plateformes d'e-learning locales",
    excerpt: "De plus en plus d'entrepreneurs africains lancent des solutions d'apprentissage en ligne adaptées aux réalités du continent.",
    category: "Éducation",
    date: "12 Oct 2023",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min",
  },
  {
    id: "3",
    title: "Culture : Le retour en force de l'artisanat traditionnel",
    excerpt: "Comment les jeunes designers réinventent les codes de l'artisanat ancestral pour le marché mondial.",
    category: "Culture",
    date: "11 Oct 2023",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 min",
  },
  {
    id: "4",
    title: "Société : Les enjeux de la transition énergétique",
    excerpt: "Analyse des défis et opportunités du passage au vert pour les économies d'Afrique subsaharienne.",
    category: "Société",
    date: "10 Oct 2023",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    readTime: "6 min",
  },
  {
    id: "5",
    title: "Tech : Startups à suivre en 2024",
    excerpt: "Notre sélection des pépites technologiques qui vont faire bouger les lignes l'année prochaine.",
    category: "Tech",
    date: "09 Oct 2023",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    readTime: "7 min",
  },
];

const videos = [
  { id: "v1", title: "Entretien exclusif avec les innovateurs de Lagos", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop", duration: "12:45" },
  { id: "v2", title: "Documentaire : L'art du pagne revisité", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop", duration: "08:20" },
  { id: "v3", title: "Reportage : Les fermes solaires du Kenya", thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop", duration: "15:10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      <Hero article={featuredArticle} />

      <section className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span>Le Flux GAM</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Pépites de <span className="text-primary italic">demain</span>.
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button variant="outline" asChild className="rounded-2xl h-14 px-10 font-black border-primary/20 hover:bg-primary/5 hover:border-primary transition-all group">
              <Link href="/actualites">
                Tout le flux <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20"
        >
          {latestArticles.map((article, index) => (
            <motion.div key={article.id} variants={itemVariants}>
              <ArticleCard {...article} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative bg-primary/5 py-32 text-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                  <span>GAM YOUTUBE • INTÉGRAL</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                  Tout YouTube <br /> en <span className="text-primary">intégralité</span>.
                </h2>
                <p className="text-lg text-foreground/60 font-medium max-w-md leading-relaxed">
                  Découvrez l'intégralité de nos productions YouTube, documentaires et contenus exclusifs dans une expérience premium sans distraction.
                </p>
              </div>
              <Button asChild className="rounded-2xl h-16 px-12 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="/web-tv" className="flex items-center gap-3">
                  Voir sur YouTube <Play className="h-4 w-4 fill-current" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-7">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {videos.slice(0, 2).map((video, index) => (
                  <motion.div
                    key={video.id}
                    variants={itemVariants}
                    className={`group relative overflow-hidden rounded-[3rem] bg-card border border-border ${index === 1 ? 'md:translate-y-12' : ''}`}
                  >
                    <Link href={`/web-tv/${video.id}`} className="block">
                      <div className="relative aspect-[4/5]">
                        <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-background/20 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                            <Play className="h-8 w-8 fill-foreground group-hover:fill-white text-foreground group-hover:text-white transition-colors" />
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 space-y-3">
                          <Badge className="bg-primary/20 backdrop-blur-md text-primary border-primary/30 text-[9px] font-black uppercase tracking-widest">
                            {video.duration}
                          </Badge>
                          <h3 className="text-2xl font-black leading-tight tracking-tighter group-hover:text-primary transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
