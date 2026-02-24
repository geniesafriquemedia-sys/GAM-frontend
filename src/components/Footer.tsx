"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="w-full border-t bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Génies d'Afrique Media"
                width={600}
                height={200}
                className="h-40 sm:h-48 md:h-56 lg:h-64 w-auto object-contain"
              />
            </Link>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed max-w-md">
              Redéfinir la narration africaine à travers l'innovation, la culture et l'impact.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "Youtube" },
                { icon: Linkedin, label: "Linkedin" },
              ].map((social) => (
                <Link 
                  key={social.label} 
                  href="#" 
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>
          
Tool call argument 'replace' pruned from message history.
        </div>
        
        <div className="mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            © {year ?? ''} GÉNIES D'AFRIQUE MEDIA. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Légales</Link>
            <Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

