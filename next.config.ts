import type { NextConfig } from "next";
import path from "node:path";

// Bundle analyzer - seulement en local
let withBundleAnalyzer = (config: NextConfig) => config;
try {
  if (process.env.ANALYZE === 'true') {
    withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
  }
} catch (e) {
  // Bundle analyzer pas disponible en production
}

// Security headers inline to avoid import issues in production
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.supabase.co https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.geniesdafriquemedia.com https://*.supabase.co https://www.google-analytics.com",
      "media-src 'self' https://www.youtube.com https://youtube.com",
      "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.geniesdafriquemedia.com https://api.geniesdafriquemedia.com/ https://geniesdafriquemedia.com", 
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
];

const nextConfig: NextConfig = {
  // Standalone output: only traces the files actually needed → much smaller Docker image
  output: 'standalone',
  // Trace from the project root only (not the monorepo root) to avoid scanning GAM-backend
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bsguzqvidhpelqrfetky.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.geniesdafriquemedia.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    // Optimisation activée avec loader custom pour Supabase/Cloudinary
    unoptimized: false,
    minimumCacheTTL: 3600, // 1 heure de cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    // Ignorer seulement en production Docker pour éviter les blocages
    ignoreBuildErrors: process.env.RAILWAY_ENVIRONMENT ? true : false,
  },
  eslint: {
    // Ignorer seulement en production Docker
    ignoreDuringBuilds: process.env.RAILWAY_ENVIRONMENT ? true : false,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Proxy API pour éviter les erreurs CORS en développement local
  // Uniquement en dev (NODE_ENV=development) pour éviter les boucles en production
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    if (!apiUrl.startsWith('http')) return [];
    const baseUrl = apiUrl.replace('/api/v1', '');
    return [
      {
        source: '/api/v1/:path*',
        destination: `${baseUrl}/api/v1/:path*`,
      },
    ];
  },
} as NextConfig;

export default withBundleAnalyzer(nextConfig);
