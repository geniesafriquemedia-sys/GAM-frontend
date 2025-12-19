import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
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

const techArticles = latestArticles.filter(a => a.category === "Tech" || a.category === "Technologie" || a.id === "5");
const cultureArticles = latestArticles.filter(a => a.category === "Culture" || a.id === "3");

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* US-H-01: Contenus à la une */}
      <Hero article={featuredArticle} />

      {/* US-H-02: Fil d'actualité */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dernières Actualités</h2>
          <Button variant="ghost" asChild>
            <Link href="/actualites">
              Voir tout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* US-H-03: Blocs thématiques - Tech */}
      <section className="container mx-auto px-4">
        <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Focus Tech</h2>
            <Button variant="link" className="text-white hover:text-primary" asChild>
              <Link href="/categories/tech">
                Explorer la catégorie <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="flex flex-col justify-center space-y-4 p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
               <h3 className="text-xl font-bold">Plus de Tech ?</h3>
               <p className="text-zinc-400 text-sm">Découvrez toutes les innovations qui façonnent l'Afrique de demain.</p>
               <Button variant="secondary" className="w-full" asChild>
                 <Link href="/categories/tech">Accéder à la rubrique</Link>
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* US-H-03: Blocs thématiques - Culture & Société */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Culture</h2>
              <Link href="/categories/culture" className="text-primary text-sm font-medium hover:underline">Voir plus</Link>
            </div>
            <div className="space-y-8">
              {latestArticles.slice(1, 3).map(article => (
                <div key={article.id} className="flex gap-4 items-start">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-bold leading-tight">{article.title}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Société</h2>
              <Link href="/categories/societe" className="text-primary text-sm font-medium hover:underline">Voir plus</Link>
            </div>
            <div className="space-y-8">
              {latestArticles.slice(2, 4).map(article => (
                <div key={article.id} className="flex gap-4 items-start">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{article.category}</Badge>
                    <Link href={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-bold leading-tight">{article.title}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{article.date}</p>
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
