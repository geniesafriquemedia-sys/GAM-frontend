"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search, Menu, X, Globe, Cpu, Palette, Users, Flame,
  Facebook, Twitter, Instagram, Linkedin, ArrowRight, ChevronDown,
  Briefcase, BookOpen, Film, Music, Camera, Heart, Star, Zap, TrendingUp,
  Radio,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useVideos, useTrendingTags, useCategories } from "@/hooks";
import type { Category } from "@/types";

// ─── Icon mapping ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  globe: Globe, briefcase: Briefcase, cpu: Cpu, book: BookOpen,
  film: Film, music: Music, camera: Camera, heart: Heart,
  star: Star, zap: Zap, users: Users, trending: TrendingUp,
  culture: Palette, societe: Users, economie: Globe, sport: Flame, tech: Cpu,
};

// ─── Nav structure ────────────────────────────────────────────────────────────

type NavLink = { type: "link"; name: string; href: string };
type NavMega = { type: "megamenu"; name: string };
type NavItem = NavLink | NavMega;

const NAV_ITEMS: NavItem[] = [
  { type: "link",      name: "Accueil",    href: "/" },
  { type: "link",      name: "Actualités", href: "/actualites" },
  { type: "megamenu",  name: "Rubriques" },
  { type: "link",      name: "Web TV",     href: "/web-tv" },
  { type: "link",      name: "À Propos",   href: "/about" },
  { type: "link",      name: "Contact",    href: "/contact" },
];

const MOBILE_NAV_LINKS = [
  { name: "Accueil",    href: "/" },
  { name: "Actualités", href: "/actualites" },
  { name: "Rubriques",  href: "/categories" },
  { name: "Web TV",     href: "/web-tv" },
  { name: "À Propos",   href: "/about" },
  { name: "Contact",    href: "/contact" },
];

// ─── Top bar ──────────────────────────────────────────────────────────────────
// Rendu en CSS pur (pas de Framer Motion) pour éviter le conflit de hauteur.

function TopBar() {
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    );
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-between px-8 py-1.5
                    text-[10px] font-semibold uppercase tracking-[0.18em]
                    text-muted-foreground border-b border-border/40 bg-muted/20">
      <span className="capitalize">{dateStr}</span>
      <div className="flex items-center gap-4">
        {[
          { Icon: Facebook,  href: "https://facebook.com/geniesdafriquemedia",  label: "Facebook" },
          { Icon: Twitter,   href: "https://x.com/geniesdafriquemedia",         label: "Twitter" },
          { Icon: Instagram, href: "https://instagram.com/geniesdafriquemedia", label: "Instagram" },
          { Icon: Linkedin,  href: "#",                                          label: "LinkedIn" },
        ].map(({ Icon, href, label }) => (
          <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} className="hover:text-primary transition-colors">
            <Icon className="h-3.5 w-3.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Search overlay ───────────────────────────────────────────────────────────

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
  trendingTags: string[];
  tagsLoading: boolean;
}

function HeaderSearch({ isOpen, onClose, trendingTags, tagsLoading }: HeaderSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else setValue("");
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    onClose();
    setValue("");
  };

  return (
    <>
      {/* Desktop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-desktop"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-background/98 backdrop-blur-3xl
                       border-b border-primary/10 shadow-2xl z-40 hidden md:block"
          >
            <div className="container mx-auto max-w-4xl px-4 py-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Search className="h-6 w-6 text-primary flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Rechercher un article, une vidéo, une rubrique…"
                    className="flex-1 bg-transparent border-b-2 border-primary/20 pb-3
                               text-3xl font-black tracking-tight focus:outline-none
                               focus:border-primary transition-colors
                               placeholder:text-muted-foreground/30"
                  />
                  <button type="button" onClick={onClose}
                          className="p-2 rounded-full hover:bg-muted transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-1">
                    {tagsLoading ? "…" : "Tendances :"}
                  </span>
                  {trendingTags.map((tag) => (
                    <button key={tag} type="button"
                            onClick={() => { router.push(`/search?q=${encodeURIComponent(tag)}`); onClose(); }}
                            className="px-3 py-1.5 rounded-full bg-muted hover:bg-primary
                                       hover:text-white text-[10px] font-black uppercase
                                       tracking-widest transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sheet — only opens when actually on mobile to avoid overlay on desktop */}
      <Sheet open={isOpen && isMobile} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="top" className="h-[80vh] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-black">Recherche</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-primary flex-shrink-0" />
              <input
                type="search" value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Rechercher…" autoFocus
                className="flex-1 bg-transparent border-b-2 border-primary/20 pb-2
                           text-xl font-bold focus:outline-none focus:border-primary
                           transition-colors placeholder:text-muted-foreground/40"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {tagsLoading ? "…" : "Tendances"}
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button key={tag} type="button"
                          onClick={() => { router.push(`/search?q=${encodeURIComponent(tag)}`); onClose(); }}
                          className="px-3 py-1.5 rounded-full bg-muted hover:bg-primary
                                     hover:text-white text-xs font-bold uppercase tracking-wide transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

// ─── Mega-menu ────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  categories: Category[];
  onClose: () => void;
  getCategoryIcon: (name: string) => React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

function MegaMenu({ categories, onClose, getCategoryIcon }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px]
                 bg-background border border-border rounded-2xl
                 shadow-2xl shadow-black/10 z-50 overflow-hidden"
    >
      <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
          Nos rubriques
        </span>
        <Link href="/categories" onClick={onClose}
              className="text-[10px] font-black uppercase tracking-widest text-primary
                         flex items-center gap-1 hover:gap-2 transition-all">
          Tout voir <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="p-3 grid grid-cols-2 gap-1">
        {categories.slice(0, 8).map((cat) => {
          const Icon = getCategoryIcon(cat.icon || "globe");
          return (
            <Link key={cat.id} href={`/categories/${cat.slug}`} onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl
                             hover:bg-muted/60 transition-colors group/item">
              <div className="flex-none w-9 h-9 rounded-xl flex items-center justify-center"
                   style={{ backgroundColor: cat.color ? `${cat.color}18` : "hsl(var(--primary)/0.1)" }}>
                <Icon className="h-4 w-4" style={{ color: cat.color || "hsl(var(--primary))" }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold block truncate">{cat.name}</span>
                {cat.articles_count > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    {cat.articles_count} article{cat.articles_count > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <ArrowRight className="h-3 w-3 opacity-0 group-hover/item:opacity-40 transition-opacity flex-none" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────

interface MobileNavProps {
  pathname: string;
  categories: Category[];
  categoriesLoading: boolean;
  getCategoryIcon: (name: string) => React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

function MobileNav({ pathname, categories, categoriesLoading, getCategoryIcon }: MobileNavProps) {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <SheetContent side="right"
                  className="w-full sm:max-w-sm p-0 bg-background overflow-hidden
                             border-l border-primary/10 [&>button]:hidden">
      <SheetHeader className="sr-only">
        <SheetTitle>Menu de navigation</SheetTitle>
        <SheetDescription>Menu principal du site GAM</SheetDescription>
      </SheetHeader>
      <motion.div className="flex flex-col h-full"
                  initial={{ x: 32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.26, ease: "easeOut" }}>

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-border/50">
          <Image src="/images/logo.png" alt="Génies d'Afrique Media"
                 width={200} height={67} className="h-10 w-auto object-contain" />
          <SheetClose asChild>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Nav links */}
          <nav className="px-3 py-3">
            {MOBILE_NAV_LINKS.map((link, i) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
              return (
                <SheetClose asChild key={link.href}>
                  <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.04 + i * 0.045, duration: 0.22 }}>
                    <Link href={link.href}
                          className={cn(
                            "flex items-center justify-between px-4 py-3.5 rounded-xl",
                            "text-[15px] font-bold tracking-tight transition-all",
                            isActive
                              ? "text-primary bg-primary/8"
                              : "text-foreground hover:text-primary hover:bg-muted/60"
                          )}>
                      <span>{link.name}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                </SheetClose>
              );
            })}
          </nav>

          <div className="mx-5 border-t border-border/40" />

          {/* Categories */}
          <div className="px-5 py-4 space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground px-1">
              Rubriques
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {categoriesLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-11 rounded-xl bg-muted/30 animate-pulse" />
                  ))
                : categories.slice(0, 8).map((cat, i) => {
                    const Icon = getCategoryIcon(cat.icon || "globe");
                    return (
                      <SheetClose asChild key={cat.id}>
                        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.22 + i * 0.035 }}>
                          <Link href={`/categories/${cat.slug}`}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                           hover:bg-muted/60 transition-colors">
                            <div className="flex-none w-6 h-6 rounded-lg flex items-center justify-center"
                                 style={{ backgroundColor: cat.color ? `${cat.color}18` : "hsl(var(--primary)/0.1)" }}>
                              <Icon className="h-3 w-3" style={{ color: cat.color || "hsl(var(--primary))" }} />
                            </div>
                            <span className="text-xs font-bold truncate">{cat.name}</span>
                          </Link>
                        </motion.div>
                      </SheetClose>
                    );
                  })}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mx-5 mb-4 p-4 rounded-2xl bg-primary/8 border border-primary/15">
            <p className="text-sm font-black mb-0.5">Restez informé.</p>
            <p className="text-xs text-muted-foreground mb-3 leading-snug">
              Newsletter GAM — les pépites africaines directement chez vous.
            </p>
            <SheetClose asChild>
              <Link href="/#newsletter"
                    className="flex items-center justify-center w-full py-2.5 rounded-xl
                               bg-primary text-white text-xs font-black uppercase tracking-widest
                               hover:bg-primary/90 transition-colors">
                S'abonner
              </Link>
            </SheetClose>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex gap-2.5">
            {[
              { Icon: Facebook,  href: "https://facebook.com/geniesdafriquemedia" },
              { Icon: Twitter,   href: "https://x.com/geniesdafriquemedia" },
              { Icon: Instagram, href: "https://instagram.com/geniesdafriquemedia" },
              { Icon: Linkedin,  href: "#" },
            ].map(({ Icon, href }, i) => (
              <Link key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="h-8 w-8 flex items-center justify-center rounded-full
                               border border-border hover:bg-primary hover:text-white
                               hover:border-primary transition-all">
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
            © {year ?? ""} GAM
          </p>
        </div>
      </motion.div>
    </SheetContent>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // scrolled = simple booléen, PAS de scrollProgress pour éviter le tremblement
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  // Live
  const { videos: liveVideos } = useVideos({ initialParams: { is_live: true, page_size: 1 } });
  const isLive = !!(liveVideos && liveVideos.length > 0);

  // Trending tags
  const { data: trendingTags, isLoading: tagsLoading } = useTrendingTags(5);
  const displayTags = (trendingTags && trendingTags.length > 0)
    ? trendingTags
    : ["Actualités", "Technologie", "Culture", "Économie", "Sport"];

  // Categories
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({ enabled: true });
  const categories = categoriesData || [];

  // Fermer tout au changement de route
  useEffect(() => {
    setIsSearchOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  // Scroll — un seul state booléen, avec seuil de 60px.
  // requestAnimationFrame pour regrouper les lectures DOM et éviter le thrashing.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsSearchOpen(false); setMegaMenuOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const getCategoryIcon = useCallback((iconName: string) => {
    return ICON_MAP[iconName.toLowerCase()] || Globe;
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 will-change-transform",
      scrolled
        ? "bg-background/96 backdrop-blur-2xl shadow-sm shadow-black/8 border-b border-border/60"
        : "bg-background/80 backdrop-blur-md"
    )}>

      {/* Top bar — CSS overflow + opacity, sans Framer Motion → zéro conflit */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
      )}>
        <TopBar />
      </div>

      {/* Barre principale — hauteur CSS pure, pas de style inline JS */}
      <div className={cn(
        "container mx-auto flex items-center justify-between px-4 lg:px-8 gap-6",
        "transition-all duration-300",
        scrolled ? "h-14 lg:h-16" : "h-20 lg:h-24"
      )}>

        {/* ── Logo : taille via classes CSS ── */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Génies d'Afrique Media"
            width={400}
            height={133}
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-8 lg:h-10" : "h-14 lg:h-20"
            )}
            priority
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            if (item.type === "megamenu") {
              return (
                <div key="rubriques" className="relative"
                     onMouseEnter={() => setMegaMenuOpen(true)}
                     onMouseLeave={() => setMegaMenuOpen(false)}>
                  <button className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg",
                    "text-[11px] font-black uppercase tracking-widest transition-all",
                    megaMenuOpen
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}>
                    {item.name}
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {megaMenuOpen && !categoriesLoading && categories.length > 0 && (
                      <MegaMenu
                        categories={categories}
                        onClose={() => setMegaMenuOpen(false)}
                        getCategoryIcon={getCategoryIcon}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all",
                      isActive
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Actions droite ── */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Recherche */}
          <button aria-label="Rechercher"
                  onClick={() => setIsSearchOpen((v) => !v)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                    isSearchOpen
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}>
            <AnimatePresence mode="wait" initial={false}>
              {isSearchOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.1 }}>
                    <X className="h-4 w-4" />
                  </motion.span>
                : <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.1 }}>
                    <Search className="h-4 w-4" />
                  </motion.span>
              }
            </AnimatePresence>
          </button>

          {/* En Direct */}
          <Link href="/direct" className={cn(
            "hidden sm:flex items-center gap-2 px-5 py-2 rounded-full",
            "text-[11px] font-black uppercase tracking-widest",
            "transition-all hover:-translate-y-px active:translate-y-0 shadow-lg",
            isLive
              ? "bg-red-500 text-white shadow-red-500/25 hover:bg-red-600"
              : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
          )}>
            {isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                En Direct
              </>
            ) : (
              <>
                <Radio className="h-3.5 w-3.5" />
                Direct
              </>
            )}
          </Link>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Menu"
                      className="flex h-9 w-9 items-center justify-center rounded-full
                                 hover:bg-muted transition-colors lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <MobileNav
              pathname={pathname}
              categories={categories}
              categoriesLoading={categoriesLoading}
              getCategoryIcon={getCategoryIcon}
            />
          </Sheet>
        </div>
      </div>

      {/* Search overlay */}
      <HeaderSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        trendingTags={displayTags}
        tagsLoading={tagsLoading}
      />
    </header>
  );
}
