"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Bienvenue dans la communauté GAM !");
      setEmail("");
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-[3rem] bg-primary p-8 md:p-20 text-primary-foreground shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
          <Mail className="h-96 w-96" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              Ne manquez aucune <br /> pépite africaine.
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl font-medium max-w-md">
              Rejoignez 50,000+ lecteurs passionnés par l'innovation et la culture du continent.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                S'abonner maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="mt-4 text-[10px] text-center font-bold uppercase tracking-widest text-primary-foreground/40">
              Garanti sans spam. Désinscription en un clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

