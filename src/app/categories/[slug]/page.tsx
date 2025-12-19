import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const filteredArticles = articles.filter(
    (a) => a.category.toLowerCase() === slug.toLowerCase() || (slug === "tech" && a.category === "Technologie")
  );

  if (filteredArticles.length === 0 && slug !== "actualites") {
    // We'll show an empty state instead of notFound for better UX if it's a valid category slug but empty
    // but for this demo let's just use some categories
  }

  return (
    <div className="flex flex-col gap-12 pb-20 pt-12">
      <section className="container mx-auto px-4">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
          </Link>
        </Button>
        
        <div className="flex flex-col gap-4 mb-12">
          <Badge className="w-fit text-sm uppercase tracking-wider">Catégorie</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {slug === "actualites" ? "Toutes les Actualités" : categoryName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Retrouvez tous nos articles et reportages dédiés à la thématique {categoryName.toLowerCase()}.
          </p>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Fallback to show something if mock list is small */}
             {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
        
        <div className="mt-16 flex justify-center">
           <Button variant="outline" className="rounded-full px-8">Charger plus d'articles</Button>
        </div>
      </section>
    </div>
  );
}
