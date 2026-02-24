'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function PWASplashScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est en mode standalone (installée)
    const checkStandalone = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://')
      );
    };

    const standalone = checkStandalone();
    setIsStandalone(standalone);

    // Afficher le splash screen uniquement au premier chargement en mode PWA
    if (standalone) {
      const hasSeenSplash = sessionStorage.getItem('pwa-splash-seen');
      
      if (!hasSeenSplash) {
        setIsLoading(true);
        sessionStorage.setItem('pwa-splash-seen', 'true');
        
        // Masquer le splash screen après l'animation
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2500);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Ne rien afficher si pas en mode standalone ou déjà vu
  if (!isStandalone || !isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
        >
          {/* Animated background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Logo avec animations */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Cercles animés en arrière-plan */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-20 rounded-full bg-primary"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.3, 1], opacity: [0, 0.05, 0] }}
              transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-28 rounded-full bg-primary"
            />

            {/* Logo principal avec animation d'entrée */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.34, 1.56, 0.64, 1], // Bounce effect
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="GAM"
                  width={280}
                  height={93}
                  className="h-32 w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
              
              {/* Effet de brillance qui traverse le logo */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ transform: 'skewX(-20deg)' }}
              />
            </motion.div>

            {/* Texte animé */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center space-y-2"
            >
              <motion.h1 
                className="text-2xl font-black tracking-tight text-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Génies d&apos;Afrique Media
              </motion.h1>
              <motion.p 
                className="text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Révéler les talents, informer l&apos;Afrique
              </motion.p>
            </motion.div>

            {/* Barre de progression animée */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
              />
            </motion.div>

            {/* Points de chargement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </motion.div>
          </div>

          {/* Texte de copyright en bas */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 text-xs text-muted-foreground font-medium"
          >
            © {new Date().getFullYear()} GAM - Tous droits réservés
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
