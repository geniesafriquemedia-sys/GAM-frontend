"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Actualités", href: "/actualites" },
    { name: "Vidéos", href: "/web-tv" },
    { name: "Tech", href: "/categories/tech" },
    { name: "Société", href: "/categories/societe" },
    { name: "Culture", href: "/categories/culture" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-primary">GAM</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
             <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
             </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <form action="/search" className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      name="q"
                      placeholder="Rechercher..."
                      className="w-full rounded-md border bg-muted pl-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </form>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b p-4 animate-in fade-in slide-in-from-top-2 md:block hidden">
          <div className="container mx-auto max-w-2xl">
            <form action="/search" className="relative flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                type="search"
                name="q"
                placeholder="Rechercher un article, une vidéo..."
                className="w-full rounded-lg border bg-muted pl-10 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="button" variant="ghost" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                Fermer
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
