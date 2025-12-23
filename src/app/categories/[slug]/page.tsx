import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Folder } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Category, ArticleSummary } from "@/types";

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let category: Category;
  let articles: ArticleSummary[] = [];

  try {
    // Fetch category details
    category = await api.categories.getBySlug(slug);

    // Fetch articles in this category
    const articlesResponse = await api.articles.getAll({
      category: slug,
      page_size: 12,
      ordering: '-published_at'
    });
    articles = articlesResponse.results;
  } catch (error) {
    notFound();
  }

  // Generate dynamic styles based on category color
  const categoryColor = category.color || '#2563eb';

  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      {/* Category Header */}
      <header
        className="relative p-12 md:p-24 rounded-[4rem] overflow-hidden"
        style={{ backgroundColor: `${categoryColor}10` }}
      >
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10">
          {category.icon ? (
            <span className="text-9xl">{category.icon}</span>
          ) : (
            <Folder className="h-48 w-48" style={{ color: categoryColor }} />
          )}
        </div>

        <div className="relative z-10 max-w-3xl space-y-8">
          <Badge
            className="rounded-full border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            Catégorie
          </Badge>
          <h1
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            style={{ color: categoryColor }}
          >
            {category.name}.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
            {category.description || `Découvrez tous les articles de la catégorie ${category.name}.`}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">{category.articles_count} article{category.articles_count > 1 ? 's' : ''}</span>
          </div>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="space-y-16">
        <div className="flex items-center justify-between border-b pb-8">
          <h2 className="text-3xl font-black tracking-tighter">Articles récents</h2>
          <span className="text-muted-foreground font-medium">
            {articles.length} article{articles.length > 1 ? 's' : ''}
          </span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Aucun article dans cette catégorie pour le moment.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/actualites">Voir tous les articles</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Thematic Spotlight */}
      {category.is_featured && articles.length > 0 && (
        <section className="bg-zinc-950 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Dossier <br />Spécial {category.name}.
              </h2>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                Explorez nos enquêtes approfondies et nos formats longs sur les enjeux majeurs de cette thématique.
              </p>
              <Button asChild className="h-16 px-10 rounded-3xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-xs">
                <Link href={`/actualites?category=${slug}`}>
                  Découvrir le dossier
                </Link>
              </Button>
            </div>
            {articles[0]?.featured_image && (
              <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
                <Image
                  src={articles[0].featured_image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(to bottom right, ${categoryColor}, transparent)` }}
          />
        </section>
      )}

      {/* Back to categories */}
      <div className="flex justify-center">
        <Button asChild variant="outline" className="rounded-full h-14 px-10 font-black uppercase tracking-widest text-[10px]">
          <Link href="/categories">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Toutes les catégories
          </Link>
        </Button>
      </div>
    </div>
  );
}
