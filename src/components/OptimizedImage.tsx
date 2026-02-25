/**
 * Composant OptimizedImage - Wrapper autour de next/image avec optimisations
 * - Lazy loading par défaut
 * - Placeholder blur pour améliorer le CLS
 * - Gestion du CDN (Supabase/Cloudinary)
 */

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Activer le placeholder blur (nécessite blurDataURL) */
  enableBlur?: boolean;
  /** Fallback si l'image ne charge pas */
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  enableBlur = false,
  fallbackSrc = '/images/placeholder.png',
  className,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={handleLoadingComplete}
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      {...props}
    />
  );
}
