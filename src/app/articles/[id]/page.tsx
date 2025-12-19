import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, MessageCircle } from "lucide-react";
import { SocialShare } from "@/components/SocialShare";
import { ArticleCard } from "@/components/ArticleCard";

// Mock Data
const articles = [
  {
    id: "1",
    title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
    excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent. Entre innovation numérique et durabilité, retour sur une transformation exemplaire.",
    content: `
      <p className="text-2xl font-medium leading-relaxed mb-8 text-foreground/90">Kigali, la capitale du Rwanda, est souvent citée comme l'une des villes les plus propres et les plus sûres d'Afrique. Mais au-delà de sa propreté légendaire, la ville est en train de subir une transformation numérique radicale qui pourrait servir de modèle pour tout le continent.</p>
      
      <div className="my-12 relative aspect-[21/9] rounded-[3rem] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Smart City" className="object-cover w-full h-full" />
      </div>

      <h2 className="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">Une vision technologique claire</h2>
      <p className="mb-6 text-xl leading-relaxed text-muted-foreground">Le gouvernement rwandais a placé la technologie au cœur de son plan de développement Vision 2050. Dans ce cadre, Kigali déploie des capteurs intelligents pour surveiller la qualité de l'air, optimiser la gestion des déchets et améliorer la circulation urbaine.</p>
      
      <p className="mb-6 text-xl leading-relaxed text-muted-foreground">"L'objectif n'est pas seulement d'utiliser la technologie pour le plaisir de l'innovation, mais de résoudre des problèmes concrets auxquels nos citoyens sont confrontés quotidiennement", explique un responsable de l'innovation urbaine.</p>
      
      <div className="bg-primary/5 p-12 rounded-[3rem] my-12 border border-primary/10">
        <h3 className="text-2xl font-black mb-4 tracking-tight">Le saviez-vous ?</h3>
        <p className="text-lg font-medium text-muted-foreground">Plus de 95% de la ville de Kigali est désormais couverte par la fibre optique, permettant une connectivité ultra-rapide pour les entreprises et les citoyens.</p>
      </div>

      <h2 className="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">L'innovation au service de l'écologie</h2>
      <p className="mb-6 text-xl leading-relaxed text-muted-foreground">La gestion des ressources est un pilier central. Les systèmes d'éclairage public intelligents s'adaptent désormais à la présence de piétons ou de véhicules, réduisant ainsi la consommation d'énergie de 40% dans certains quartiers.</p>
      
      <blockquote className="relative p-12 my-12 overflow-hidden rounded-[3rem] bg-zinc-950 text-white">
        <div className="relative z-10">
           <p className="text-3xl font-black leading-tight mb-6">"Kigali démontre que le développement rapide et la durabilité environnementale ne sont pas mutuellement exclusifs, ils sont complémentaires grâce au numérique."</p>
           <cite className="text-primary font-bold uppercase tracking-widest text-sm">— Paul Kagame, Président du Rwanda</cite>
        </div>
      </blockquote>
      
      <h2 className="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">Défis et perspectives</h2>
      <p className="mb-6 text-xl leading-relaxed text-muted-foreground">Malgré ces succès, des défis subsistent, notamment en termes de connectivité dans les zones périphériques et de formation continue de la population aux nouveaux outils numériques. Cependant, l'élan est là, et Kigali continue d'attirer des investisseurs technologiques du monde entier.</p>
    `,
    category: "Technologie",
    date: "13 Oct 2023",
    author: "Jean-Marc KOFFI",
    authorTitle: "Directeur de l'Innovation",
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
    authorTitle: "Rédactrice en Chef",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    readTime: "5 min",
  }
];

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id) || articles[0];

  if (!article) {
    notFound();
  }

  const recommendations = articles.filter(a => a.id !== id).concat(articles).slice(0, 4);

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Article Hero */}
      <section className="relative w-full pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-12 rounded-full font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-primary transition-colors">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
              </Link>
            </Button>
            
            <div className="space-y-8 mb-12">
              <Badge className="bg-primary/10 text-primary border-none px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                {article.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85]">
                {article.title}
              </h1>
              <p className="text-xl md:text-3xl font-medium text-muted-foreground leading-tight max-w-4xl">
                {article.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-primary/10 mb-12">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-black">
                   {article.author.charAt(0)}
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Auteur</p>
                   <p className="text-xl font-black tracking-tight">{article.author}</p>
                   <p className="text-xs font-medium text-muted-foreground">{article.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <div className="flex flex-col gap-1">
                   <span className="text-primary">Publié le</span>
                   <span className="text-foreground">{article.date}</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-primary">Lecture</span>
                   <span className="text-foreground">{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main image */}
      <section className="container mx-auto px-4">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[4rem] max-w-7xl mx-auto shadow-2xl ring-1 ring-primary/5">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          {/* Side Actions */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-32 flex flex-col gap-6">
                <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/10 hover:bg-primary/5 group">
                   <Bookmark className="h-6 w-6 group-hover:fill-primary transition-all" />
                </Button>
                <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/10 hover:bg-primary/5">
                   <MessageCircle className="h-6 w-6" />
                </Button>
                <div className="h-12 w-[1px] bg-primary/10 mx-auto" />
                <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/10 hover:bg-primary/5">
                   <Share2 className="h-6 w-6" />
                </Button>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div 
              className="prose prose-zinc prose-xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[3rem]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-24 p-12 bg-zinc-950 rounded-[4rem] text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-3xl font-black tracking-tighter">Cet article vous a plu ?</h3>
                    <p className="text-zinc-400 font-medium">Partagez l'excellence africaine avec votre réseau.</p>
                 </div>
                 <SocialShare url={`https://gam.africa/articles/${article.id}`} title={article.title} />
              </div>
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </div>

          {/* Side widgets */}
          <div className="lg:col-span-3 space-y-12">
             <div className="p-8 bg-secondary/50 rounded-[3rem] border border-primary/10">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">À propos de l'auteur</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                   Jean-Marc est un expert des nouvelles technologies avec plus de 15 ans d'expérience sur le continent africain.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4 text-xs font-black uppercase tracking-widest text-primary">Voir son profil</Button>
             </div>

             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary">Populaire en ce moment</h3>
                <div className="grid gap-6">
                   {recommendations.slice(0, 2).map(item => (
                     <Link key={item.id} href={`/articles/${item.id}`} className="group flex flex-col gap-3">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h4 className="font-black leading-tight tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Recommendations Footer */}
      <section className="container mx-auto px-4 mt-24">
        <div className="max-w-7xl mx-auto border-t border-primary/10 pt-24">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-4xl font-black tracking-tighter">Continuer la lecture.</h2>
             <Button variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px]">Explorer tout</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {recommendations.map((rec) => (
              <ArticleCard key={rec.id} {...rec} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
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
