import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export function ArticleCard({ id, title, excerpt, category, date, image, readTime }: ArticleCardProps) {
  return (
    <article className="group flex flex-col space-y-3">
      <Link href={`/articles/${id}`} className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full font-semibold">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <Link href={`/articles/${id}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold leading-snug tracking-tight">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {readTime} de lecture
        </div>
      </div>
    </article>
  );
}
