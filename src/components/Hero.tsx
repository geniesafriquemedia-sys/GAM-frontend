import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
    <section className="relative w-full overflow-hidden bg-background pt-6">
      <div className="container mx-auto px-4">
        <div className="relative min-h-[600px] w-full overflow-hidden rounded-[2.5rem] bg-foreground text-background shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent md:block hidden" />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider">
                  À la Une
                </Badge>
                <div className="flex items-center gap-2 text-secondary">
                  <Sparkles className="h-4 w-4 fill-secondary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">{article.category}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-black leading-[1.1] tracking-tighter md:text-6xl lg:text-8xl">
                {article.title}
              </h1>
              
              <p className="text-lg text-background/80 md:text-xl lg:text-2xl line-clamp-2 max-w-2xl font-medium">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  <Link href={`/articles/${article.id}`}>
                    Lire l'article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-10 h-16 text-lg font-bold bg-background/10 border-background/20 text-background backdrop-blur-md hover:bg-background/20 transition-all">
                  Plus tard
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 hidden lg:block">
            <div className="flex gap-2">
              <div className="h-2 w-12 rounded-full bg-primary" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

