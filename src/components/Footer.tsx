"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSocialNetworks } from "@/hooks/api";
import { getSocialIcon, SOCIAL_FALLBACK } from "@/components/SocialIcons";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  const { data: apiNetworks } = useSocialNetworks();
  const socials = (apiNetworks && apiNetworks.length > 0) ? apiNetworks : SOCIAL_FALLBACK;

  return (
    <footer className="w-full border-t bg-background pt-24 pb-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" alt="Genies d'Afrique Media" width={600} height={200} className="h-40 sm:h-48 md:h-56 lg:h-64 w-auto object-contain" />
            </Link>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed max-w-md">
              Redefinir la narration africaine a travers l'innovation, la culture et l'impact.
            </p>
            <div className="flex gap-4 flex-wrap" role="list" aria-label="Reseaux sociaux">
              {socials.map((social) => {
                const Icon = getSocialIcon(social.network);
                return (
                  <Link key={social.network} href={social.url} target="_blank" rel="noopener noreferrer"
                        className="h-12 w-12 flex items-center justify-center rounded-full border border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all group"
                        aria-label={`Suivez-nous sur ${social.display_label}`}>
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            <nav aria-label="Navigation footer">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Navigation</h3>
              <ul className="space-y-4 font-bold">
                {[{href:"/",name:"Accueil"},{href:"/actualites",name:"Actualites"},{href:"/web-tv",name:"Web TV"},{href:"/direct",name:"Direct"},{href:"/search",name:"Recherche"}].map(l => (
                  <li key={l.href}><Link href={l.href} className="hover:text-primary transition-colors flex items-center group">{l.name}<MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Rubriques">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Rubriques</h3>
              <ul className="space-y-4 font-bold">
                {[["economie-business","Economie & Business"],["politique-societe","Politique & Societe"],["innovation-tech","Innovation & Tech"],["culture-arts","Culture & Arts"],["sport","Sport"]].map(([s,n]) => (
                  <li key={s}><Link href={`/categories/${s}`} className="hover:text-primary transition-colors">{n}</Link></li>
                ))}
                <li><Link href="/categories" className="hover:text-primary transition-colors">Toutes les rubriques</Link></li>
              </ul>
            </nav>
            <nav aria-label="A propos">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">A Propos</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/about" className="hover:text-primary transition-colors">Qui sommes-nous</Link></li>
                <li><Link href="/about#mission" className="hover:text-primary transition-colors">Notre mission</Link></li>
                <li><Link href="/about#team" className="hover:text-primary transition-colors">L'equipe</Link></li>
                <li><Link href="/partenariats" className="hover:text-primary transition-colors">Partenaires</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </nav>
            <nav aria-label="Contact et mentions legales">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Contact & Legal</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
                <li><Link href="/partenariats" className="hover:text-primary transition-colors">Devenir partenaire</Link></li>
                <li><Link href="/partenariats#advertise" className="hover:text-primary transition-colors">Annoncer</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions legales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialite</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            © {year ?? ''} GENIES D'AFRIQUE MEDIA. TOUS DROITS RESERVES.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Legales</Link>
            <Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialite</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
