"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Globe, Zap, ExternalLink } from "lucide-react";
import type { Advertisement } from "@/types/advertising";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

// ── Stats audience GAM ─────────────────────────────────────────────────────────

const AUDIENCE_STATS = [
  { value: "2M+",   label: "Lecteurs / mois",  icon: Users },
  { value: "40+",   label: "Pays africains",    icon: Globe },
  { value: "85%",   label: "Engagement mobile", icon: Zap },
  { value: "4.2×",  label: "ROI moyen annonceurs", icon: TrendingUp },
];

// ── Carte d'une pub active ─────────────────────────────────────────────────────

function AdCard({ ad, index }: { ad: Advertisement; index: number }) {
  const handleClick = () => {
    api.advertising.trackClick(ad.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group relative"
    >
      <a
        href={ad.external_url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="block relative overflow-hidden rounded-2xl bg-white/5 border border-white/10
                   hover:border-white/30 transition-all duration-400 hover:-translate-y-1
                   hover:shadow-2xl hover:shadow-black/30"
      >
        {/* Image */}
        <div className="relative aspect-[16/7] overflow-hidden bg-white/8">
          {ad.image_url ? (
            <Image
              src={ad.image_url}
              alt={ad.alt_text || "Publicité partenaire"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-xs font-black uppercase tracking-widest">
                Votre marque ici
              </span>
            </div>
          )}
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
        </div>

        {/* Footer de la carte */}
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            Partenaire
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-white/50
                           group-hover:text-white/80 transition-colors">
            Voir <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

// ── CTA "Devenez partenaire" (quand pas de pubs) ──────────────────────────────

function PartnerCTA() {
  return (
    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Slot vide stylisé × 2 */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative aspect-[16/7] rounded-2xl border border-white/10
                     border-dashed overflow-hidden flex items-center justify-center
                     bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
        >
          <div className="text-center space-y-2 px-6">
            <div className="text-2xl font-black text-white/20 tracking-tighter">
              Votre publicité ici
            </div>
            <p className="text-xs text-white/30 font-medium">
              Espace publicitaire disponible — touchez 2M+ lecteurs africains
            </p>
          </div>
          {/* Corner badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/10
                          text-[9px] font-black uppercase tracking-widest text-white/40">
            Disponible
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────────────────────

interface AdvertisingShowcaseProps {
  /** Pubs pré-chargées SSR (toutes positions confondues) */
  initialAds?: Advertisement[];
}

export function AdvertisingShowcase({ initialAds = [] }: AdvertisingShowcaseProps) {
  const [ads, setAds] = useState<Advertisement[]>(initialAds);

  // Chargement client si pas de données SSR
  useEffect(() => {
    if (initialAds.length > 0) return;
    Promise.all([
      api.advertising.getActiveAds("HOMEPAGE_TOP"),
      api.advertising.getActiveAds("HOMEPAGE_MID"),
    ])
      .then(([top, mid]) => setAds([...top, ...mid]))
      .catch(() => setAds([]));
  }, []);

  // Dédoublonner par id
  const uniqueAds = ads.filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">

      {/* ── Fond décoratif ─────────────────────────────────────────────────── */}
      {/* Gradient radial centré */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900" />
        {/* Taches de couleur subtiles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full
                        bg-primary/10 blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full
                        bg-primary/8 blur-[120px] opacity-40" />
        {/* Pattern grille */}
        <div className="absolute inset-0 opacity-[0.025]"
             style={{
               backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                                 linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
               backgroundSize: "60px 60px",
             }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Header section ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-primary/15 border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                Partenaires & Publicité
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.88] text-white">
              Ils soutiennent<br />
              <span className="text-primary">l&apos;info africaine.</span>
            </h2>
            <p className="text-base text-white/50 font-medium leading-relaxed max-w-md">
              Nos partenaires contribuent au développement d&apos;un journalisme africain
              indépendant et de qualité.
            </p>
          </motion.div>

          {/* Stats audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {AUDIENCE_STATS.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/8
                           hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                    {label}
                  </span>
                </div>
                <div className="text-3xl font-black text-white tracking-tighter">{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Grille des pubs ─────────────────────────────────────────────── */}
        <div className={`grid gap-4 mb-12 ${
          uniqueAds.length >= 2
            ? "grid-cols-1 md:grid-cols-2"
            : uniqueAds.length === 1
              ? "grid-cols-1 max-w-2xl mx-auto"
              : "grid-cols-1"
        }`}>
          {uniqueAds.length > 0
            ? uniqueAds.slice(0, 4).map((ad, i) => (
                <AdCard key={ad.id} ad={ad} index={i} />
              ))
            : <PartnerCTA />
          }
        </div>

        {/* ── CTA annonceurs ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6
                     p-8 rounded-3xl border border-white/10 bg-white/[0.03]"
        >
          <div>
            <p className="text-lg font-black text-white tracking-tight">
              Votre marque, face au continent africain.
            </p>
            <p className="text-sm text-white/45 mt-1 font-medium">
              Formats leaderboard, sidebar, in-article, natif — tarifs sur demande.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full
                       bg-primary text-white text-sm font-black uppercase tracking-widest
                       hover:bg-primary/90 transition-all hover:-translate-y-px
                       shadow-xl shadow-primary/30 flex-shrink-0"
          >
            Devenez partenaire <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AdvertisingShowcase;
