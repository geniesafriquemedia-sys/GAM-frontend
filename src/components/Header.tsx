"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search, Menu, X, Play, Globe, Cpu, Palette, Users, Flame,
  Facebook, Twitter, Instagram, Linkedin, ArrowRight,
  Briefcase, BookOpen, Film, Music, Camera, Heart, Star, Zap, TrendingUp,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useVideos, useTrendingTags, useCategories } from "@/hooks";
import type { Category } from "@/types";
import { InstallButton } from "@/components/InstallButton";

// ─── Icon mapping ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, any> = {
  globe: Globe,
  briefcase: Briefcase,
  cpu: Cpu,
  book: BookOpen,
  film: Film,
  music: Music,
  camera: Camera,
  heart: Heart,
  star: Star,
  zap: Zap,
  users: Users,
  trending: TrendingUp,
  culture: Palette,
  societe: Users,
  economie: Globe,
  sport: Flame,
  tech: Cpu,
};

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Actualités", href: "/actualites" },
  { name: "Web TV", href: "/web-tv" },
  { name: "À Propos", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// ─── Inline search bar ────────────────────────────────────────────────────────

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setValue("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    onClose();
    setValue("");
  };

  const handleTagClick = (tag: string) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-background/98 backdrop-blur-3xl border-b border-primary/10 shadow-2xl z-40 hidden md:block"
        >
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group flex items-center gap-4">
                <Search className="h-8 w-8 text-primary flex-shrink-0 transition-transform group-focus-within:scale-110" />
                <input
                  ref={inputRef}
                  type="search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Rechercher un sujet, un article, une vidéo..."
                  className="flex-1 bg-transparent border-b-4 border-primary/20 pb-3 text-4xl font-black tracking-tighter focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full flex-shrink-0"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Trending tags */}
              <div className="flex flex-wrap items-center gap-3 pl-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {tagsLoading ? "Chargement..." : "Tendances :"}
                </span>
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-primary hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile menu with slide animation ────────────────────────────────────────

interface MobileNavProps {
  navLinks: typeof NAV_LINKS;
  pathname: string;
  categories: Category[];
  categoriesLoading: boolean;
  getCategoryIcon: (name: string) => any;
}

function MobileNav({ navLinks, pathname, categories, categoriesLoading, getCategoryIcon }: MobileNavProps) {
  return (
    <SheetContent
      side="right"
      className="w-full sm:max-w-md p-0 bg-background overflow-hidden border-l border-primary/10 [&>button]:hidden"
    >
      <motion.div
        className="flex flex-col h-full relative"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* African pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-primary/5 bg-muted/20 relative z-10">
          <Image
            src="/images/logo.png"
            alt="Génies d'Afrique Media"
            width={280}
            height={93}
            className="h-16 w-auto object-contain"
          />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
          {/* Main nav links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <SheetClose asChild key={link.href}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-3xl font-black tracking-tight transition-all flex items-center justify-between group py-3 border-b border-primary/5",
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary hover:translate-x-2"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowRight
                      className={cn(
                        "h-6 w-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary",
                        pathname === link.href && "opacity-100 translate-x-0"
                      )}
                    />
                  </Link>
                </motion.div>
              </SheetClose>
            ))}
          </nav>

          {/* Categories */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground border-b border-primary/10 pb-2">
              Catégories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {categoriesLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-2xl bg-muted/30 animate-pulse" />
                  ))
                : categories.map((cat, i) => {
                    const Icon = getCategoryIcon(cat.icon || "globe");
                    return (
                      <SheetClose asChild key={cat.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.04 }}
                        >
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-primary hover:text-white transition-all duration-300 group"
                          >
                            <Icon className="h-4 w-4 text-primary group-hover:text-white" />
                            <span className="text-xs font-bold uppercase tracking-wider">{cat.name}</span>
                          </Link>
                        </motion.div>
                      </SheetClose>
                    );
                  })}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-secondary/20 p-6 border border-secondary/30">
            <div className="relative z-10 space-y-4">
              <h4 className="text-lg font-black tracking-tight leading-tight">
                Restez connecté à l'essentiel.
              </h4>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                Rejoignez notre newsletter pour recevoir les meilleures pépites africaines.
              </p>
              <SheetClose asChild>
                <Link
                  href="/#newsletter"
                  className="flex w-full items-center justify-center rounded-xl bg-foreground text-background font-bold text-xs uppercase tracking-widest py-3 hover:bg-primary transition-colors"
                >
                  S'abonner
                </Link>
              </SheetClose>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 mt-auto border-t border-primary/5 bg-muted/10 space-y-6">
          <div className="flex justify-center gap-4">
            {[
              { Icon: Facebook, href: "https://facebook.com/geniesdafriquemedia" },
              { Icon: Twitter, href: "https://x.com/geniesdafriquemedia" },
              { Icon: Instagram, href: "https://instagram.com/geniesdafriquemedia" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-90"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} GÉNIES D'AFRIQUE MEDIA. TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </motion.div>
    </SheetContent>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = top, 1 = shrunk
  const pathname = usePathname();

  // Live stream detection
  const { videos: liveVideos, isLoading: liveLoading } = useVideos({
    initialParams: { is_live: true, page_size: 1 },
  });
  const hasLiveVideo = liveVideos && liveVideos.length > 0;
  const showLiveStyle = liveLoading || hasLiveVideo;

  // Trending tags
  const { data: trendingTags, isLoading: tagsLoading } = useTrendingTags(5);
  const defaultTags = ["Actualités", "Technologie", "Culture", "Économie", "Sport"];
  const displayTags = trendingTags && trendingTags.length > 0 ? trendingTags : defaultTags;

  // Categories
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({ enabled: true });
  const categories = categoriesData || [];

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  // Sticky scroll behavior
  useEffect(() => {
    const SHRINK_START = 20;
    const SHRINK_END = 80;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SHRINK_START);
      const progress = Math.min(Math.max((y - SHRINK_START) / (SHRINK_END - SHRINK_START), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const getCategoryIcon = useCallback((iconName: string) => {
    return ICON_MAP[iconName.toLowerCase()] || Globe;
  }, []);

  // Interpolated header height: 8rem → 5rem
  const headerHeight = `${8 - scrollProgress * 3}rem`;
  // Logo size: h-28 → h-16
  const logoHeight = `${7 - scrollProgress * 3}rem`;

  return (
    <header
      style={{ height: headerHeight }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/5 shadow-lg shadow-primary/5"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Génies d'Afrique Media"
              width={400}
              height={133}
              style={{ height: logoHeight, width: "auto" }}
              className="object-contain transition-all duration-300 max-h-14 sm:max-h-16 md:max-h-20"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-1.5 transition-colors group",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                  {/* Animated underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                  {/* Active dot */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Install PWA button */}
          <InstallButton />
          
          {/* Search toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Rechercher"
            className={cn(
              "flex rounded-full transition-all",
              isSearchOpen
                ? "bg-primary text-white hover:bg-primary/90"
                : "hover:bg-primary/10 hover:text-primary"
            )}
            onClick={() => setIsSearchOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSearchOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="search"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Search className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Live / Direct button */}
          <Button
            asChild
            size="sm"
            className={cn(
              "flex rounded-full px-3 sm:px-6 lg:px-8 font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0",
              showLiveStyle
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}
          >
            <Link href="/direct" className="flex items-center gap-1 sm:gap-2">
              {showLiveStyle && (
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white" />
                </span>
              )}
              <span className="hidden xs:inline">{showLiveStyle ? "En Direct" : "Voir Direct"}</span>
              <span className="xs:hidden">📡</span>
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="rounded-full hover:bg-secondary/50 transition-all group"
              >
                <Menu className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Button>
            </SheetTrigger>
            <MobileNav
              navLinks={NAV_LINKS}
              pathname={pathname}
              categories={categories}
              categoriesLoading={categoriesLoading}
              getCategoryIcon={getCategoryIcon}
            />
          </Sheet>
        </div>
      </div>

      {/* Desktop search overlay (slides down from header) */}
      <HeaderSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        trendingTags={displayTags}
        tagsLoading={tagsLoading}
      />
    </header>
  );
}
