"use client";

import Link from "next/link";
import { Search, Menu, X, Play } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

    const navLinks = [
      { name: "Accueil", href: "/" },
      { name: "Actualités", href: "/actualites" },
      { name: "Web TV", href: "/web-tv", isLive: true },
      { name: "À Propos", href: "/about" },
      { name: "Contact", href: "/contact" },
    ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-tighter text-primary">GAM</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative transition-colors hover:text-primary py-2",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {link.isLive && (
                  <span className="absolute -top-1 -right-6 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                )}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button asChild className="hidden md:flex rounded-full px-6 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95">
             <Link href="/web-tv">Direct TV</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-lg border-l border-primary/10">
              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-2xl font-black tracking-tight transition-all hover:translate-x-2",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {link.name}
                      {link.isLive && <Play className="h-4 w-4 fill-accent text-accent animate-pulse" />}
                    </div>
                  </Link>
                ))}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <form action="/search" className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="search"
                      name="q"
                      placeholder="Rechercher..."
                      className="w-full rounded-2xl border bg-muted/50 pl-12 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </form>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-primary/10 p-8 animate-in fade-in slide-in-from-top-4 md:block hidden shadow-2xl">
          <div className="container mx-auto max-w-3xl">
            <form action="/search" className="relative flex items-center gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  autoFocus
                  type="search"
                  name="q"
                  placeholder="Que recherchez-vous aujourd'hui ?"
                  className="w-full rounded-2xl border bg-muted/50 pl-14 py-5 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button type="button" variant="outline" className="h-14 rounded-2xl px-8 font-bold border-primary/20 hover:bg-primary/5 transition-colors" onClick={() => setIsSearchOpen(false)}>
                Fermer
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

