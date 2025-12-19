import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
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
    <article className="group flex flex-col space-y-4">
      <Link href={`/articles/${id}`} className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-sm transition-all hover:shadow-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white text-black p-3 rounded-full shadow-2xl">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </Link>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="rounded-full px-3 py-0.5 font-bold uppercase tracking-wider text-[10px] bg-primary/10 text-primary border-none">
            {category}
          </Badge>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{date}</span>
        </div>
        <Link href={`/articles/${id}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl font-black leading-[1.2] tracking-tight line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 font-medium leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {readTime}
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4 cursor-pointer">
            Lire plus
          </div>
        </div>
      </div>
    </article>
  );
}

