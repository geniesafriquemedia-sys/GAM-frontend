"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Backend URL pour la connexion session
const getSessionLoginUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    return `${apiUrl}/auth/session/login/`;
  }
  // Fallback développement local
  return "http://localhost:8000/api/v1/auth/session/login/";
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [sessionLoginUrl, setSessionLoginUrl] = useState("");

  useEffect(() => {
    // Définir l'URL côté client
    setSessionLoginUrl(getSessionLoginUrl());
    
    // Vérifier les erreurs dans l'URL
    const errorParam = searchParams.get('error');
    if (errorParam === 'invalid_credentials') {
      setError('Email ou mot de passe incorrect');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      {/* Left Side: Logo en grand avec motifs africains */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-orange-500/5 to-primary/10">

        {/* Motif Kente en fond */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Crect x='0' y='0' width='20' height='20' fill='%231e3a5f'/%3E%3Crect x='20' y='0' width='20' height='20' fill='%23f59e0b'/%3E%3Crect x='40' y='0' width='20' height='20' fill='%231e3a5f'/%3E%3Crect x='0' y='20' width='20' height='20' fill='%23f59e0b'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%231e3a5f'/%3E%3Crect x='40' y='20' width='20' height='20' fill='%23f59e0b'/%3E%3Crect x='0' y='40' width='20' height='20' fill='%231e3a5f'/%3E%3Crect x='20' y='40' width='20' height='20' fill='%23f59e0b'/%3E%3Crect x='40' y='40' width='20' height='20' fill='%231e3a5f'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Cercles décoratifs animés */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] border border-orange-500/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] border-2 border-dashed border-primary/5 rounded-full"
        />

        {/* Symbole Adinkra - Gye Nyame (Suprématie de Dieu) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-16 left-16 text-primary"
        >
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40zm0 70c-16.5 0-30-13.5-30-30 0-10 5-19 13-25l-8-10c-10 8-17 21-17 35 0 25 20 45 45 45 14 0 27-7 35-17l-10-8c-6 8-15 13-25 13z"/>
          </svg>
        </motion.div>

        {/* Symbole Adinkra - Sankofa (Retour aux sources) */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.18, rotate: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute bottom-24 left-12 text-orange-500"
        >
          <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70 20c-15 0-25 10-25 25v10c0 5-5 10-10 10s-10-5-10-10V30h-10v25c0 12 10 20 20 20s20-8 20-20V45c0-10 5-15 15-15s15 5 15 15v25h10V45c0-15-10-25-25-25z"/>
            <circle cx="25" cy="20" r="10"/>
          </svg>
        </motion.div>

        {/* Symbole Adinkra - Dwennimmen (Force et humilité) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute top-24 right-16 text-primary"
        >
          <svg width="85" height="85" viewBox="0 0 100 100" fill="currentColor">
            <path d="M25 25c-8 0-15 7-15 15v20c0 8 7 15 15 15h10V55H25V45h10V25H25zm50 0h-10v20h10v10H65v20h10c8 0 15-7 15-15V40c0-8-7-15-15-15z"/>
            <rect x="40" y="40" width="20" height="20" rx="5"/>
          </svg>
        </motion.div>

        {/* Symbole - Étoile africaine */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-16 right-20 text-orange-500"
        >
          <svg width="70" height="70" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0L61 35h37l-30 22 11 35-29-21-29 21 11-35-30-22h37z"/>
          </svg>
        </motion.div>

        {/* Symbole - Losange africain */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.12, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute top-1/2 left-8 text-primary"
        >
          <svg width="50" height="50" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0L100 50L50 100L0 50z"/>
          </svg>
        </motion.div>

        {/* Symbole - Croix africaine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.12, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-1/2 right-8 text-orange-500"
        >
          <svg width="45" height="45" viewBox="0 0 100 100" fill="currentColor">
            <path d="M40 0h20v40h40v20H60v40H40V60H0V40h40z"/>
          </svg>
        </motion.div>

        {/* Points décoratifs */}
        <div className="absolute top-10 left-1/3 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
        <div className="absolute bottom-10 right-1/3 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="w-2 h-2 rounded-full bg-orange-500"
            />
          ))}
        </div>

        {/* Triangles décoratifs améliorés */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[200px] border-l-transparent border-t-[200px] border-t-primary/15" />
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[120px] border-l-transparent border-t-[120px] border-t-orange-500/10" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[200px] border-r-transparent border-b-[200px] border-b-orange-500/15" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[120px] border-r-transparent border-b-[120px] border-b-primary/10" />

        {/* Lignes décoratives améliorées */}
        <div className="absolute top-1/4 left-0 w-40 h-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute top-1/4 left-0 mt-3 w-24 h-0.5 bg-gradient-to-r from-orange-500/40 to-transparent" />
        <div className="absolute top-1/3 left-0 w-28 h-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-40 h-1 bg-gradient-to-l from-primary/40 to-transparent" />
        <div className="absolute bottom-1/4 right-0 mb-3 w-24 h-0.5 bg-gradient-to-l from-orange-500/40 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-28 h-1 bg-gradient-to-l from-orange-500/30 to-transparent" />

        {/* Logo géant centré */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="relative z-10 px-4"
        >
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Génies D'Afrique Media"
              width={1200}
              height={400}
              className="h-[500px] w-auto object-contain drop-shadow-2xl"
            />
          </Link>
        </motion.div>

        {/* Copyright en bas avec style */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-primary/40" />
            ))}
          </div>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} GÉNIES D'AFRIQUE MEDIA
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo pour mobile */}
          <div className="flex justify-center lg:hidden">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Génies D'Afrique Media"
                width={320}
                height={106}
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Titre et description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest"
            >
              <ShieldCheck className="h-4 w-4" /> Espace Rédaction
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-black text-foreground leading-tight tracking-tighter"
            >
              Administrez le <span className="text-primary italic">Génie</span> Africain.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground font-medium"
            >
              Gérez vos articles, publiez vos vidéos et propulsez le contenu qui compte pour le continent.
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form POST directement vers le backend pour créer la session */}
          <form action={sessionLoginUrl} method="POST" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                className="bg-muted border-border text-foreground rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="bg-muted border-border text-foreground rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-2xl h-14 font-black text-lg bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              <span className="flex items-center justify-center gap-2">
                Se connecter <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </form>

          <div className="pt-6 border-t border-border flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-sm font-medium text-center">
              Accès réservé aux administrateurs et rédacteurs de GAM.
            </p>
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="h-3 w-3" /> Retour au site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
