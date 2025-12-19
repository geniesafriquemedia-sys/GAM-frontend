import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
  };
}

export function Hero({ article }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>
      
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl space-y-6">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
            {article.category}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="text-lg text-zinc-300 md:text-xl line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href={`/articles/${article.id}`}>
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
