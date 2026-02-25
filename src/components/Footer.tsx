"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="w-full border-t bg-background pt-24 pb-12" role="contentinfo">
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
            <div className="flex gap-4" role="list" aria-label="Réseaux sociaux">
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
                  aria-label={`Suivez-nous sur ${social.label}`}
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {/* Navigation Principale */}
            <nav aria-label="Navigation footer">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Navigation</h3>
              <ul className="space-y-4 font-bold">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors flex items-center group">
                    Accueil 
                    <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/actualites" className="hover:text-primary transition-colors flex items-center group">
                    Actualités
                    <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/web-tv" className="hover:text-primary transition-colors flex items-center group">
                    Web TV
                    <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/direct" className="hover:text-primary transition-colors flex items-center group">
                    Direct
                    <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-primary transition-colors flex items-center group">
                    Recherche
                    <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Rubriques */}
            <nav aria-label="Rubriques">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Rubriques</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/categories/economie-business" className="hover:text-primary transition-colors">Économie & Business</Link></li>
                <li><Link href="/categories/politique-societe" className="hover:text-primary transition-colors">Politique & Société</Link></li>
                <li><Link href="/categories/innovation-tech" className="hover:text-primary transition-colors">Innovation & Tech</Link></li>
                <li><Link href="/categories/culture-arts" className="hover:text-primary transition-colors">Culture & Arts</Link></li>
                <li><Link href="/categories/sport" className="hover:text-primary transition-colors">Sport</Link></li>
                <li><Link href="/categories" className="hover:text-primary transition-colors">Toutes les rubriques</Link></li>
              </ul>
            </nav>

            {/* À Propos */}
            <nav aria-label="À propos">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">À Propos</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/about" className="hover:text-primary transition-colors">Qui sommes-nous</Link></li>
                <li><Link href="/about#mission" className="hover:text-primary transition-colors">Notre mission</Link></li>
                <li><Link href="/about#team" className="hover:text-primary transition-colors">L'équipe</Link></li>
                <li><Link href="/partenariats" className="hover:text-primary transition-colors">Partenaires</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </nav>

            {/* Contact & Légal */}
            <nav aria-label="Contact et mentions légales">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Contact & Légal</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
                <li><Link href="/partenariats" className="hover:text-primary transition-colors">Devenir partenaire</Link></li>
                <li><Link href="/partenariats#advertise" className="hover:text-primary transition-colors">Annoncer</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
              </ul>
            </nav>
          </div>
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

