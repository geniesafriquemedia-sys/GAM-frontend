import { VideoCard } from "@/components/VideoCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Tv, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Data
const videos = [
  {
    id: "v1",
    title: "Reportage : L'innovation au service de l'agriculture au Sénégal",
    duration: "12:45",
    thumbnail: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=1000&auto=format&fit=crop",
    category: "Reportage",
  },
  {
    id: "v2",
    title: "Interview exclusive : Le futur de la Fintech en Afrique Centrale",
    duration: "18:20",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
    category: "Interview",
  },
  {
    id: "v3",
    title: "GAM Tech Show : Les gadgets qui vont changer votre quotidien",
    duration: "08:15",
    thumbnail: "https://images.unsplash.com/photo-1526733158272-60b7404276a0?q=80&w=1000&auto=format&fit=crop",
    category: "Émission",
  },
  {
    id: "v4",
    title: "Documentaire : Les cités oubliées de l'histoire africaine",
    duration: "45:00",
    thumbnail: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop",
    category: "Documentaire",
  },
  {
    id: "v5",
    title: "Tuto : Comment lancer sa startup avec un petit budget",
    duration: "15:30",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop",
    category: "Éducation",
  },
  {
    id: "v6",
    title: "Live : Débat sur l'intelligence artificielle et l'emploi",
    duration: "1:05:00",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    category: "Live",
  },
];

export default function WebTVPage() {
  const featuredVideo = videos[0];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Video section */}
      <section className="bg-zinc-950 text-white pt-24 pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 blur-3xl h-[600px] w-[600px] bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-12">
            <div className="space-y-4 max-w-2xl">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full border border-accent/20">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Live Now</span>
                 </div>
                 <Badge className="bg-primary hover:bg-primary/90 rounded-full px-4 text-xs font-black uppercase tracking-widest border-none">GAM TV</Badge>
               </div>
               <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">Web TV.</h1>
               <p className="text-zinc-400 text-xl font-medium max-w-xl">
                 L'excellence visuelle au service des récits africains. Reportages, interviews et émissions exclusives.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <Link href={`/web-tv/${featuredVideo.id}`} className="group relative aspect-video block overflow-hidden rounded-[3rem] bg-zinc-900 shadow-2xl border border-white/5">
                  <Image
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl transform group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                      <Play className="h-10 w-10 text-white fill-white ml-2 transition-colors group-hover:text-primary-foreground group-hover:fill-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10">
                     <Badge className="mb-4 bg-accent text-accent-foreground font-black uppercase tracking-widest border-none px-4">{featuredVideo.category}</Badge>
                     <h2 className="text-3xl md:text-5xl font-black tracking-tighter max-w-2xl leading-tight">{featuredVideo.title}</h2>
                  </div>
                </Link>
              </div>
              
              <div className="lg:col-span-4 space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                   <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                     <TrendingUp className="h-5 w-5 text-primary" />
                     À ne pas manquer
                   </h3>
                </div>
                <div className="grid gap-6">
                  {videos.slice(1, 4).map((video) => (
                    <Link key={video.id} href={`/web-tv/${video.id}`} className="flex gap-6 group">
                      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5">
                        <Image src={video.thumbnail} alt={video.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Play className="h-6 w-6 text-white fill-white" />
                        </div>
                      </div>
                      <div className="space-y-2 py-1">
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-white/20 text-zinc-400">{video.category}</Badge>
                        <h4 className="text-md font-black leading-tight tracking-tight line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{video.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="bg-primary/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-primary/20 relative overflow-hidden group">
                  <Zap className="absolute -bottom-8 -right-8 h-32 w-32 text-primary opacity-10 transition-transform group-hover:scale-125" />
                  <h4 className="text-xl font-black tracking-tight mb-2">Canal GAM+</h4>
                  <p className="text-sm text-zinc-400 mb-6 font-medium">Rejoignez 100k+ abonnés pour du contenu premium.</p>
                  <Button className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">S'abonner maintenant</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Bibliothèque.</h2>
            <p className="text-muted-foreground font-medium text-lg">Plus de 500 heures de contenus originaux.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Toutes", "Émissions", "Interviews", "Reportages", "Culture"].map((cat) => (
              <Button key={cat} variant="outline" className="rounded-full h-12 px-8 font-bold border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all">
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
      
      {/* Featured show section */}
      <section className="container mx-auto px-4">
         <div className="bg-zinc-950 text-white rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
               <Image src="https://images.unsplash.com/photo-1598387993441-a3641824c301?q=80&w=2000&auto=format&fit=crop" alt="TV Show" fill className="object-cover" />
            </div>
            <div className="relative z-10 max-w-2xl space-y-8">
               <div className="flex items-center gap-2 text-accent font-black uppercase tracking-[0.3em] text-sm">
                  <Tv className="h-6 w-6" />
                  <span>Série Spéciale</span>
               </div>
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">Génies du <br /> continent.</h2>
               <p className="text-xl text-zinc-400 font-medium">Une série documentaire qui explore les parcours des inventeurs et créateurs les plus influents d'Afrique.</p>
               <Button size="lg" className="rounded-full h-16 px-12 font-black text-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-accent/20">
                  Regarder la série <ArrowRight className="ml-3 h-6 w-6" />
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}

