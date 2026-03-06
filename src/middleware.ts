import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ajouter des headers de sécurité dynamiques
  // (les headers statiques sont déjà définis dans next.config.ts)
  const response = NextResponse.next();
  response.headers.set('X-Request-ID', crypto.randomUUID());
  response.headers.set('X-Powered-By', 'GAM');
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
