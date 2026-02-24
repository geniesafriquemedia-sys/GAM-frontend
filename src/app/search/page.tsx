"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";
import {
  Search as SearchIcon,
  FileText,
  Play,
  User,
  Folder,
  Clock,
  X,
  TrendingUp,
  Newspaper,
  Tv,
  BookOpen,
  ArrowRight,
  Loader2,
  Hash,
} from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { useSearch, useTrendingTags, useCategories } from "@/hooks";
import type { SearchContentType, Category } from "@/types";
import type { TargetAndTransition } from "framer-motion";

// ─── Utility: highlight search term in text ──────────────────────────────────

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-primary rounded px-0.5 font-bold not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ─── localStorage recent searches ────────────────────────────────────────────

const STORAGE_KEY = "gam_recent_searches";
const MAX_RECENT = 8;

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  if (!query.trim()) return;
  const recent = getRecentSearches().filter((s) => s !== query);
  recent.unshift(query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function removeRecentSearch(query: string) {
  const recent = getRecentSearches().filter((s) => s !== query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
}

// ─── Better Loading Skeleton ──────────────────────────────────────────────────

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="space-y-4 animate-pulse">
        <div className="h-3 w-40 bg-muted rounded-full" />
        <div className="h-14 w-2/3 bg-muted rounded-2xl" />
        <div className="h-5 w-48 bg-muted rounded-full" />
      </div>
      <div className="h-16 bg-muted rounded-2xl animate-pulse" />
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-muted rounded-full animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3 animate-pulse">
            <div className="aspect-video bg-muted rounded-2xl" />
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Symboles africains SVG (Adinkra + motifs) ───────────────────────────────

// Gye Nyame : "Sauf Dieu" — symbole Adinkra de la suprématie divine
function SymbolGyeNyame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor">
      <ellipse cx="40" cy="40" rx="18" ry="10" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="40" cy="40" rx="10" ry="18" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="40" cy="40" r="5" />
      <path d="M40 22 C44 26 44 34 40 35 C36 34 36 26 40 22Z" />
      <path d="M40 58 C44 54 44 46 40 45 C36 46 36 54 40 58Z" />
      <path d="M22 40 C26 36 34 36 35 40 C34 44 26 44 22 40Z" />
      <path d="M58 40 C54 36 46 36 45 40 C46 44 54 44 58 40Z" />
    </svg>
  );
}

// Sankofa : "Revenir chercher ce qu'on a oublié" — oiseau regardant en arrière
function SymbolSankofa({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M40 55 C28 55 18 46 18 36 C18 26 28 18 40 22 C52 18 62 26 62 36 C62 46 52 55 40 55Z" />
      <path d="M40 55 L34 68 M40 55 L46 68" />
      <path d="M32 30 C35 27 38 27 40 30" />
      <circle cx="33" cy="32" r="2" fill="currentColor" />
      <path d="M40 22 C40 14 48 10 54 14" strokeLinecap="round" />
      <circle cx="56" cy="13" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Soleil africain stylisé — lumière et rayonnement
function SymbolSoleil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor">
      <circle cx="40" cy="40" r="12" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect
          key={i}
          x="38.5" y="10"
          width="3" height="10"
          rx="1.5"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <rect
          key={i}
          x="38.5" y="16"
          width="2" height="6"
          rx="1"
          transform={`rotate(${angle} 40 40)`}
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

// Motif Kente géométrique — tissu sacré du Ghana
function SymbolKente({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      {/* Grille de losanges */}
      {[20, 40, 60].map((cx) =>
        [20, 40, 60].map((cy) => (
          <polygon
            key={`${cx}-${cy}`}
            points={`${cx},${cy - 10} ${cx + 10},${cy} ${cx},${cy + 10} ${cx - 10},${cy}`}
            strokeWidth="1.5"
            opacity={cx === 40 && cy === 40 ? 1 : 0.4}
          />
        ))
      )}
      {/* Lignes de liaison */}
      <line x1="20" y1="20" x2="60" y2="20" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="40" x2="60" y2="40" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="60" x2="60" y2="60" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Étoile à 8 branches (croix du Sud + Orient) — navigation africaine
function SymbolEtoile({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor">
      {[0, 45, 90, 135].map((angle, i) => (
        <ellipse
          key={i}
          cx="40" cy="40"
          rx="20" ry="6"
          transform={`rotate(${angle} 40 40)`}
          opacity={i === 0 || i === 2 ? 1 : 0.65}
        />
      ))}
      <circle cx="40" cy="40" r="6" />
      <circle cx="40" cy="40" r="3" fill="white" />
    </svg>
  );
}

// Croissant & étoile — symbole panafricain nord
function SymbolCroissant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor">
      <path d="M40 15 C28 15 18 25 18 40 C18 55 28 65 40 65 C30 58 25 50 25 40 C25 30 30 22 40 15Z" />
      <polygon points="55,18 57,24 63,24 58,28 60,34 55,30 50,34 52,28 47,24 53,24" opacity="0.9" />
    </svg>
  );
}

// ─── Rubriques avec métadonnées visuelles riches ─────────────────────────────

// Type strict pour les animations Framer Motion
type CatAnim = TargetAndTransition;

const SUGGESTED_CATEGORIES: Array<{
  name: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
  Symbol: React.FC<{ className?: string }>;
  symbolLabel: string;
  symbolAnim: CatAnim;
}> = [
  {
    name: "Actualités",
    desc: "Le pouls de l'Afrique",
    href: "/actualites",           // route fixe ✓
    icon: Newspaper,
    gradient: "from-blue-600 to-blue-400",
    accent: "#3B82F6",
    Symbol: SymbolGyeNyame,
    symbolLabel: "Gye Nyame — Suprématie divine",
    symbolAnim: { rotate: [0, 360], transition: { duration: 20, repeat: Infinity, ease: "linear" as const } },
  },
  {
    name: "Web TV",
    desc: "Vidéos & reportages",
    href: "/web-tv",               // route fixe ✓
    icon: Tv,
    gradient: "from-red-600 to-rose-400",
    accent: "#EF4444",
    Symbol: SymbolSoleil,
    symbolLabel: "Soleil africain — Rayonnement",
    symbolAnim: { scale: [1, 1.15, 1], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } },
  },
  {
    name: "Culture",
    desc: "Arts, musique & société",
    href: "/search?q=culture",     // recherche garantie ✓
    icon: BookOpen,
    gradient: "from-purple-600 to-violet-400",
    accent: "#8B5CF6",
    Symbol: SymbolSankofa,
    symbolLabel: "Sankofa — Mémoire & héritage",
    symbolAnim: { rotate: [-8, 8, -8], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } },
  },
  {
    name: "Technologie",
    desc: "Innovation africaine",
    href: "/search?q=technologie", // recherche garantie ✓
    icon: TrendingUp,
    gradient: "from-emerald-600 to-green-400",
    accent: "#10B981",
    Symbol: SymbolEtoile,
    symbolLabel: "Étoile du Sud — Navigation & progrès",
    symbolAnim: { rotate: [0, 180, 360], transition: { duration: 8, repeat: Infinity, ease: "linear" as const } },
  },
  {
    name: "Économie",
    desc: "Marchés & finance",
    href: "/search?q=economie",    // recherche garantie ✓
    icon: TrendingUp,
    gradient: "from-orange-500 to-amber-400",
    accent: "#F97316",
    Symbol: SymbolKente,
    symbolLabel: "Kente — Richesse & royauté",
    symbolAnim: { opacity: [0.3, 1, 0.3], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const } },
  },
  {
    name: "Sport",
    desc: "Champions du continent",
    href: "/search?q=sport",       // recherche garantie ✓
    icon: Folder,
    gradient: "from-yellow-500 to-lime-400",
    accent: "#EAB308",
    Symbol: SymbolCroissant,
    symbolLabel: "Croissant & étoile — Unité panafricaine",
    symbolAnim: { y: [0, -8, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } },
  },
];

// ─── Composant carte rubrique ─────────────────────────────────────────────────

function CategoryCard({
  cat,
  index,
  large = false,
  className = "",
}: {
  cat: typeof SUGGESTED_CATEGORIES[0];
  index: number;
  large?: boolean;
  className?: string;
}) {
  const Icon = cat.icon;
  const { Symbol, symbolLabel, symbolAnim } = cat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        href={cat.href}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl w-full h-full p-5 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${cat.accent}12 0%, ${cat.accent}06 100%)`,
          border: `1px solid ${cat.accent}25`,
          minHeight: large ? "280px" : "130px",
        }}
      >
        {/* Fond coloré au hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl`} />

        {/* ── Symbole africain animé en arrière-plan ── */}
        <motion.div
          className="absolute -bottom-4 -right-4 pointer-events-none select-none"
          animate={symbolAnim}
          style={{ color: cat.accent }}
          aria-label={symbolLabel}
          title={symbolLabel}
        >
          <Symbol className="w-24 h-24 md:w-28 md:h-28 opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
        </motion.div>

        {/* Deuxième symbole plus petit, haut-gauche, pulsation douce */}
        <motion.div
          className="absolute top-3 left-3 pointer-events-none select-none"
          animate={{ opacity: [0.04, 0.09, 0.04], scale: [0.9, 1, 0.9], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } }}
          style={{ color: cat.accent }}
        >
          <Symbol className="w-10 h-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
        </motion.div>

        {/* Contenu */}
        <div className="relative z-10 flex flex-col h-full gap-4">
          {/* Icône rubrique + badge symbole */}
          <div className="flex items-start justify-between">
            <div
              className="h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
              style={{ backgroundColor: `${cat.accent}22` }}
            >
              <Icon className="h-5 w-5 transition-colors duration-300" style={{ color: cat.accent }} />
            </div>

            {/* Badge GAM discret */}
            <span
              className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
              style={{ backgroundColor: `${cat.accent}20`, color: cat.accent }}
            >
              GAM
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Texte */}
          <div className="space-y-1">
            <p className="font-black text-base md:text-lg leading-tight group-hover:text-white transition-colors duration-300">
              {cat.name}
            </p>
            <p className="text-xs font-medium text-muted-foreground group-hover:text-white/65 transition-colors duration-300 line-clamp-1">
              {cat.desc}
            </p>
            {/* Label symbole africain visible au hover sur grande carte */}
            {large && (
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-all duration-500 text-white line-clamp-1">
                ✦ {symbolLabel}
              </p>
            )}
          </div>

          {/* Flèche */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px flex-1 opacity-15 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: cat.accent }} />
            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 opacity-0 group-hover:opacity-100 text-white flex-shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Composant SuggestedCategories premium ────────────────────────────────────

function SuggestedCategoriesGrid({ title = "Explorer nos rubriques" }: { title?: string }) {
  // Charge les catégories réelles depuis l'API pour résoudre les slugs corrects
  const { data: apiCategories } = useCategories();

  /**
   * Résout l'URL d'une rubrique :
   * 1. Cherche dans les catégories de l'API une correspondance par nom (insensible à la casse)
   * 2. Si trouvé → /categories/{slug_réel}
   * 3. Sinon → /search?q={nom} (fallback garanti sans 404)
   */
  const resolveHref = (cat: typeof SUGGESTED_CATEGORIES[0], apiCats: Category[]): string => {
    // Routes fixes qui ne dépendent pas des catégories backend
    if (cat.href === "/actualites" || cat.href === "/web-tv") return cat.href;

    // Recherche par correspondance de nom dans l'API
    const match = apiCats.find((c) =>
      c.name.toLowerCase().includes(cat.name.toLowerCase()) ||
      cat.name.toLowerCase().includes(c.name.toLowerCase()) ||
      c.slug.toLowerCase().includes(cat.name.toLowerCase().replace(/[éè]/g, 'e').replace(/[à]/g, 'a'))
    );

    if (match) return `/categories/${match.slug}`;

    // Fallback : recherche par nom → toujours une page valide
    return `/search?q=${encodeURIComponent(cat.name)}`;
  };

  // Layout desktop : colonne gauche (grande carte) + colonne droite (2×2 + carte large)
  // Entièrement contrôlé avec flex pour éviter tout chevauchement CSS Grid
  const [hero, ...rest] = SUGGESTED_CATEGORIES; // hero = Actualités
  const small = rest.slice(0, 4);               // Web TV, Culture, Techno, Économie
  const wide = rest[4];                          // Sport

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Folder className="h-4 w-4 text-primary" />
          {title}
        </h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary/50">
          {SUGGESTED_CATEGORIES.length} rubriques
        </span>
      </div>

      {/* ── Mobile : stack simple ── */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {SUGGESTED_CATEGORIES.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            cat={{ ...cat, href: resolveHref(cat, apiCategories ?? []) }}
            index={i}
            className={i === 0 || i === 5 ? "col-span-2" : "col-span-1"}
          />
        ))}
      </div>

      {/* ── Desktop : layout manuel sans chevauchement ── */}
      <div className="hidden md:flex gap-4">
        {/* Colonne gauche : grande carte hero */}
        <div className="w-[38%] flex-shrink-0">
          <CategoryCard
            cat={{ ...hero, href: resolveHref(hero, apiCategories ?? []) }}
            index={0}
            large
            className="h-full"
          />
        </div>

        {/* Colonne droite : 2×2 petites cartes + carte large en bas */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Rangée du haut : 4 petites cartes */}
          <div className="grid grid-cols-4 gap-4 flex-1">
            {small.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                cat={{ ...cat, href: resolveHref(cat, apiCategories ?? []) }}
                index={i + 1}
                className="h-full"
              />
            ))}
          </div>
          {/* Rangée du bas : carte Sport pleine largeur */}
          {wide && (
            <div className="flex-shrink-0">
              <CategoryCard
                cat={{ ...wide, href: resolveHref(wide, apiCategories ?? []) }}
                index={5}
                className="h-[130px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TrendingTags : skeleton + liste ─────────────────────────────────────────

function TrendingTagsSection({
  tags,
  isLoading,
  onTagClick,
  title = "Tendances du moment",
}: {
  tags: string[];
  isLoading: boolean;
  onTagClick: (tag: string) => void;
  title?: string;
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-40 bg-muted rounded-full animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-muted rounded-full animate-pulse" style={{ width: `${60 + i * 12}px` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!tags || tags.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            onClick={() => onTagClick(tag)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-primary/8 text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 border border-primary/10 hover:border-transparent"
          >
            <Hash className="h-3 w-3" />
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Main page wrapper ────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

// ─── Search Input with debounce + suggestions + trending tags ────────────────

interface SearchInputProps {
  initialValue: string;
  onSearch: (q: string) => void;
  trendingTags?: string[];
}

function SearchInput({ initialValue, onSearch, trendingTags = [] }: SearchInputProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialValue);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Sync if URL param changes externally
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Debounce: update URL as user types
  const handleChange = (value: string) => {
    setInputValue(value);
    setHighlightedIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        const params = new URLSearchParams(window.location.search);
        params.set("q", value.trim());
        router.replace(`/search?${params.toString()}`, { scroll: false });
        onSearch(value.trim());
      } else if (value.trim() === "") {
        router.replace("/search", { scroll: false });
      }
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    saveRecentSearch(inputValue.trim());
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    const params = new URLSearchParams(window.location.search);
    params.set("q", inputValue.trim());
    router.push(`/search?${params.toString()}`);
    onSearch(inputValue.trim());
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    saveRecentSearch(suggestion);
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    const params = new URLSearchParams(window.location.search);
    params.set("q", suggestion);
    router.push(`/search?${params.toString()}`);
    onSearch(suggestion);
  };

  const handleRemoveRecent = (e: React.MouseEvent, suggestion: string) => {
    e.stopPropagation();
    removeRecentSearch(suggestion);
    setRecentSearches(getRecentSearches());
  };

  const filtered = recentSearches.filter((s) =>
    inputValue ? s.toLowerCase().includes(inputValue.toLowerCase()) : true
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = showSuggestions && filtered.length > 0;

  return (
    <div ref={containerRef} className="relative flex-1 group">
      <form onSubmit={handleSubmit}>
        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher des articles, vidéos, auteurs..."
          className="w-full rounded-2xl border bg-muted/50 pl-14 pr-14 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => { setInputValue(""); router.replace("/search", { scroll: false }); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </form>

      {/* Dropdown : recherches récentes + tags tendance si champ vide */}
      <AnimatePresence>
        {showSuggestions && (filtered.length > 0 || (!inputValue && trendingTags.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
          >
            {/* Recherches récentes */}
            {filtered.length > 0 && (
              <>
                <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Recherches récentes
                  </span>
                </div>
                {filtered.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors ${
                      index === highlightedIndex
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-sm">
                        <HighlightText text={suggestion} query={inputValue} />
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleRemoveRecent(e, suggestion)}
                      className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted-foreground/20 transition-colors flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <X className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </>
            )}

            {/* Tags tendance (uniquement si champ vide) */}
            {!inputValue && trendingTags.length > 0 && (
              <div className="px-4 py-3 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Tendances
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {trendingTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSuggestionClick(tag)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/8 text-primary hover:bg-primary hover:text-white transition-all border border-primary/10 hover:border-transparent"
                    >
                      <Hash className="h-2.5 w-2.5" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main search content ──────────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const type = (searchParams.get("type") as SearchContentType) || "all";

  const { results, allResults, activeType, isSearching, setType, search } = useSearch();

  // Prefetch des tags tendance dès le montage de la page — zéro requête supplémentaire
  // si l'utilisateur lance ensuite une recherche, car useTrendingTags a son propre cache
  const { data: trendingTagsData, isLoading: tagsLoading } = useTrendingTags(12);
  const trendingTags: string[] = trendingTagsData ?? [];

  // Chargement initial depuis l'URL — une seule fois, en passant query + type ensemble
  // pour éviter deux déclenchements séparés (setType puis search)
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      if (q) search(q, type);
      else setType(type);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Réagir aux changements de l'URL (navigation arrière/avant, lien externe)
  const prevQRef = useRef(q);
  const prevTypeRef = useRef(type);
  useEffect(() => {
    const qChanged = q !== prevQRef.current;
    const typeChanged = type !== prevTypeRef.current;
    prevQRef.current = q;
    prevTypeRef.current = type;

    if (qChanged && q) {
      // Nouvelle query → requête réseau (type mis à jour en même temps)
      search(q, type);
    } else if (typeChanged && !qChanged) {
      // Seulement le type a changé → filtrage client-side, pas de requête
      setType(type);
    }
  }, [q, type]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = useCallback((query: string) => {
    search(query, activeType);
  }, [search, activeType]);

  const handleTypeChange = (newType: SearchContentType) => {
    // Filtrage client-side immédiat
    setType(newType);
    const params = new URLSearchParams(window.location.search);
    params.set("type", newType);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  // Les compteurs utilisent allResults (tous types) pour rester stables
  // quand l'utilisateur change de filtre — pas de rechargement
  const totalCount = allResults
    ? allResults.articles.length + allResults.videos.length + allResults.categories.length + allResults.authors.length
    : 0;

  const filterTypes: { value: SearchContentType; label: string; icon: React.ReactNode; count?: number }[] = [
    { value: "all", label: "Tout", icon: <SearchIcon className="h-4 w-4" />, count: totalCount },
    { value: "articles", label: "Articles", icon: <FileText className="h-4 w-4" />, count: allResults?.articles.length },
    { value: "videos", label: "Vidéos", icon: <Play className="h-4 w-4" />, count: allResults?.videos.length },
    { value: "categories", label: "Catégories", icon: <Folder className="h-4 w-4" />, count: allResults?.categories.length },
    { value: "authors", label: "Auteurs", icon: <User className="h-4 w-4" />, count: allResults?.authors.length },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
          <SearchIcon className="h-4 w-4" />
          <span>Résultats de recherche</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
          {q ? (
            <>
              Résultats pour{" "}
              <span className="text-primary italic">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Rechercher sur GAM"
          )}
        </h1>
        {q && (
          <div className="flex items-center gap-3">
            {isSearching ? (
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Recherche en cours...</span>
              </div>
            ) : results ? (
              <p className="text-xl text-muted-foreground font-medium">
                <span className="text-foreground font-black">{totalCount}</span> résultat{totalCount !== 1 ? "s" : ""} trouvé{totalCount !== 1 ? "s" : ""}
              </p>
            ) : null}
          </div>
        )}
      </motion.header>

      {/* Search Bar & Filters */}
      <div className="flex flex-col gap-6 border-y py-8">
        <SearchInput initialValue={q} onSearch={handleSearch} trendingTags={trendingTags} />

        {/* Type Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterTypes.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleTypeChange(filter.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeType === filter.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {filter.icon}
              {filter.label}
              {results && filter.count !== undefined && filter.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
                  activeType === filter.value ? "bg-white/20" : "bg-primary/10 text-primary"
                }`}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {!q ? (
          // ── Empty state – no query ──
          <motion.div
            key="no-query"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 space-y-14"
          >
            {/* Hero invite */}
            <div className="text-center space-y-6 bg-gradient-to-br from-primary/5 via-muted/30 to-muted/10 rounded-3xl p-14 border border-primary/10">
              <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/10">
                <SearchIcon className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter">Que recherchez-vous ?</h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  Explorez des articles, vidéos et auteurs sur l'Afrique et ses enjeux.
                </p>
              </div>
            </div>

            {/* Tags tendance depuis l'API */}
            <TrendingTagsSection
              tags={trendingTags}
              isLoading={tagsLoading}
              onTagClick={(tag) => {
                const params = new URLSearchParams({ q: tag });
                router.push(`/search?${params.toString()}`);
                search(tag, activeType);
              }}
            />

            {/* Rubriques premium */}
            <SuggestedCategoriesGrid />
          </motion.div>
        ) : isSearching ? (
          // ── Loading skeleton ──
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="aspect-video bg-muted rounded-2xl" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
                <div className="h-3 w-2/3 bg-muted rounded" />
              </div>
            ))}
          </motion.div>
        ) : results && totalCount > 0 ? (
          // ── Results ──
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-16"
          >
            {/* Articles */}
            {results.articles.length > 0 && (activeType === "all" || activeType === "articles") && (
              <section>
                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  Articles{" "}
                  <span className="text-base font-medium text-muted-foreground">
                    ({results.articles.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {results.videos.length > 0 && (activeType === "all" || activeType === "videos") && (
              <section>
                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                  <Play className="h-6 w-6 text-primary" />
                  Vidéos{" "}
                  <span className="text-base font-medium text-muted-foreground">
                    ({results.videos.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </section>
            )}

            {/* Categories */}
            {results.categories.length > 0 && (activeType === "all" || activeType === "categories") && (
              <section>
                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                  <Folder className="h-6 w-6 text-primary" />
                  Catégories{" "}
                  <span className="text-base font-medium text-muted-foreground">
                    ({results.categories.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all group hover:shadow-md"
                    >
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold group-hover:text-primary transition-colors truncate">
                          <HighlightText text={category.name} query={q} />
                        </h3>
                        <p className="text-sm text-muted-foreground">{category.articles_count} articles</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Authors */}
            {results.authors.length > 0 && (activeType === "all" || activeType === "authors") && (
              <section>
                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  Auteurs{" "}
                  <span className="text-base font-medium text-muted-foreground">
                    ({results.authors.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.authors.map((author) => (
                    <Link
                      key={author.id}
                      href={`/auteurs/${author.slug}`}
                      className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all group hover:shadow-md"
                    >
                      <AuthorAvatar photo={author.photo} name={author.name} size="md" className="h-16 w-16" />
                      <div className="min-w-0">
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          <HighlightText text={author.name} query={q} />
                        </h3>
                        <p className="text-sm text-muted-foreground">{author.articles_count} articles</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : results && totalCount === 0 ? (
          // ── No results ──
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <div className="py-16 text-center space-y-6 bg-muted/30 rounded-3xl border border-border/50">
              <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="h-10 w-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tighter">Aucun résultat trouvé</h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  Aucun résultat pour{" "}
                  <span className="font-bold text-foreground">&ldquo;{q}&rdquo;</span>.
                  Essayez l'un des termes populaires ci-dessous.
                </p>
              </div>
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
              >
                Voir les actualités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Tags tendance dynamiques depuis l'API */}
            <TrendingTagsSection
              tags={trendingTags}
              isLoading={tagsLoading}
              onTagClick={(tag) => {
                const params = new URLSearchParams({ q: tag });
                router.push(`/search?${params.toString()}`);
                search(tag, activeType);
              }}
              title="Essayez ces termes populaires"
            />

            {/* Rubriques premium */}
            <SuggestedCategoriesGrid title="Essayez plutôt" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
