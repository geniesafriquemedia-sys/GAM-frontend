import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, MessageCircle, ChevronRight } from "lucide-react";
import { SocialShare } from "@/components/SocialShare";
import { ArticleCard } from "@/components/ArticleCard";

// Mock Data
const articles = [
  {
    id: "1",
    title: "L'émergence des Smart Cities en Afrique : L'exemple de Kigali",
    excerpt: "Kigali s'impose comme un modèle de développement urbain technologique sur le continent. Entre innovation numérique et durabilité, retour sur une transformation exemplaire.",
    content: `
      <p class="text-2xl font-medium leading-relaxed mb-8 text-foreground/90">Kigali, la capitale du Rwanda, est souvent citée comme l'une des villes les plus propres et les plus sûres d'Afrique. Mais au-delà de sa propreté légendaire, la ville est en train de subir une transformation numérique radicale qui pourrait servir de modèle pour tout le continent.</p>
      
      <div class="my-12 relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" alt="Smart City" class="object-cover w-full h-full" />
      </div>

      <h2 class="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">Une vision technologique claire</h2>
      <p class="mb-6 text-xl leading-relaxed text-muted-foreground">Le gouvernement rwandais a placé la technologie au cœur de son plan de développement Vision 2050. Dans ce cadre, Kigali déploie des capteurs intelligents pour surveiller la qualité de l'air, optimiser la gestion des déchets et améliorer la circulation urbaine.</p>
      
      <p class="mb-6 text-xl leading-relaxed text-muted-foreground">"L'objectif n'est pas seulement d'utiliser la technologie pour le plaisir de l'innovation, mais de résoudre des problèmes concrets auxquels nos citoyens sont confrontés quotidiennement", explique un responsable de l'innovation urbaine.</p>
      
      <div class="bg-primary/5 p-12 rounded-[3rem] my-12 border border-primary/10">
        <h3 class="text-2xl font-black mb-4 tracking-tight">Le saviez-vous ?</h3>
        <p class="text-lg font-medium text-muted-foreground">Plus de 95% de la ville de Kigali est désormais couverte par la fibre optique, permettant une connectivité ultra-rapide pour les entreprises et les citoyens.</p>
      </div>

      <h2 class="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">L'innovation au service de l'écologie</h2>
      <p class="mb-6 text-xl leading-relaxed text-muted-foreground">La gestion des ressources est un pilier central. Les systèmes d'éclairage public intelligents s'adaptent désormais à la présence de piétons ou de véhicules, réduisant ainsi la consommation d'énergie de 40% dans certains quartiers.</p>
      
      <blockquote class="relative p-12 my-12 overflow-hidden rounded-[3rem] bg-zinc-950 text-white">
        <div class="relative z-10">
           <p class="text-3xl font-black leading-tight mb-6">"Kigali démontre que le développement rapide et la durabilité environnementale ne sont pas mutuellement exclusifs, ils sont complémentaires grâce au numérique."</p>
           <cite class="text-primary font-bold uppercase tracking-widest text-sm">— Paul Kagame, Président du Rwanda</cite>
        </div>
      </blockquote>
      
      <h2 class="text-4xl font-black tracking-tighter mt-12 mb-6 text-primary">Défis et perspectives</h2>
      <p class="mb-6 text-xl leading-relaxed text-muted-foreground">Malgré ces succès, des défis subsistent, notamment en termes de connectivité dans les zones périphériques et de formation continue de la population aux nouveaux outils numériques. Cependant, l'élan est là, et Kigali continue d'attirer des investisseurs technologiques du monde entier.</p>
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
    content: `<p class="text-xl leading-relaxed text-muted-foreground">L'éducation en Afrique connaît une révolution silencieuse portée par le numérique. Des plateformes locales émergent pour répondre aux besoins spécifiques des étudiants africains...</p>`,
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
      <section className="relative w-full pt-12 md:pt-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/actualites" className="hover:text-primary transition-colors">Actualités</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary">{article.category}</span>
            </nav>
            
            <div className="space-y-10 mb-16">
              <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                {article.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] lg:leading-[0.85] text-gradient">
                {article.title}
              </h1>
              <p className="text-xl md:text-3xl font-medium text-foreground/80 leading-tight max-w-4xl italic">
                "{article.excerpt}"
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-8 py-10 border-y border-primary/10 mb-16">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
                   {article.author.charAt(0)}
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Expert GAM</p>
                   <p className="text-2xl font-black tracking-tight">{article.author}</p>
                   <p className="text-sm font-medium text-muted-foreground">{article.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-secondary/50 p-6 rounded-[2rem]">
                <div className="flex flex-col gap-1">
                   <span className="text-primary/60">Date de publication</span>
                   <span className="text-foreground text-sm">{article.date}</span>
                </div>
                <div className="w-[1px] h-8 bg-primary/10" />
                <div className="flex flex-col gap-1">
                   <span className="text-primary/60">Temps de lecture</span>
                   <span className="text-foreground text-sm">{article.readTime}</span>
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
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
        </div>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          {/* Side Actions */}
          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-32 flex flex-col gap-6">
                <Button size="icon" variant="outline" className="h-16 w-16 rounded-3xl border-primary/10 hover:bg-primary/5 group transition-all hover:-translate-y-1">
                   <Bookmark className="h-6 w-6 group-hover:fill-primary transition-all" />
                </Button>
                <Button size="icon" variant="outline" className="h-16 w-16 rounded-3xl border-primary/10 hover:bg-primary/5 transition-all hover:-translate-y-1">
                   <MessageCircle className="h-6 w-6" />
                </Button>
                <div className="h-12 w-[1px] bg-primary/10 mx-auto my-2" />
                <Button size="icon" variant="outline" className="h-16 w-16 rounded-3xl border-primary/10 hover:bg-primary/5 transition-all hover:-translate-y-1">
                   <Share2 className="h-6 w-6" />
                </Button>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div 
              className="prose prose-zinc prose-2xl dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-primary prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[3rem] prose-strong:text-foreground prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-24 p-16 bg-zinc-950 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-4xl font-black tracking-tighter">L'Afrique mérite d'être partagée.</h3>
                    <p className="text-zinc-400 text-lg font-medium">Contribuez au rayonnement du continent en partageant ce dossier.</p>
                 </div>
                 <SocialShare url={`https://gam.africa/articles/${article.id}`} title={article.title} />
              </div>
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-primary/30 to-transparent opacity-50" />
            </div>
          </div>

          {/* Side widgets */}
          <div className="lg:col-span-3 space-y-12">
             <div className="p-10 bg-secondary/50 rounded-[3.5rem] border border-primary/10 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <User className="h-24 w-24 text-primary" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">L'Expertise GAM</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed relative z-10">
                   Jean-Marc décrypte les tendances technologiques africaines depuis plus de 15 ans pour les plus grands médias internationaux.
                </p>
                <Button variant="link" className="p-0 h-auto mt-6 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline group/btn">
                  Voir ses publications <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Button>
             </div>

             <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                   <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                   Populaire en ce moment
                </h3>
                <div className="grid gap-8">
                   {recommendations.slice(0, 3).map(item => (
                     <Link key={item.id} href={`/articles/${item.id}`} className="group flex flex-col gap-4">
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg ring-1 ring-primary/5">
                           <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white">Lire l'article</span>
                           </div>
                        </div>
                        <h4 className="text-lg font-black leading-tight tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Recommendations Footer */}
      <section className="container mx-auto px-4 mt-32">
        <div className="max-w-7xl mx-auto border-t border-primary/10 pt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
             <div className="space-y-4">
               <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Alimentez votre curiosité</p>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">Continuer <br/> l'aventure.</h2>
             </div>
             <Button variant="outline" className="rounded-full h-14 px-10 font-black uppercase tracking-widest text-[10px] border-primary/20 hover:bg-primary/5 transition-all" asChild>
               <Link href="/actualites">Explorer tout le flux</Link>
             </Button>
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
