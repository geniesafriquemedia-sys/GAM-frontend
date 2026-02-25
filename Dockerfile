# =============================================================================
# GAM Frontend - Next.js Dockerfile (standalone output)
# Multi-stage build — production image contains only the standalone server
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base Node
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

# -----------------------------------------------------------------------------
# Stage 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps

# Copy lockfiles (package-lock.json or bun.lock)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lock* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    elif [ -f bun.lock ]; then npm install -g bun && bun install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# -----------------------------------------------------------------------------
# Stage 3: Builder — production build with standalone output
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# NEXT_PUBLIC_* vars must be available at build time (they are inlined by webpack)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MEDIA_URL=$NEXT_PUBLIC_MEDIA_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 4: Production runner — standalone only (~10x smaller than full image)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Standalone output bundles its own minimal node_modules subset — no need to
# copy the full node_modules from the builder stage.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Generous start-period: Next.js cold-start in Railway can take 30-60 s
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "server.js"]
