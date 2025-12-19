import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User, Share2, PlayCircle, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/VideoCard";

// Mock Data
const videos = [
  {
    id: "v1",
    title: "Reportage : L'innovation au service de l'agriculture au Sénégal",
    duration: "12:45",
    thumbnail: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=1000&auto=format&fit=crop",
    category: "Reportage",
    description: "Découvrez comment les nouvelles technologies transforment le secteur agricole au Sénégal. De l'irrigation intelligente à l'utilisation des drones, plongée au cœur de la ferme du futur. Une enquête exclusive de GAM qui nous emmène dans les profondeurs de la Teranga.",
    date: "14 Oct 2023",
    author: "Fatou NDIAYE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  {
    id: "v2",
    title: "Interview exclusive : Le futur de la Fintech en Afrique Centrale",
    duration: "18:20",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
    category: "Interview",
    description: "Nous recevons les leaders du secteur pour discuter de la transformation bancaire numérique.",
    date: "12 Oct 2023",
    author: "Moussa TRAORE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default async function VideoPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = videos.find((v) => v.id === id) || videos[0];

  if (!video) {
    notFound();
  }

  const relatedVideos = videos.filter(v => v.id !== id).slice(0, 3);

    return (
      <div className="flex flex-col gap-12 pb-24 bg-background text-foreground">
        <section className="bg-background pt-12 pb-24">
          <div className="container mx-auto px-4">
            <Button variant="ghost" size="sm" asChild className="mb-12 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full font-black uppercase tracking-widest text-[10px] border border-transparent hover:border-border">
              <Link href="/web-tv">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la Web TV
              </Link>
            </Button>
  
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="relative aspect-video w-full overflow-hidden rounded-[3rem] bg-muted shadow-2xl border border-border ring-1 ring-border ring-offset-4 ring-offset-background">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
  
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge className="bg-primary text-white font-black uppercase tracking-widest border-none px-4 py-1 shadow-lg shadow-primary/20">{video.category}</Badge>
                      <div className="flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground bg-card px-4 py-1.5 rounded-full border border-border">
                        <Clock className="h-4 w-4 mr-2 text-primary" /> {video.duration}
                      </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-foreground">
                      {video.title}
                    </h1>
  
                    <div className="flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
                      <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                             {video.author.charAt(0)}
                          </div>
                          <div className="flex flex-col gap-0.5">
                             <span className="text-muted-foreground/60">Journaliste</span>
                             <span className="text-foreground text-xs">{video.author}</span>
                          </div>
                        </div>
                        <div className="h-8 w-[1px] bg-border" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-muted-foreground/60">Diffusé le</span>
                          <span className="text-foreground text-xs">{video.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                         <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-muted border border-border hover:bg-primary hover:text-white hover:border-primary transition-all">
                            <Share2 className="h-5 w-5" />
                         </Button>
                         <Button className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-xs bg-primary text-white shadow-lg shadow-primary/20">
                            Suivre GAM
                         </Button>
                      </div>
                    </div>
  
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                         <Info className="h-4 w-4" />
                         À propos de cette vidéo
                      </div>
                      <p className="text-xl text-foreground/80 font-medium leading-relaxed italic">
                        {video.description}
                      </p>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                         Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-4 space-y-12">
                   <div className="bg-card rounded-[2.5rem] p-8 border border-border">
                      <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3 text-foreground">
                         <PlayCircle className="h-6 w-6 text-primary" />
                         Prochaine vidéo
                      </h3>
                      <div className="space-y-8">
                         {relatedVideos.map(v => (
                           <Link key={v.id} href={`/web-tv/${v.id}`} className="block group">
                             <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border border-border">
                               <Image src={v.thumbnail} alt={v.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                             </div>
                             <h4 className="font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">{v.title}</h4>
                           </Link>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <section className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter text-foreground">Continuer de regarder.</h2>
            </div>
            <Button variant="outline" className="rounded-full h-12 px-8 font-black uppercase tracking-widest text-[10px] border-border hover:bg-muted">
               Voir tout le catalogue
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {videos.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </section>
      </div>
    );
}

