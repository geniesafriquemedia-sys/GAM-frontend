import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MoveRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-5xl font-black tracking-tighter text-primary">GAM</span>
            </Link>
            <p className="text-xl font-medium text-muted-foreground leading-relaxed max-w-md">
              Génies Afrique Médias : Redéfinir la narration africaine à travers l'innovation, la culture et l'impact.
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
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Navigation</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/" className="hover:text-primary transition-colors flex items-center group">Accueil <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/actualites" className="hover:text-primary transition-colors flex items-center group">Actualités <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
                <li><Link href="/web-tv" className="hover:text-primary transition-colors flex items-center group">Web TV <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Catégories</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/categories/innovation-tech" className="hover:text-primary transition-colors">Innovation & Tech</Link></li>
                <li><Link href="/categories/culture-patrimoine" className="hover:text-primary transition-colors">Culture & Patrimoine</Link></li>
                <li><Link href="/categories/sport" className="hover:text-primary transition-colors">Sport</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Contact</h3>
              <ul className="space-y-4 font-bold">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Nous contacter</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
                <li><Link href="/partenariats" className="hover:text-primary transition-colors">Devenir partenaire</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} GAM MÉDIAS. TOUS DROITS RÉSERVÉS.
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

