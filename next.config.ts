import type { NextConfig } from "next";
import path from "node:path";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
const loaderPath = require.resolve('orchids-visual-edits/loader.js');

const nextConfig: NextConfig = {
  // Output standalone pour Docker
  output: 'standalone',
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
    // Optimisation des tailles d'images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [loaderPath]
      }
    }
  },
  // Support pour les tunnels Cloudflare et dev origins
  allowedDevOrigins: [
    '*.orchids.page',
    '*.trycloudflare.com',
    '*.workers.dev',
    'gam-tunnel-front.geniesafriquemedia.workers.dev',
    'gam-tunnel-back.geniesafriquemedia.workers.dev',
  ],
  // Rewrites pour proxy API en mode tunnel (optionnel)
  async rewrites() {
    // En production ou via tunnel, utiliser le chemin relatif /api
    // qui sera intercepté par le Worker Cloudflare
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

    // Si l'API URL est relative (/api), pas besoin de rewrites
    if (backendUrl.startsWith('/')) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl.replace('/api/v1', '')}/:path*`,
      },
    ];
  },
} as NextConfig;

export default nextConfig;
// Orchids restart: 1766217744943
