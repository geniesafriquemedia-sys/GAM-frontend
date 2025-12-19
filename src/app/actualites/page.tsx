import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Filter, TrendingUp } from "lucide-react";

const allArticles = [
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
  {
    id: "6",
    title: "Economie : La résilience des marchés ouest-africains",
    excerpt: "Décryptage des dynamiques économiques régionales face aux enjeux mondiaux.",
    category: "Economie",
    date: "08 Oct 2023",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min",
  },
];

const categories = ["Tous", "Technologie", "Société", "Culture", "Éducation", "Economie", "Tech"];

export default function ActualitesPage() {
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
          <Badge className="h-10 px-6 rounded-full bg-primary text-white font-bold cursor-pointer whitespace-nowrap">
            Tous les articles
          </Badge>
          {categories.filter(c => c !== "Tous").map((cat) => (
            <Badge key={cat} variant="secondary" className="h-10 px-6 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary font-bold cursor-pointer transition-all whitespace-nowrap">
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm bg-muted/50 px-6 py-3 rounded-2xl cursor-pointer hover:bg-muted transition-colors whitespace-nowrap">
          <Filter className="h-4 w-4" />
          <span>Filtrer par date</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {allArticles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      <div className="flex justify-center pt-12">
        <button className="px-10 py-5 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20 active:scale-95">
          Charger plus d'articles
        </button>
      </div>
    </div>
  );
}
