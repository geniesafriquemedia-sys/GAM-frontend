"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Left Side: Aesthetic Background */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop"
            alt="Register Background"
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-transparent" />
        </div>
        
        <Link href="/" className="relative z-10 text-3xl font-black tracking-tighter text-white flex items-center gap-2">
          GAM<span className="text-primary italic">.media</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-widest"
          >
            <Sparkles className="h-4 w-4" /> Rejoindre l'Équipe
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-black text-white leading-tight tracking-tighter"
          >
            Devenez un <br /> <span className="text-primary italic">Acteur</span> du média.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg max-w-md font-medium"
          >
            Créez votre compte contributeur et commencez à publier sur la plateforme de référence.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-white/40 text-xs font-bold uppercase tracking-widest">
          <span>© 2024 GAM MEDIA</span>
          <div className="h-px w-12 bg-white/20" />
          <span>INNOVATION & JOURNALISME</span>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter">Inscription.</h2>
            <p className="text-zinc-500 font-medium">Rejoignez l'élite éditoriale africaine.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Nom Complet</Label>
              <Input 
                id="fullName" 
                placeholder="Jean Dupont" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Email Professionnel</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="j.dupont@genieafrique.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white rounded-2xl h-14 px-6 focus:ring-primary focus:border-primary transition-all font-medium"
                required
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
                  Création...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  S'inscrire <UserPlus className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-6 border-t border-zinc-900 flex flex-col items-center gap-4">
            <p className="text-zinc-500 text-sm font-medium">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-white font-black hover:text-primary transition-colors">Se connecter</Link>
            </p>
            <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="h-3 w-3" /> Retour au site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
