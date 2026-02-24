'use client';

import { useEffect, useState } from 'react';
import { X, Download, Smartphone, Monitor, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    const isInStandaloneMode = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://')
      );
    };

    const standalone = isInStandaloneMode();
    setIsStandalone(standalone);

    // Détecter le type d'appareil
    const detectDeviceType = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      
      // Détection plus précise
      if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(userAgent)) {
        return 'mobile';
      }
      if (/tablet|ipad/i.test(userAgent) || (width >= 768 && width < 1024)) {
        return 'tablet';
      }
      return 'desktop';
    };

    setDeviceType(detectDeviceType());

    // Vérifier si déjà refusé récemment
    const hasDeclined = localStorage.getItem('pwa-install-declined');
    const declinedTime = hasDeclined ? parseInt(hasDeclined) : 0;
    const daysSinceDeclined = (Date.now() - declinedTime) / (1000 * 60 * 60 * 24);
    const shouldShow = !hasDeclined || daysSinceDeclined > 7;

    // Écouter l'événement beforeinstallprompt (Chrome/Edge Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      if (shouldShow && !standalone) {
        setTimeout(() => {
          console.log('PWA: Showing install prompt');
          setShowPrompt(true);
        }, 3000);
      }
    };

    // Pour iOS Safari et autres navigateurs qui ne supportent pas beforeinstallprompt
    const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if ((isIOS || isSafari) && !standalone && shouldShow) {
      // Afficher un prompt personnalisé pour iOS
      setTimeout(() => {
        console.log('PWA: Showing iOS-style prompt');
        setShowPrompt(true);
      }, 3000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Log pour debug
    console.log('PWA: Init', { standalone, isIOS, isSafari, shouldShow });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Pour iOS ou navigateurs sans support beforeinstallprompt
      console.log('PWA: No deferred prompt, showing manual instructions');
      setShowPrompt(false);
      // Vous pouvez afficher des instructions manuelles ici
      return;
    }

    try {
      // Afficher le prompt d'installation natif
      await deferredPrompt.prompt();

      // Attendre le choix de l'utilisateur
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('PWA installée avec succès');
      } else {
        console.log('Installation PWA refusée');
        localStorage.setItem('pwa-install-declined', Date.now().toString());
      }

      // Réinitialiser le prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('PWA: Error during installation', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-declined', Date.now().toString());
  };

  // Ne rien afficher si déjà installé
  if (isStandalone || !showPrompt) {
    return null;
  }
  
  // Vérifier si c'est iOS Safari (pas de support beforeinstallprompt)
  const isIOS = typeof window !== 'undefined' && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  const isInSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  const getDeviceMessage = () => {
    // Message spécial pour iOS
    if (isIOS && isInSafari) {
      return 'Appuyez sur le bouton Partager puis "Sur l\'écran d\'accueil" pour installer GAM !';
    }
    
    switch (deviceType) {
      case 'mobile':
        return 'Installez GAM sur votre téléphone pour un accès rapide et une expérience optimale !';
      case 'tablet':
        return 'Installez GAM sur votre tablette pour profiter d\'une navigation immersive !';
      default:
        return 'Installez GAM sur votre ordinateur pour un accès direct depuis votre bureau !';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md animate-in slide-in-from-bottom-4">
      <Card className="p-4 shadow-lg border-2">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
            {getDeviceIcon()}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm">
                Installer l&apos;application GAM
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-muted"
                onClick={handleDismiss}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {getDeviceMessage()}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleInstallClick}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Installer
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
              >
                Plus tard
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1">
                <span className="flex items-center gap-1">
                  ✓ Accès rapide
                </span>
                <span className="flex items-center gap-1">
                  ✓ Mode hors ligne
                </span>
                <span className="flex items-center gap-1">
                  ✓ Notifications
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
