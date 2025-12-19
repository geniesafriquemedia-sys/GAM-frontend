import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SlidersHorizontal, Sparkles } from "lucide-react";
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

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles;

  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative pt-12 md:pt-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-3xl rounded-full -translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-12 rounded-full font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-primary transition-colors">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
            </Link>
          </Button>
          
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-xs">
              <Sparkles className="h-4 w-4 fill-primary" />
              <span>Rubrique</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              {slug === "actualites" ? "Flux." : `${categoryName}.`}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed max-w-2xl">
              Explorer les récits, les innovations et les visages qui façonnent la thématique {categoryName.toLowerCase()} sur le continent.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-y border-primary/10 py-8">
           <div className="flex gap-4">
              {["Récents", "Populaires", "Dossiers"].map((filter) => (
                <Button key={filter} variant="ghost" className="rounded-full px-6 font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 hover:text-primary transition-all">
                  {filter}
                </Button>
              ))}
           </div>
           <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full h-12 px-6 font-black uppercase tracking-widest text-[10px] border-primary/10">
                 <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtres
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {displayArticles.map((article, index) => (
            <div key={article.id} className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
               {index === 0 ? (
                 <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <Link href={`/articles/${article.id}`} className="relative aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl">
                       <img src={article.image} alt={article.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    </Link>
                    <div className="space-y-6">
                       <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{article.category}</Badge>
                       <Link href={`/articles/${article.id}`} className="block group-hover:text-primary transition-colors">
                          <h2 className="text-4xl font-black tracking-tighter leading-tight">{article.title}</h2>
                       </Link>
                       <p className="text-lg text-muted-foreground font-medium leading-relaxed">{article.excerpt}</p>
                       <div className="flex items-center gap-4 pt-4">
                          <Button asChild className="rounded-full h-14 px-8 font-black uppercase tracking-widest text-xs">
                             <Link href={`/articles/${article.id}`}>Lire l'article</Link>
                          </Button>
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{article.date}</span>
                       </div>
                    </div>
                 </div>
               ) : (
                 <ArticleCard {...article} />
               )}
            </div>
          ))}
        </div>
        
        <div className="mt-32 flex flex-col items-center gap-8">
           <div className="h-1 w-24 bg-primary/10 rounded-full" />
           <Button variant="outline" className="rounded-full h-16 px-12 font-black uppercase tracking-widest text-xs border-primary/20 hover:bg-primary/5 hover:scale-105 transition-all">
             Charger plus de pépites
           </Button>
        </div>
      </section>
    </div>
  );
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
