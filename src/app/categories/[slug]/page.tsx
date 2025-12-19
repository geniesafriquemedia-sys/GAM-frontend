import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe, Heart, BookOpen, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categoriesData: Record<string, any> = {
  tech: {
    title: "Tech & Innovation",
    description: "Le futur se construit ici. Décryptage des startups, des révolutions numériques et de l'IA sur le continent.",
    icon: <Zap className="h-12 w-12" />,
    color: "text-primary",
    bgColor: "bg-primary/5",
  },
  societe: {
    title: "Société & Impact",
    description: "Analyses des transformations sociales, de l'urbanisme et des enjeux de la jeunesse africaine.",
    icon: <Globe className="h-12 w-12" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
  },
  culture: {
    title: "Culture & Lifestyle",
    description: "Célébration du génie créatif : mode, art, musique et héritage revisité.",
    icon: <Heart className="h-12 w-12" />,
    color: "text-accent",
    bgColor: "bg-accent/5",
  },
  education: {
    title: "Éducation & Savoir",
    description: "Les clés de la transmission : e-learning, réformes et portraits de bâtisseurs.",
    icon: <BookOpen className="h-12 w-12" />,
    color: "text-green-500",
    bgColor: "bg-green-500/5",
  },
  economie: {
    title: "Économie & Marchés",
    description: "Comprendre les dynamiques de croissance et les opportunités d'investissement régionales.",
    icon: <BarChart3 className="h-12 w-12" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
  }
};

const mockArticles = [
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
  {
    id: "6",
    title: "L'intelligence artificielle au service de l'agriculture",
    excerpt: "Comment les algorithmes aident les agriculteurs à optimiser leurs récoltes.",
    category: "Tech",
    date: "07 Oct 2023",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
    readTime: "6 min",
  }
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoriesData[slug] || categoriesData.tech;

  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      {/* Category Header */}
      <header className={`relative p-12 md:p-24 rounded-[4rem] ${category.bgColor} overflow-hidden`}>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10">
           {category.icon}
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-8">
          <Badge className={`rounded-full ${category.bgColor} ${category.color} border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]`}>
            Catégorie
          </Badge>
          <h1 className={`text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] ${category.color}`}>
            {category.title}.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
            {category.description}
          </p>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="space-y-16">
        <div className="flex items-center justify-between border-b pb-8">
          <h2 className="text-3xl font-black tracking-tighter">Articles récents</h2>
          <div className="flex gap-4">
             <button className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors">
               <ArrowRight className="h-4 w-4 rotate-180" />
             </button>
             <button className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors">
               <ArrowRight className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Thematic Spotlight */}
      <section className="bg-zinc-950 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
           <div className="space-y-8">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Dossier <br/>Spécial {category.title}.</h2>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                Explorez nos enquêtes approfondies et nos formats longs sur les enjeux majeurs de cette thématique.
              </p>
              <Button className="h-16 px-10 rounded-3xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-xs">
                Découvrir le dossier
              </Button>
           </div>
           <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                alt="Spotlight" 
                fill 
                className="object-cover"
              />
           </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      </section>
    </div>
  );
}
