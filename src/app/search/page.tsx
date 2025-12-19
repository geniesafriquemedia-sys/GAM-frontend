"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";

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
  {
    id: "4",
    title: "Société : Les enjeux de la transition énergétique",
    excerpt: "Analyse des défis et opportunités du passage au vert pour les économies d'Afrique.",
    category: "Société",
    date: "10 Oct 2023",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    readTime: "6 min",
  },
  {
    id: "5",
    title: "Tech : Startups à suivre en 2024",
    excerpt: "Notre sélection des pépites technologiques qui vont faire bouger les lignes.",
    category: "Tech",
    date: "09 Oct 2023",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    readTime: "7 min",
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SearchIcon className="h-8 w-8 text-primary" />
          Résultats pour "{query}"
        </h1>
        <p className="text-muted-foreground">
          Nous avons trouvé {filteredResults.length} contenu(s) correspondant à votre recherche.
        </p>
      </div>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResults.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
          <p className="text-muted-foreground max-w-sm">
            Désolé, nous n'avons trouvé aucun article correspondant à "{query}". Essayez avec d'autres mots-clés.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div className="py-20 text-center">Chargement des résultats...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
