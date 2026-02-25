import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste simple d'IPs bloquées (à externaliser en production)
const BLOCKED_IPS: string[] = [];

// Rate limiting simple en mémoire (utilisez Redis en production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Max requests par fenêtre

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  // 1. Bloquer les IPs blacklistées
  if (BLOCKED_IPS.includes(ip)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Rate limiting simple
  const now = Date.now();
  const userRequests = requestCounts.get(ip);

  if (!userRequests || now > userRequests.resetTime) {
    // Nouvelle fenêtre
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
  } else {
    // Fenêtre existante
    userRequests.count++;

    if (userRequests.count > MAX_REQUESTS) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((userRequests.resetTime - now) / 1000).toString()
        }
      });
    }
  }

  // 3. Nettoyer les anciennes entrées (garbage collection)
  if (Math.random() < 0.01) { // 1% de chance à chaque requête
    for (const [key, value] of requestCounts.entries()) {
      if (now > value.resetTime) {
        requestCounts.delete(key);
      }
    }
  }

  // 4. Ajouter des headers de sécurité supplémentaires
  const response = NextResponse.next();
  
  // Headers déjà dans next.config.ts, mais on peut en ajouter de dynamiques ici
  response.headers.set('X-Request-ID', crypto.randomUUID());
  response.headers.set('X-Powered-By', 'GAM'); // Masquer Next.js

  return response;
}

// Configuration des routes où le middleware s'applique
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf:
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     * - fichiers publics (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons|splash).*)',
  ],
};
