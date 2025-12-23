/**
 * GAM Backend Proxy Worker
 * Route les requêtes vers le tunnel backend Django
 * Avec timeout étendu pour les opérations longues
 */

export interface Env {
  TUNNEL_URL: string;
}

// Fonction pour obtenir les headers CORS corrects
function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || 'https://gam-tunnel-front.geniesafriquemedia.workers.dev';

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-CSRFToken',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request);
    const tunnelUrl = env.TUNNEL_URL;

    if (!tunnelUrl) {
      return new Response(JSON.stringify({
        error: 'Backend tunnel not available',
        message: 'Please start the backend tunnel with cloudflared'
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      });
    }

    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, tunnelUrl);

    // Gestion CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Headers pour Django
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('X-Forwarded-Host', url.host);
    modifiedHeaders.set('X-Forwarded-Proto', 'https');
    modifiedHeaders.set('X-Real-IP', request.headers.get('CF-Connecting-IP') || '');

    // Supprimer le header Host original pour éviter les conflits
    modifiedHeaders.delete('Host');

    const modifiedRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers: modifiedHeaders,
      body: request.body,
      redirect: 'manual',
    });

    try {
      const response = await fetch(modifiedRequest, {
        cf: {
          // Timeout étendu pour les opérations longues (60 secondes)
          cacheTtl: 0,
          cacheEverything: false,
        }
      });

      // Ajouter les headers CORS à la réponse
      const responseHeaders = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Backend connection failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Ensure Django server is running on port 8000'
      }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      });
    }
  },
};
