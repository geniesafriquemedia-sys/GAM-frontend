/**
 * Rate Limiting Configuration
 * 
 * Configuration pour limiter les abus et attaques DDoS
 */

export const rateLimitConfig = {
  // Rate limit par IP
  perIP: {
    // Requêtes générales
    general: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Max 100 requêtes par fenêtre
      message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.'
    },
    
    // API endpoints
    api: {
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 20, // Max 20 requêtes API par minute
      message: 'Limite de requêtes API atteinte, veuillez patienter.'
    },
    
    // Formulaires (contact, newsletter)
    forms: {
      windowMs: 60 * 60 * 1000, // 1 heure
      max: 5, // Max 5 soumissions par heure
      message: 'Trop de soumissions de formulaire, veuillez réessayer dans 1 heure.'
    },
    
    // Recherche
    search: {
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 10, // Max 10 recherches par minute
      message: 'Trop de recherches, veuillez ralentir.'
    },
    
    // Authentification (si applicable)
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Max 5 tentatives de connexion
      message: 'Trop de tentatives de connexion, compte temporairement bloqué.'
    }
  },
  
  // Rate limit global (tous IPs confondus)
  global: {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Max 1000 requêtes/minute au total
    message: 'Le serveur est actuellement surchargé, veuillez réessayer.'
  },
  
  // Whitelist d'IPs (monitoring, admin, etc.)
  whitelist: [
    '127.0.0.1',
    '::1',
    // Ajoutez vos IPs de confiance ici
  ],
  
  // Blacklist d'IPs (à bannir automatiquement)
  blacklist: [
    // IPs connues pour être malveillantes
  ],
  
  // Store pour Redis (en production)
  store: {
    type: 'redis', // ou 'memory' pour dev
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD
  }
};

export default rateLimitConfig;
