'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa';

export function PWARegister() {
  useEffect(() => {
    // Enregistrer le Service Worker
    registerServiceWorker();
  }, []);

  return null;
}
