'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    const checkStandalone = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone ||
        document.referrer.includes('android-app://')
      );
    };

    setIsStandalone(checkStandalone());

    // Écouter l'événement beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Toujours afficher le bouton sur mobile même sans beforeinstallprompt (pour iOS)
    const isMobile = /mobile|android|iphone|ipod|ipad/i.test(navigator.userAgent);
    if (isMobile && !checkStandalone()) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    
    if (!deferredPrompt && isIOS) {
      // Instructions pour iOS
      alert('Pour installer GAM sur iOS:\n\n1. Appuyez sur le bouton Partager (icône carré avec flèche)\n2. Faites défiler et appuyez sur "Sur l\'écran d\'accueil"\n3. Appuyez sur "Ajouter"');
      return;
    }

    if (!deferredPrompt) {
      alert('L\'installation n\'est pas disponible sur ce navigateur. Essayez Chrome ou Edge.');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        // App installée avec succès
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      // Erreur installation PWA
    }
  };

  // Ne pas afficher si déjà installé
  if (isStandalone || !isInstallable) {
    return null;
  }

  return (
    <Button
      onClick={handleInstall}
      size="sm"
      variant="outline"
      className="gap-2 hidden md:flex"
    >
      <Download className="w-4 h-4" />
      <span className="hidden lg:inline">Installer l'app</span>
    </Button>
  );
}
