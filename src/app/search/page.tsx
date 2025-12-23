"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";
import { Search as SearchIcon, FileText, Play, User, Folder } from "lucide-react";
import { useSearch } from "@/hooks";
import type { SearchContentType } from "@/types";

// Loading skeleton for search page
function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-12 animate-pulse">
      <div className="space-y-6">
        <div className="h-4 w-48 bg-muted rounded" />
        <div className="h-16 w-3/4 bg-muted rounded" />
      </div>
      <div className="h-16 bg-muted rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-video bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const type = (searchParams.get("type") as SearchContentType) || "all";

  const { results, query, activeType, isSearching, setQuery, setType, search } = useSearch();

  // Lancer la recherche quand les params changent
  useEffect(() => {
    if (q) {
      setType(type);
      search(q);
    }
  }, [q, type]);

  const totalCount = results
    ? results.articles.length + results.videos.length + results.categories.length + results.authors.length
    : 0;

  const filterTypes: { value: SearchContentType; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "Tout", icon: <SearchIcon className="h-4 w-4" /> },
    { value: "articles", label: "Articles", icon: <FileText className="h-4 w-4" /> },
    { value: "videos", label: "Vidéos", icon: <Play className="h-4 w-4" /> },
    { value: "categories", label: "Catégories", icon: <Folder className="h-4 w-4" /> },
    { value: "authors", label: "Auteurs", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
          <SearchIcon className="h-4 w-4" />
          <span>Résultats de recherche</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
          {q ? `Résultats pour "${q}"` : "Rechercher sur GAM"}
        </h1>
        {q && (
          <p className="text-xl text-muted-foreground font-medium">
            {isSearching ? "Recherche en cours..." : `${totalCount} résultat(s) trouvé(s)`}
          </p>
        )}
      </header>

      {/* Search Bar & Filters */}
      <div className="flex flex-col gap-6 border-y py-8">
        {/* Search Input */}
        <form className="relative flex-1 group" action="/search">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            defaultValue={q}
            name="q"
            placeholder="Rechercher des articles, vidéos, auteurs..."
            className="w-full rounded-2xl border bg-muted/50 pl-12 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </form>

        {/* Type Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {filterTypes.map((filter) => (
            <Link
              key={filter.value}
              href={`/search?q=${encodeURIComponent(q)}&type=${filter.value}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeType === filter.value
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {filter.icon}
              {filter.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Results */}
      {!q ? (
        // No query
        <div className="py-24 text-center space-y-6 bg-muted/30 rounded-3xl">
          <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <SearchIcon className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter">Que recherchez-vous ?</h2>
            <p className="text-muted-foreground font-medium max-w-md mx-auto">
              Entrez un terme pour rechercher des articles, vidéos et auteurs.
            </p>
          </div>
        </div>
      ) : results && totalCount > 0 ? (
        <div className="space-y-16">
          {/* Articles */}
          {results.articles.length > 0 && (activeType === "all" || activeType === "articles") && (
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Articles ({results.articles.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Videos */}
          {results.videos.length > 0 && (activeType === "all" || activeType === "videos") && (
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                <Play className="h-6 w-6 text-primary" />
                Vidéos ({results.videos.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (activeType === "all" || activeType === "categories") && (
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                <Folder className="h-6 w-6 text-primary" />
                Catégories ({results.categories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all group"
                  >
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.articles_count} articles</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Authors */}
          {results.authors.length > 0 && (activeType === "all" || activeType === "authors") && (
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                Auteurs ({results.authors.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.authors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/auteurs/${author.slug}`}
                    className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all group"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {author.photo ? (
                        <Image
                          src={author.photo}
                          alt={author.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <User className="h-8 w-8 text-primary/50" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">{author.name}</h3>
                      <p className="text-sm text-muted-foreground">{author.articles_count} articles</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : results && totalCount === 0 ? (
        // No results
        <div className="py-24 text-center space-y-6 bg-muted/30 rounded-3xl">
          <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <SearchIcon className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter">Aucun résultat trouvé</h2>
            <p className="text-muted-foreground font-medium max-w-md mx-auto">
              Essayez avec d'autres mots-clés ou parcourez nos catégories.
            </p>
          </div>
          <Link
            href="/actualites"
            className="inline-block mt-4 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all"
          >
            Voir les actualités
          </Link>
        </div>
      ) : null}
    </div>
  );
}
