'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { registerServiceWorker } from '@/lib/pwa';

export function PWARegister() {
  useEffect(() => {
    registerServiceWorker();

    // Écouter le message du SW quand une nouvelle version s'active
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'SW_UPDATED') return;
      toast('Nouvelle version disponible', {
        description: 'Rechargez pour profiter des dernières améliorations.',
        duration: Infinity,
        action: {
          label: 'Actualiser',
          onClick: () => window.location.reload(),
        },
      });
    };

    navigator.serviceWorker?.addEventListener('message', onMessage);
    return () => navigator.serviceWorker?.removeEventListener('message', onMessage);
  }, []);

  return null;
}
