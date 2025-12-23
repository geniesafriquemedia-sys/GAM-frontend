"use client";

import Link from "next/link";
import { Search, Menu, X, Play, Globe, Cpu, Palette, Users, Flame, Facebook, Twitter, Instagram, Linkedin, ArrowRight, User, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useVideos, useTrendingTags } from "@/hooks";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Fetch live video to check if there's a live stream
  const { videos: liveVideos, isLoading: liveLoading } = useVideos({
    initialParams: { is_live: true, page_size: 1 }
  });
  const hasLiveVideo = liveVideos && liveVideos.length > 0;

  // Show live style while loading (optimistic) or when live video exists
  const showLiveStyle = liveLoading || hasLiveVideo;

  // Fetch trending tags from database
  const { data: trendingTags, isLoading: tagsLoading } = useTrendingTags(5);
  const defaultTags = ["Actualités", "Technologie", "Culture", "Économie", "Sport"];
  const displayTags = trendingTags && trendingTags.length > 0 ? trendingTags : defaultTags;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Actualités", href: "/actualites" },
    { name: "Direct", href: "/direct", isLive: showLiveStyle },
    { name: "Web TV", href: "/web-tv" },
    { name: "À Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    { name: "Technologie", href: "/categories/tech", icon: Cpu },
    { name: "Culture", href: "/categories/culture", icon: Palette },
    { name: "Société", href: "/categories/societe", icon: Users },
    { name: "Économie", href: "/categories/economie", icon: Globe },
    { name: "Sport", href: "/categories/sport", icon: Flame },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-xl border-b h-16 shadow-lg shadow-primary/5" : "bg-transparent h-20"
    )}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex flex-col items-start -space-y-1">
            <span className="text-3xl lg:text-4xl font-black tracking-tighter text-primary group-hover:scale-105 transition-transform origin-left">
              GAM
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
              Génies Afrique Médias
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative transition-all hover:text-primary py-2 group",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {link.isLive && (
                  <span className="absolute -top-1 -right-6 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                  </span>
                )}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex rounded-full hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
            <Button asChild className={cn(
              "hidden sm:flex rounded-full px-8 font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0",
              showLiveStyle
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}>
               <Link href="/direct" className="flex items-center gap-2">
                 {showLiveStyle && (
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                   </span>
                 )}
                 {showLiveStyle ? "En Direct" : "Voir le Direct"}
               </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="hidden lg:flex rounded-full hover:bg-primary/10 hover:text-primary transition-all">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>


          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 transition-all group">
                <Menu className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-background overflow-hidden border-l border-primary/10">
              <div className="flex flex-col h-full relative">
                {/* African Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                
                {/* Sidebar Header */}
                <div className="p-8 pb-4 flex items-center justify-between border-b border-primary/5 bg-muted/20 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter text-primary leading-none">GAM</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mt-1">Menu de Navigation</span>
                  </div>
                  <SheetClose className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-background transition-colors">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
                  {/* Main Nav */}
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-3xl font-black tracking-tight transition-all flex items-center justify-between group",
                            pathname === link.href ? "text-primary" : "text-foreground hover:text-primary hover:translate-x-2"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            {link.name}
                            {link.isLive && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
                          </div>
                          <ArrowRight className={cn(
                            "h-6 w-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary",
                            pathname === link.href && "opacity-100 translate-x-0"
                          )} />
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Categories */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground border-b border-primary/10 pb-2">
                      Catégories
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((cat) => (
                        <SheetClose asChild key={cat.href}>
                          <Link 
                            href={cat.href}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-primary hover:text-white transition-all duration-300 group"
                          >
                            <cat.icon className="h-4 w-4 text-primary group-hover:text-white" />
                            <span className="text-xs font-bold uppercase tracking-wider">{cat.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter / CTA */}
                  <div className="relative overflow-hidden rounded-3xl bg-secondary/20 p-6 border border-secondary/30">
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-lg font-black tracking-tight leading-tight">Restez connecté à l'essentiel.</h4>
                      <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                        Rejoignez notre newsletter pour recevoir les meilleures pépites africaines.
                      </p>
                      <Button className="w-full rounded-xl bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors">
                        S'abonner
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-8 mt-auto border-t border-primary/5 bg-muted/10 space-y-6">
                  <div className="flex justify-center gap-6">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                      <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-90">
                        <Icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-[0.2em]">
                    &copy; 2024 GAM MÉDIAS. TOUS DROITS RÉSERVÉS.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-background/98 backdrop-blur-3xl border-b border-primary/10 p-12 animate-in fade-in slide-in-from-top-4 md:block hidden shadow-2xl z-40">
          <div className="container mx-auto max-w-4xl relative">
             <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-6 -right-6 rounded-full"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <form action="/search" className="space-y-8">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-primary transition-transform group-focus-within:scale-110" />
                <input
                  autoFocus
                  type="search"
                  name="q"
                  placeholder="Rechercher un sujet, un article, une vidéo..."
                  className="w-full bg-transparent border-b-4 border-primary/20 pb-4 pl-14 text-4xl font-black tracking-tighter focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground self-center">
                  {tagsLoading ? "Chargement..." : "Tendances :"}
                </span>
                {displayTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-primary hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

