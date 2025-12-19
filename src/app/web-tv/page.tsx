import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Tv, ArrowRight, Share2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VideoCard } from "@/components/VideoCard";

const videos = [
  { 
    id: "v1", 
    title: "L'industrie du futur à Lagos : Immersion dans la tech nigériane", 
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop", 
    duration: "12:45",
    date: "12 Oct 2023",
    category: "Documentaire",
    description: "Découvrez comment Lagos est devenue le hub technologique incontournable du continent africain."
  },
  { 
    id: "v2", 
    title: "Le retour du textile traditionnel : L'art du pagne revisité", 
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop", 
    duration: "08:20",
    date: "10 Oct 2023",
    category: "Culture",
    description: "Immersion dans les ateliers des designers qui réinventent les codes de la mode africaine."
  },
  { 
    id: "v3", 
    title: "Reportage exclusif : Les fermes solaires géantes du Kenya", 
    thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop", 
    duration: "15:10",
    date: "08 Oct 2023",
    category: "Énergie",
    description: "Le Kenya s'impose comme leader mondial de l'énergie renouvelable. Analyse d'un succès énergétique."
  },
  { 
    id: "v4", 
    title: "Talk : L'avenir de l'intelligence artificielle en Afrique", 
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", 
    duration: "24:30",
    date: "05 Oct 2023",
    category: "Innovation",
    description: "Débat avec les meilleurs experts sur les opportunités de l'IA pour le développement du continent."
  },
];

export default function WebTVPage() {
  const featuredVideo = videos[0];

  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-24">
      {/* Immersive Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image 
          src={featuredVideo.thumbnail} 
          alt={featuredVideo.title} 
          fill 
          className="object-cover opacity-40 scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-24 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-600 text-white border-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-600/40">
                À LA UNE • YOUTUBE INTÉGRAL
              </Badge>
              <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span>En direct</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              {featuredVideo.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-tight max-w-2xl">
              {featuredVideo.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Button size="lg" className="h-16 px-10 rounded-3xl bg-red-600 text-white hover:bg-red-700 font-black uppercase tracking-widest text-xs shadow-2xl shadow-red-600/20" asChild>
                <Link href={`/web-tv/${featuredVideo.id}`}>
                  <Play className="mr-3 h-5 w-5 fill-white" /> Regarder maintenant
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 rounded-3xl border-white/20 hover:bg-white/10 font-black uppercase tracking-widest text-xs transition-all">
                <Info className="mr-3 h-5 w-5" /> Détails de la vidéo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="container mx-auto px-4 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-xs">
              <Tv className="h-4 w-4" />
              <span>Univers YouTube</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">L'intégralité de nos vidéos.</h2>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-white/10 hover:bg-white/5">
                Plus récents
             </Button>
             <Button variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-white/10 hover:bg-white/5">
                Populaires
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>

      {/* Playlist Section */}
      <section className="container mx-auto px-4 mt-40">
        <div className="rounded-[4rem] bg-zinc-900 p-12 md:p-24 border border-white/5 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Ne manquez <br/>aucun direct.</h2>
               <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                 Abonnez-vous à nos alertes pour recevoir une notification dès que nous passons en direct ou publions un nouveau reportage exclusif.
               </p>
               <div className="flex gap-4">
                 <input 
                   placeholder="Votre adresse email" 
                   className="flex-1 bg-zinc-800 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary outline-none"
                 />
                 <Button className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs">
                   S'abonner
                 </Button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square rounded-3xl bg-zinc-800 animate-pulse" />
               ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/10 blur-[100px] -z-10" />
        </div>
      </section>
    </div>
  );
}
