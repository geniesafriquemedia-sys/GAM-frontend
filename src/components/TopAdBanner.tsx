"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import type { Advertisement } from "@/types/advertising";

export function TopAdBanner() {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    api.advertising
      .getActiveAds("HOMEPAGE_TOP")
      .then((ads) => {
        if (ads.length > 0) {
          // Rotation aléatoire si plusieurs pubs
          setAd(ads[Math.floor(Math.random() * ads.length)]);
        }
      })
      .catch(() => null);
  }, []);

  if (!ad || dismissed) return null;

  const handleClick = () => {
    api.advertising.trackClick(ad.id);
  };

  return (
    <div className="w-full bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="relative flex items-center justify-center px-10 py-2 max-w-screen-2xl mx-auto min-h-[60px] md:min-h-[90px]">

        {/* Label Publicité */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2
                         text-[9px] font-black uppercase tracking-[0.2em]
                         text-zinc-400 dark:text-zinc-600 select-none hidden sm:block">
          Pub
        </span>

        {/* L'annonce */}
        <a
          href={ad.external_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block relative w-full max-w-[970px] h-[60px] md:h-[90px]
                     overflow-hidden rounded-sm group"
          aria-label={ad.alt_text || "Publicité partenaire"}
        >
          {ad.image_url ? (
            <Image
              src={ad.image_url}
              alt={ad.alt_text || "Publicité"}
              fill
              sizes="(max-width: 768px) 100vw, 970px"
              className="object-contain transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
          ) : (
            /* Placeholder si pas d'image */
            <div className="w-full h-full flex items-center justify-center
                            bg-zinc-200 dark:bg-zinc-800 rounded-sm">
              <span className="text-zinc-400 dark:text-zinc-600 text-xs font-semibold">
                970 × 90
              </span>
            </div>
          )}
        </a>

        {/* Bouton fermer */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer la publicité"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     p-1 rounded-full text-zinc-400 dark:text-zinc-600
                     hover:text-zinc-700 dark:hover:text-zinc-300
                     hover:bg-zinc-200 dark:hover:bg-zinc-700
                     transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default TopAdBanner;
