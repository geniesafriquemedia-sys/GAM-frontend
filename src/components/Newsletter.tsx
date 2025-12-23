"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Sparkles, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { newsletterService, isValidEmail } from "@/lib/api/services/engagement.service";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    setIsLoading(true);

    try {
      await newsletterService.subscribe(email, "homepage");
      toast.success("Bienvenue dans la communauté GAM !");
      setEmail("");
    } catch (error: any) {
      if (error?.message?.includes("déjà inscrit")) {
        toast.info("Vous êtes déjà inscrit à notre newsletter !");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[4rem] bg-foreground p-10 md:p-24 text-background shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
      >
        {/* Decorative Background Icons */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.05] pointer-events-none">
          <Mail className="h-[40rem] w-[40rem] text-primary" />
        </div>
        <div className="absolute -bottom-24 -left-24 opacity-[0.05] pointer-events-none">
          <Send className="h-[30rem] w-[30rem] text-secondary" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles className="h-4 w-4 fill-primary" />
                <span>Communauté Exclusive</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                L'Afrique <br /> dans votre <br /><span className="text-primary italic">boîte mail</span>.
              </h2>
              <p className="text-background/60 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                Rejoignez notre communauté. Pas de bruit, juste des pépites soigneusement sélectionnées.
              </p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-background/40 ml-4">Adresse Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-background/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="votre@futur.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl pl-16 pr-6 py-6 text-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-20 rounded-3xl bg-primary text-primary-foreground hover:bg-primary/90 font-black text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    Rejoindre le mouvement
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

