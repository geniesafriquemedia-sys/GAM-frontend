import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Filter, Search as SearchIcon } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  // Mock results
  const results = [
    {
      id: "1",
      title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
      excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent.",
      category: "Technologie",
      date: "13 Oct 2023",
      image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000&auto=format&fit=crop",
      readTime: "8 min",
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
  ].filter(r => r.title.toLowerCase().includes(q?.toLowerCase() || ""));

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
          <SearchIcon className="h-4 w-4" />
          <span>Résultats de recherche</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
          {q ? `Résultats pour "${q}"` : "Rechercher sur GAM"}
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          {results.length} article(s) trouvé(s) pour votre requête.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 border-y py-8">
        <form className="relative flex-1 group" action="/search">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            defaultValue={q}
            name="q"
            placeholder="Nouvelle recherche..."
            className="w-full rounded-2xl border bg-muted/50 pl-12 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </form>
        <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm bg-muted/50 px-6 py-4 rounded-2xl cursor-pointer hover:bg-muted transition-colors whitespace-nowrap">
          <Filter className="h-4 w-4" />
          <span>Filtrer par type</span>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {results.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-6 bg-secondary/30 rounded-[4rem]">
          <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
             <SearchIcon className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter">Aucun résultat trouvé</h2>
            <p className="text-muted-foreground font-medium max-w-md mx-auto">
              Essayez avec d'autres mots-clés ou parcourez nos catégories populaires.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
