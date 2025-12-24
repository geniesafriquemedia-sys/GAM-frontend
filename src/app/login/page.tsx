"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";

// URL du dashboard Wagtail CMS (configuré sur /cms/ dans le backend)
const WAGTAIL_ADMIN_URL = process.env.NEXT_PUBLIC_WAGTAIL_URL || "http://localhost:8000/cms/";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Authentification via l'API
      await api.auth.login({ email, password });

      // Redirection vers le dashboard Wagtail Admin
      window.location.href = WAGTAIL_ADMIN_URL;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Identifiants incorrects";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden text-foreground">
      {/* Left Side: Aesthetic Background */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-primary/5">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop"
            alt="Admin Background"
            fill
            className="object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent" />
        </div>

        <Link href="/" className="relative z-10 text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
          GAM<span className="text-primary italic">.media</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest"
          >
            <ShieldCheck className="h-4 w-4" /> Espace Rédaction
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-black text-foreground leading-tight tracking-tighter"
          >
            Administrez <br /> le <span className="text-primary italic">Génie</span> Africain.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/60 text-lg max-w-md font-medium"
          >
            Gérez vos articles, publiez vos vidéos et propulsez le contenu qui compte pour le continent.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-muted-foreground text-xs font-bold uppercase tracking-widest">
          <span>© {new Date().getFullYear()} GAM MEDIA</span>
          <div className="h-px w-12 bg-border" />
          <span>PUISSANCE ÉDITORIALE</span>
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
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">Bienvenue.</h2>
            <p className="text-muted-foreground font-medium">Connectez-vous pour accéder à l'espace rédaction.</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted border-border text-foreground rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all font-medium"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                  Mot de passe
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted border-border text-foreground rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all"
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-2xl h-14 font-black text-lg bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Se connecter <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
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
