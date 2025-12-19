import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
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
    description: "Découvrez comment les nouvelles technologies transforment le secteur agricole au Sénégal. De l'irrigation intelligente à l'utilisation des drones, plongée au cœur de la ferme du futur.",
    date: "14 Oct 2023",
    author: "Fatou NDIAYE",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  // ... (could add more if needed)
];

export default async function VideoPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = videos.find((v) => v.id === id) || videos[0]; // Defaulting for demo purposes

  if (!video) {
    notFound();
  }

  const relatedVideos = videos.filter(v => v.id !== id).slice(0, 3);

  return (
    <div className="flex flex-col gap-8 pb-20">
      <section className="bg-zinc-950 text-white pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-6 text-zinc-400 hover:text-white hover:bg-zinc-900">
            <Link href="/web-tv">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la Web TV
            </Link>
          </Button>

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl mb-8">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary text-primary-foreground">{video.category}</Badge>
                <div className="flex items-center text-sm text-zinc-400">
                  <Clock className="h-4 w-4 mr-1" /> {video.duration}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-6 border-y border-zinc-800 py-6">
                <div className="flex items-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-white">{video.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {video.date}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white">
                  <Share2 className="h-4 w-4 mr-2" /> Partager la vidéo
                </Button>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-zinc-300 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-8">Vidéos similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedVideos.length > 0 ? (
             relatedVideos.map((v) => (
                <VideoCard key={v.id} {...v} />
              ))
          ) : (
             videos.slice(1, 4).map((v) => (
                <VideoCard key={v.id} {...v} />
              ))
          )}
        </div>
      </section>
    </div>
  );
}
