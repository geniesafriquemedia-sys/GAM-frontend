import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";
import { SocialShare } from "@/components/SocialShare";
import { ArticleCard } from "@/components/ArticleCard";

// Mock Data (same as in page.tsx but more detailed)
const articles = [
  {
    id: "1",
    title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
    excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent. Entre innovation numérique et durabilité, retour sur une transformation exemplaire.",
    content: `
      <p className="text-xl font-medium leading-relaxed mb-6">Kigali, la capitale du Rwanda, est souvent citée comme l'une des villes les plus propres et les plus sûres d'Afrique. Mais au-delà de sa propreté légendaire, la ville est en train de subir une transformation numérique radicale qui pourrait servir de modèle pour tout le continent.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Une vision technologique claire</h2>
      <p className="mb-4">Le gouvernement rwandais a placé la technologie au cœur de son plan de développement Vision 2050. Dans ce cadre, Kigali déploie des capteurs intelligents pour surveiller la qualité de l'air, optimiser la gestion des déchets et améliorer la circulation urbaine.</p>
      
      <p className="mb-4">"L'objectif n'est pas seulement d'utiliser la technologie pour le plaisir de l'innovation, mais de résoudre des problèmes concrets auxquels nos citoyens sont confrontés quotidiennement", explique un responsable de l'innovation urbaine.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">L'innovation au service de l'écologie</h2>
      <p className="mb-4">La gestion des ressources est un pilier central. Les systèmes d'éclairage public intelligents s'adaptent désormais à la présence de piétons ou de véhicules, réduisant ainsi la consommation d'énergie de 40% dans certains quartiers.</p>
      
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg text-muted-foreground">
        "Kigali démontre que le développement rapide et la durabilité environnementale ne sont pas mutuellement exclusifs, ils sont complémentaires grâce au numérique."
      </blockquote>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Défis et perspectives</h2>
      <p className="mb-4">Malgré ces succès, des défis subsistent, notamment en termes de connectivité dans les zones périphériques et de formation continue de la population aux nouveaux outils numériques. Cependant, l'élan est là, et Kigali continue d'attirer des investisseurs technologiques du monde entier.</p>
    `,
    category: "Technologie",
    date: "13 Oct 2023",
    author: "Jean-Marc KOFFI",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2000&auto=format&fit=crop",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "Éducation : Le boom des plateformes d'e-learning locales",
    excerpt: "De plus en plus d'entrepreneurs africains lancent des solutions d'apprentissage en ligne adaptées aux réalités du continent.",
    content: `<p>Contenu détaillé de l'article sur l'e-learning...</p>`,
    category: "Éducation",
    date: "12 Oct 2023",
    author: "Aminata DIOP",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min",
  }
];

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const recommendations = articles.filter(a => a.id !== id).slice(0, 3);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header section with Breadcrumb and Title */}
      <section className="container mx-auto px-4 pt-12 md:pt-16">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
          </Link>
        </Button>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge className="rounded-full px-4 py-1 text-sm">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime} de lecture
            </div>
          </div>
        </div>
      </section>

      {/* Main image */}
      <section className="container mx-auto px-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl max-w-5xl mx-auto">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <div className="mt-12 pt-8 border-t">
            <SocialShare url={`https://gam.africa/articles/${article.id}`} title={article.title} />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="container mx-auto px-4 mt-12">
        <div className="max-w-5xl mx-auto border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Articles recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((rec) => (
              <ArticleCard key={rec.id} {...rec} />
            ))}
            {/* If not enough articles, show placeholder/latest */}
            {recommendations.length === 0 && <p className="text-muted-foreground">Plus d'articles arrivent bientôt.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
