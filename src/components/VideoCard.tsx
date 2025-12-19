import Link from "next/link";
import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoCardProps {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category?: string;
}

export function VideoCard({ id, title, duration, thumbnail, category }: VideoCardProps) {
  return (
    <div className="group relative flex flex-col gap-4">
      <Link href={`/web-tv/${id}`} className="relative aspect-video overflow-hidden rounded-[2rem] bg-zinc-900 shadow-xl transition-all hover:shadow-2xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
            <Play className="h-6 w-6 fill-white text-white translate-x-0.5 transition-colors group-hover:fill-primary-foreground group-hover:text-primary-foreground" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white">
          {duration}
        </div>
      </Link>
      <div className="space-y-2 px-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest px-3">
            {category || "Vidéo"}
          </Badge>
          <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">
             <Clock className="h-3 w-3 mr-1" />
             VOD
          </div>
        </div>
        <Link href={`/web-tv/${id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xl font-black leading-tight tracking-tight line-clamp-2">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}

