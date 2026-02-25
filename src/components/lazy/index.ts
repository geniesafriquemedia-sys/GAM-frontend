/**
 * Exports Lazy Loading pour composants lourds
 * Réduit le bundle initial et améliore le First Load JS
 * 
 * Note: Dans Next.js 15 App Router, utilisez dynamic() simplement
 * sans ssr: false pour les composants client
 */

import dynamic from 'next/dynamic';

// Composants Marketing/Engagement (non critiques pour le rendu initial)
export const Newsletter = dynamic(() => import('@/components/Newsletter').then(mod => ({ default: mod.Newsletter })));

export const AdvertisingShowcase = dynamic(() => import('@/components/AdvertisingShowcase').then(mod => ({ default: mod.AdvertisingShowcase })));

export const TendancesCarousel = dynamic(() => import('@/components/TendancesCarousel').then(mod => ({ default: mod.TendancesCarousel })));

// PWA Components (non critiques)
export const PWAInstallPrompt = dynamic(() => import('@/components/PWAInstallPrompt').then(mod => ({ default: mod.PWAInstallPrompt })));

export const InstallButton = dynamic(() => import('@/components/InstallButton').then(mod => ({ default: mod.InstallButton })));

// Composants interactifs (chargés à la demande)
export const ShareMenu = dynamic(() => import('@/components/ShareMenu').then(mod => ({ default: mod.ShareMenu })));

export const SocialShare = dynamic(() => import('@/components/SocialShare').then(mod => ({ default: mod.SocialShare })));
