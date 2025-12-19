import { VideoCard } from "@/components/VideoCard";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
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
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Video section */}
      <section className="bg-zinc-950 text-white pt-12 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Web TV</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Link href={`/web-tv/${featuredVideo.id}`} className="group relative aspect-video block overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-primary-foreground fill-current ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <Badge className="mb-3">{featuredVideo.category}</Badge>
                   <h2 className="text-2xl md:text-3xl font-bold">{featuredVideo.title}</h2>
                </div>
              </Link>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-zinc-800 pb-2">À ne pas manquer</h3>
              <div className="space-y-4">
                {videos.slice(1, 4).map((video) => (
                  <Link key={video.id} href={`/web-tv/${video.id}`} className="flex gap-4 group">
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
                      <p className="text-xs text-zinc-500">{video.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h4 className="font-bold mb-2">Abonnez-vous à notre chaîne</h4>
                <p className="text-sm text-zinc-400 mb-4">Ne ratez aucune émission de GAM Web TV.</p>
                <Button className="w-full rounded-full">S'abonner</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Toutes les vidéos</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Toutes</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Émissions</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Interviews</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </div>
  );
}
