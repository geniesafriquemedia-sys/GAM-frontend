'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <WifiOff className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Vous êtes hors ligne
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Vérifiez votre connexion internet pour accéder aux derniers contenus de GAM.
          Les pages que vous avez déjà visitées restent disponibles.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="default"
          >
            Réessayer
          </Button>
          
          <Button
            asChild
            variant="outline"
          >
            <Link href="/">
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Astuce:</strong> Installez l&apos;application GAM sur votre appareil pour accéder plus rapidement au contenu hors ligne.
          </p>
        </div>
      </div>
    </div>
  );
}
