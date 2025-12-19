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

// Variants for staggered animations
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
      {/* Hero Section */}
      <Hero article={featuredArticle} />

      {/* Latest Feed Section */}
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

      {/* Web TV Preview Section - YouTube Centric */}
      <section className="relative bg-black py-32 text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                  <span>GAM YOUTUBE • INTÉGRAL</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                  Tout YouTube <br /> en <span className="text-red-600">intégralité</span>.
                </h2>
                <p className="text-lg text-white/60 font-medium max-w-md leading-relaxed">
                  Découvrez l'intégralité de nos productions YouTube, documentaires et contenus exclusifs dans une expérience premium sans distraction.
                </p>
              </div>
              <Button asChild className="rounded-2xl h-16 px-12 font-black bg-red-600 text-white hover:bg-red-700 shadow-2xl shadow-red-600/20 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="/web-tv" className="flex items-center gap-3">
                  Voir sur YouTube <Play className="h-4 w-4 fill-current" />
                </Link>
              </Button>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.slice(0, 2).map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`group relative overflow-hidden rounded-[3rem] bg-white/5 border border-white/10 ${index === 1 ? 'md:translate-y-12' : ''}`}
                  >
                    <Link href={`/web-tv/${video.id}`} className="block">
                      <div className="relative aspect-[4/5]">
                        <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-600">
                            <Play className="h-8 w-8 fill-white text-white group-hover:fill-white group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 space-y-3">
                          <Badge className="bg-red-600/20 backdrop-blur-md text-red-500 border-red-600/30 text-[9px] font-black uppercase tracking-widest">
                            {video.duration}
                          </Badge>
                          <h3 className="text-2xl font-black leading-tight tracking-tighter group-hover:text-red-500 transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thematic Section: Tech Focus - Evolutive Container */}
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[4rem] bg-secondary/10 p-10 md:p-24 border border-secondary/10 shadow-inner"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03]">
             <Zap className="h-[40rem] w-[40rem] text-primary" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-10">
              <div className="space-y-4">
                <Badge className="rounded-full bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-[0.3em] px-5 py-1.5 mb-2">
                  Grand Angle
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  Focus <span className="text-primary italic">Tech</span> & Innovation.
                </h2>
              </div>
              <Button variant="link" className="text-primary font-black uppercase tracking-[0.2em] text-[10px] group h-auto p-0" asChild>
                <Link href="/categories/tech" className="flex items-center gap-3">
                  Explorer la galaxie tech <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ArticleCard 
                    id="5"
                    title="Tech : Startups à suivre en 2024"
                    excerpt="Notre sélection des pépites technologiques qui vont faire bouger les lignes l'année prochaine."
                    category="Tech"
                    date="09 Oct 2023"
                    image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
                    readTime="7 min"
                  />
                  <ArticleCard 
                    id="1"
                    title="L'émergence des Smart Cities"
                    excerpt="Kigali s'impose comme un modèle de développement urbain technologique sur le continent."
                    category="Technologie"
                    date="13 Oct 2023"
                    image="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1000&auto=format&fit=crop"
                    readTime="8 min"
                  />
                </div>
              </div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col justify-between p-12 rounded-[3.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <Sparkles className="h-16 w-16" />
                </div>
                <div className="space-y-6 relative z-10">
                  <h3 className="text-4xl font-black leading-none tracking-tighter">Plus de <br />Tech ?</h3>
                  <p className="text-primary-foreground/70 font-medium leading-relaxed">
                    Découvrez comment le numérique transforme les sociétés africaines en profondeur.
                  </p>
                </div>
                <Button className="w-full h-16 rounded-2xl bg-white text-primary hover:bg-white/90 font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest relative z-10" asChild>
                  <Link href="/categories/tech">Voir tous les dossiers</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter - Integrated better */}
      <Newsletter />

      {/* Culture & Society Grid - Modern Tabbed/Split Layout */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b-2 border-primary/10 pb-6">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter">Culture.</h2>
                <div className="h-1.5 w-12 bg-primary rounded-full" />
              </div>
              <Link href="/categories/culture" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Tout voir</Link>
            </div>
            <div className="grid gap-14">
              {latestArticles.slice(1, 3).map((article, index) => (
                <motion.div 
                  key={article.id} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex gap-8 items-center"
                >
                  <div className="relative h-36 w-36 md:h-48 md:w-48 shrink-0 overflow-hidden rounded-[3rem] shadow-xl group-hover:shadow-primary/10 transition-shadow">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <Badge className="bg-accent/10 text-accent border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-2xl font-black leading-none tracking-tight">{article.title}</h3>
                    </Link>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <span>{article.date}</span>
                      <div className="h-1 w-1 rounded-full bg-primary/30" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center justify-between border-b-2 border-primary/10 pb-6">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter">Société.</h2>
                <div className="h-1.5 w-12 bg-secondary rounded-full" />
              </div>
              <Link href="/categories/societe" className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Tout voir</Link>
            </div>
            <div className="grid gap-14">
              {latestArticles.slice(2, 4).map((article, index) => (
                <motion.div 
                  key={article.id} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex gap-8 items-center"
                >
                  <div className="relative h-36 w-36 md:h-48 md:w-48 shrink-0 overflow-hidden rounded-[3rem] shadow-xl group-hover:shadow-secondary/10 transition-shadow">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-2xl font-black leading-none tracking-tight">{article.title}</h3>
                    </Link>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <span>{article.date}</span>
                      <div className="h-1 w-1 rounded-full bg-secondary/30" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
