import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">GAM</Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Génies Afrique Médias : Votre source d'information sur l'innovation, la culture et le développement en Afrique.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/actualites" className="hover:text-primary transition-colors">Actualités</Link></li>
              <li><Link href="/web-tv" className="hover:text-primary transition-colors">Web TV</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Catégories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/categories/tech" className="hover:text-primary transition-colors">Technologies</Link></li>
              <li><Link href="/categories/societe" className="hover:text-primary transition-colors">Société</Link></li>
              <li><Link href="/categories/culture" className="hover:text-primary transition-colors">Culture</Link></li>
              <li><Link href="/categories/education" className="hover:text-primary transition-colors">Éducation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-primary transition-colors">Politique de Confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Génies Afrique Médias (GAM). Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
