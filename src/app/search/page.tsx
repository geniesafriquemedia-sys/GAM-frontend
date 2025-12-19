"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, ArrowLeft, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock Data
const articles = [
  {
    id: "1",
    title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
    excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent.",
    category: "Tech",
    date: "13 Oct 2023",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1000&auto=format&fit=crop",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "Éducation : Le boom des plateformes d'e-learning locales",
    excerpt: "De plus en plus d'entrepreneurs africains lancent des solutions d'apprentissage en ligne.",
    category: "Éducation",
    date: "12 Oct 2023",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min",
  },
  {
    id: "3",
    title: "Culture : Le retour en force de l'artisanat traditionnel",
    excerpt: "Comment les jeunes designers réinventent les codes de l'artisanat ancestral.",
    category: "Culture",
    date: "11 Oct 2023",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop",
    readTime: "4 min",
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredResults = useMemo(() => {
    if (!query) return articles;
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-6">
        <Button variant="ghost" size="sm" asChild className="w-fit rounded-full font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-primary transition-colors p-0">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Link>
        </Button>
        <div className="space-y-4">
           <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
             Recherche.
           </h1>
           <div className="flex flex-wrap items-center gap-4">
             <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
               {filteredResults.length} résultats
             </Badge>
             <p className="text-xl font-medium text-muted-foreground italic">
               "{query}"
             </p>
           </div>
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredResults.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-secondary/30 rounded-[3rem] border border-dashed border-primary/20">
          <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-xl">
            <Frown className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-4">Silence radio...</h2>
          <p className="text-muted-foreground max-w-sm font-medium leading-relaxed mb-8">
            Désolé, nous n'avons trouvé aucun article correspondant à "{query}". Essayez avec d'autres mots-clés ou parcourez nos catégories.
          </p>
          <div className="flex gap-4">
             <Button asChild className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px]">
                <Link href="/categories/tech">Voir la Tech</Link>
             </Button>
             <Button variant="outline" asChild className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-primary/10">
                <Link href="/web-tv">Voir la TV</Link>
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <Suspense fallback={<div className="py-20 text-center font-black animate-pulse">Scanning the archives...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

