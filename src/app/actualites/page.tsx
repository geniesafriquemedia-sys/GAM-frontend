"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { useArticles, useCategories } from "@/hooks";

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch articles avec le hook
  const {
    articles,
    pagination,
    error: articlesError,
    setFilters,
    setPage
  } = useArticles({
    initialParams: {
      page_size: 12,
      ordering: '-published_at'
    }
  });

  // Fetch catégories
  const { data: categoriesData } = useCategories();

  const categories = categoriesData || [];
  const hasMore = pagination.hasNext;
  const totalCount = pagination.totalCount;

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    // Utiliser setFilters pour mettre à jour la catégorie
    if (categorySlug) {
      setFilters({ category_slug: categorySlug });
    } else {
      setFilters({ category_slug: undefined });
    }
  };

  const handleLoadMore = () => {
    setPage(pagination.page + 1);
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <header className="max-w-3xl space-y-6">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
          <TrendingUp className="h-4 w-4" />
          <span>Le Flux</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
          Toute l'actualité de <span className="text-primary">GAM.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
          Décryptage, analyses et reportages exclusifs sur les transformations du continent africain.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-y py-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <Badge
            onClick={() => handleCategoryClick(null)}
            className={`h-10 px-6 rounded-full font-bold cursor-pointer whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
          >
            Tous les articles
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              variant="secondary"
              className={`h-10 px-6 rounded-full font-bold cursor-pointer transition-all whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-white'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
              style={selectedCategory === cat.slug && cat.color ? { backgroundColor: cat.color } : {}}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm">
          <span>{totalCount} article{totalCount > 1 ? 's' : ''}</span>
        </div>
      </div>


      {/* Error State */}
      {articlesError && (
        <div className="text-center py-20">
          <p className="text-destructive font-medium">Une erreur est survenue lors du chargement des articles.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Empty State */}
      {!articlesError && articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-medium text-lg">
            Aucun article trouvé
            {selectedCategory && " dans cette catégorie"}.
          </p>
        </div>
      )}

      {/* Articles Grid */}
      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-12">
          <button
            onClick={handleLoadMore}
            className="px-10 py-5 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20 active:scale-95"
          >
            Charger plus d'articles
          </button>
        </div>
      )}
    </div>
  );
}
