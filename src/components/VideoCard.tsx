import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoCardProps {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

export function VideoCard({ id, title, duration, thumbnail }: VideoCardProps) {
  return (
    <div className="group relative flex flex-col space-y-3">
      <Link href={`/web-tv/${id}`} className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-primary-foreground fill-current ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {duration}
        </div>
      </Link>
      <Link href={`/web-tv/${id}`} className="group-hover:text-primary transition-colors">
        <h3 className="font-bold leading-snug line-clamp-2">
          {title}
        </h3>
      </Link>
    </div>
  );
}
