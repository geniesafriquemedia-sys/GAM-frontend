import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Proxy API pour éviter les erreurs CORS en développement local
  // Uniquement actif si NEXT_PUBLIC_API_URL est une URL externe (pas relative)
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    // Ne créer le proxy que si l'URL est externe (commence par http)
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

export default nextConfig;
