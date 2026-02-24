"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import type { Advertisement as Ad, AdPosition, AdType } from "@/types/advertising";

// ── Dimensions par type ───────────────────────────────────────────────────────

const AD_DIMENSIONS: Record<AdType, { width: number; height: number; className: string }> = {
  LEADERBOARD: { width: 970, height: 90, className: "w-full max-w-[970px] h-[90px]" },
  BANNER: { width: 728, height: 90, className: "w-full max-w-[728px] h-[90px]" },
  SIDEBAR: { width: 300, height: 250, className: "w-[300px] h-[250px]" },
  NATIVE: { width: 600, height: 200, className: "w-full h-auto" },
  IN_ARTICLE: { width: 728, height: 90, className: "w-full h-auto" },
  INTERSTITIEL: { width: 800, height: 600, className: "w-full max-w-[800px] h-auto" },
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface AdvertisementProps {
  position: AdPosition;
  className?: string;
  /** Pubs pré-chargées côté serveur (SSR). Si absent, chargement côté client. */
  initialAds?: Ad[];
}

// ── Composant ─────────────────────────────────────────────────────────────────

export function Advertisement({ position, className, initialAds }: AdvertisementProps) {
  const [ads, setAds] = useState<Ad[]>(initialAds ?? []);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackedImpressionRef = useRef<Set<number>>(new Set());

  // Chargement côté client si pas d'initialAds
  useEffect(() => {
    if (initialAds && initialAds.length > 0) return;
    api.advertising.getActiveAds(position).then(setAds).catch(() => setAds([]));
  }, [position, initialAds]);

  // Sélection aléatoire d'une pub dans la liste
  useEffect(() => {
    if (ads.length === 0) {
      setCurrentAd(null);
      return;
    }
    const picked = ads[Math.floor(Math.random() * ads.length)];
    setCurrentAd(picked);
  }, [ads]);

  // Impression tracking via IntersectionObserver
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && currentAd && !trackedImpressionRef.current.has(currentAd.id)) {
        trackedImpressionRef.current.add(currentAd.id);
        api.advertising.trackImpression(currentAd.id);
        setIsVisible(true);
      }
    },
    [currentAd]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !currentAd) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: "0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentAd, handleIntersection]);

  const handleClick = () => {
    if (currentAd) {
      api.advertising.trackClick(currentAd.id);
    }
  };

  if (!currentAd) return null;

  const dims = AD_DIMENSIONS[currentAd.ad_type];

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn("relative flex items-center justify-center", className)}
      >
        {/* Label publicité */}
        <span className="absolute top-1 right-2 z-10 text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest select-none pointer-events-none">
          Publicité
        </span>

        <a
          href={currentAd.external_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className={cn(
            "block relative overflow-hidden rounded-sm",
            dims.className
          )}
          aria-label={currentAd.alt_text || "Publicité"}
        >
          <Image
            src={currentAd.image_url}
            alt={currentAd.alt_text || "Publicité"}
            fill={currentAd.ad_type !== "IN_ARTICLE" && currentAd.ad_type !== "NATIVE"}
            width={currentAd.ad_type === "IN_ARTICLE" || currentAd.ad_type === "NATIVE" ? dims.width : undefined}
            height={currentAd.ad_type === "IN_ARTICLE" || currentAd.ad_type === "NATIVE" ? dims.height : undefined}
            className="object-cover w-full h-full"
            sizes={dims.className.includes("max-w-[970px]") ? "970px" : dims.className.includes("max-w-[728px]") ? "728px" : "300px"}
            priority={false}
          />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

export default Advertisement;
