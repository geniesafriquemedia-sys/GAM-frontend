"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { useSearch } from "@/hooks";
import type { SearchContentType } from "@/types";

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

// ─── Suggested categories for empty state ────────────────────────────────────

const SUGGESTED_CATEGORIES = [
  { name: "Actualités", href: "/actualites", icon: Newspaper, color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white" },
  { name: "Web TV", href: "/web-tv", icon: Tv, color: "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white" },
  { name: "Culture", href: "/categories/culture", icon: BookOpen, color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-white" },
  { name: "Technologie", href: "/categories/technologie", icon: TrendingUp, color: "bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white" },
  { name: "Économie", href: "/categories/economie", icon: TrendingUp, color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white" },
  { name: "Sport", href: "/categories/sport", icon: Folder, color: "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500 hover:text-white" },
];

// ─── Main page wrapper ────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

// ─── Search Input with debounce + suggestions ────────────────────────────────

interface SearchInputProps {
  initialValue: string;
  onSearch: (q: string) => void;
}

function SearchInput({ initialValue, onSearch }: SearchInputProps) {
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

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
          >
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

  const { results, activeType, isSearching, setType, search } = useSearch();

  // Run search when URL params change
  useEffect(() => {
    setType(type);
    if (q) search(q);
  }, [q, type]);

  const handleSearch = useCallback((query: string) => {
    search(query);
  }, [search]);

  const handleTypeChange = (newType: SearchContentType) => {
    setType(newType);
    const params = new URLSearchParams(window.location.search);
    params.set("type", newType);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const totalCount = results
    ? results.articles.length + results.videos.length + results.categories.length + results.authors.length
    : 0;

  const filterTypes: { value: SearchContentType; label: string; icon: React.ReactNode; count?: number }[] = [
    { value: "all", label: "Tout", icon: <SearchIcon className="h-4 w-4" />, count: totalCount },
    { value: "articles", label: "Articles", icon: <FileText className="h-4 w-4" />, count: results?.articles.length },
    { value: "videos", label: "Vidéos", icon: <Play className="h-4 w-4" />, count: results?.videos.length },
    { value: "categories", label: "Catégories", icon: <Folder className="h-4 w-4" />, count: results?.categories.length },
    { value: "authors", label: "Auteurs", icon: <User className="h-4 w-4" />, count: results?.authors.length },
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
        <SearchInput initialValue={q} onSearch={handleSearch} />

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
            className="py-20 space-y-16"
          >
            <div className="text-center space-y-6 bg-muted/30 rounded-3xl p-16">
              <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter">Que recherchez-vous ?</h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  Entrez un terme pour rechercher des articles, vidéos et auteurs sur GAM.
                </p>
              </div>
            </div>

            {/* Suggested categories */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Explorer nos rubriques
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SUGGESTED_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl font-bold text-sm transition-all duration-200 group ${cat.color}`}
                  >
                    <cat.icon className="h-6 w-6" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
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
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {author.photo ? (
                          <Image
                            src={author.photo}
                            alt={author.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <User className="h-8 w-8 text-primary/50" />
                        )}
                      </div>
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
            className="space-y-16"
          >
            <div className="py-24 text-center space-y-6 bg-muted/30 rounded-3xl">
              <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="h-10 w-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tighter">Aucun résultat trouvé</h2>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  Aucun résultat pour{" "}
                  <span className="font-bold text-foreground">&ldquo;{q}&rdquo;</span>.
                  Essayez avec d'autres mots-clés.
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

            {/* Suggested categories on no results */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                Essayez plutôt
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SUGGESTED_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl font-bold text-sm transition-all duration-200 ${cat.color}`}
                  >
                    <cat.icon className="h-6 w-6" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
