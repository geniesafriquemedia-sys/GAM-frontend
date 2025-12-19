import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <Hero article={featuredArticle} />

      {/* Latest Feed Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
              <TrendingUp className="h-4 w-4" />
              <span>En ce moment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Dernières pépites.</h2>
          </div>
          <Button variant="outline" asChild className="rounded-full h-12 px-8 font-bold border-primary/20 hover:bg-primary/5 transition-all">
            <Link href="/actualites">
              Parcourir tout le flux <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Web TV Preview Section */}
      <section className="bg-zinc-950 py-24 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-black uppercase tracking-[0.2em] text-xs">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>GAM TV LIVE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">L'Afrique en images.</h2>
            </div>
            <Button asChild className="rounded-full h-14 px-10 font-bold bg-white text-black hover:bg-zinc-200">
              <Link href="/web-tv">Accéder à la Web TV</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Link key={video.id} href={`/web-tv/${video.id}`} className="group relative flex flex-col gap-4">
                <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-black leading-tight tracking-tight group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Thematic Section: Tech Focus */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-secondary/30 p-8 md:p-16">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-5">
             <Zap className="h-96 w-96 text-primary" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="space-y-2">
                <Badge className="rounded-full bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest mb-2">
                  Grand Angle
                </Badge>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Focus Tech & Innovation.</h2>
              </div>
              <Button variant="link" className="text-primary font-black uppercase tracking-widest text-xs group" asChild>
                <Link href="/categories/tech">
                  Explorer la tech <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="flex flex-col justify-center space-y-6 p-10 rounded-[2.5rem] bg-primary text-primary-foreground">
                <h3 className="text-3xl font-black leading-tight tracking-tighter">Plus de Tech ?</h3>
                <p className="text-primary-foreground/70 font-medium leading-relaxed">
                  Découvrez comment le numérique transforme les sociétés africaines en profondeur.
                </p>
                <Button className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black shadow-lg" asChild>
                  <Link href="/categories/tech">Voir tous les dossiers</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Culture & Society Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-black tracking-tighter">Culture.</h2>
              <Link href="/categories/culture" className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Voir plus</Link>
            </div>
            <div className="grid gap-12">
              {latestArticles.slice(1, 3).map(article => (
                <div key={article.id} className="group flex gap-6 items-start">
                  <div className="relative h-32 w-32 md:h-40 md:w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-lg">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="space-y-3 pt-2">
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-none text-[9px] font-black uppercase tracking-widest">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-xl font-black leading-tight tracking-tight">{article.title}</h3>
                    </Link>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{article.date} • {article.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-black tracking-tighter">Société.</h2>
              <Link href="/categories/societe" className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Voir plus</Link>
            </div>
            <div className="grid gap-12">
              {latestArticles.slice(2, 4).map(article => (
                <div key={article.id} className="group flex gap-6 items-start">
                  <div className="relative h-32 w-32 md:h-40 md:w-40 shrink-0 overflow-hidden rounded-[2rem] shadow-lg">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="space-y-3 pt-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-xl font-black leading-tight tracking-tight">{article.title}</h3>
                    </Link>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{article.date} • {article.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

