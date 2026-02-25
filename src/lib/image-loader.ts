/**
 * Custom Image Loader pour Next.js
 * Optimise les images via Supabase/Cloudinary avec transformations
 */

import type { ImageLoaderProps } from 'next/image';

export function imageLoader({ src, width, quality = 75 }: ImageLoaderProps): string {
  // Si c'est une image locale ou externe sans CDN, retourner telle quelle
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }

  // Détection Supabase
  if (src.includes('supabase.co')) {
    // Supabase ne supporte pas nativement les transformations d'image
    // On peut utiliser un worker Cloudflare ou retourner l'URL directe
    return src;
  }

  // Détection Cloudinary
  if (src.includes('cloudinary.com')) {
    // Extraire la partie après /upload/
    const uploadIndex = src.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const baseUrl = src.substring(0, uploadIndex + 8);
      const imagePath = src.substring(uploadIndex + 8);
      
      // Transformations Cloudinary
      const transforms = [
        `w_${width}`,
        `q_${quality}`,
        'f_auto', // Format automatique (WebP/AVIF)
        'c_limit', // Ne pas upscaler
      ].join(',');
      
      return `${baseUrl}${transforms}/${imagePath}`;
    }
  }

  // Par défaut, retourner l'URL telle quelle
  return src;
}

// Export par défaut requis par Next.js
export default imageLoader;
