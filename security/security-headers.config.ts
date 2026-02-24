/**
 * Security Headers Configuration for GAM Frontend
 * 
 * À intégrer dans next.config.ts
 */

export const securityHeaders: Array<{ key: string; value: string }> = [
  // Content Security Policy (CSP)
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.geniesdafriquemedia.com https://*.supabase.co https://www.google-analytics.com",
      "media-src 'self' https://www.youtube.com https://youtube.com",
      "frame-src 'self' https://www.youtube.com https://youtube.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  },
  
  // Prevent clickjacking attacks
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  
  // Enable XSS filter in older browsers
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  
  // Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  
  // Permissions policy (formerly Feature-Policy)
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=(self)',
      'interest-cohort=()'
    ].join(', ')
  },
  
  // Strict Transport Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  
  // Expect-CT (Certificate Transparency)
  {
    key: 'Expect-CT',
    value: 'max-age=86400, enforce'
  }
];

export default securityHeaders;
