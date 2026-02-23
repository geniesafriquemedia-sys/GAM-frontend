# =============================================================================
# GAM Frontend - Next.js Dockerfile
# Multi-stage build pour optimiser la taille de l'image
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base Node
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat

WORKDIR /app

# -----------------------------------------------------------------------------
# Stage 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps

# Copier les fichiers de dépendances
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./

# Installer les dépendances selon le gestionnaire de paquets détecté
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
    else echo "Lockfile not found." && exit 1; \
    fi

# -----------------------------------------------------------------------------
# Stage 3: Development
# -----------------------------------------------------------------------------
FROM base AS development

WORKDIR /app

# Copier les dépendances
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Variables d'environnement de développement
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Commande de développement
CMD ["npm", "run", "dev"]

# -----------------------------------------------------------------------------
# Stage 4: Builder - Build de production
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

# Copier les dépendances
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de l'application
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 5: Production Runner
# -----------------------------------------------------------------------------
FROM base AS production

WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Variables d'environnement de production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copier les fichiers de package
COPY --from=builder /app/package.json ./package.json

# Copier les node_modules nécessaires
COPY --from=builder /app/node_modules ./node_modules

# Copier les fichiers next.config
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copier les fichiers publics
COPY --from=builder /app/public ./public

# Copier le build complet de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Passer à l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Commande de production - Utiliser next start au lieu de server.js standalone
CMD ["npm", "start"]
