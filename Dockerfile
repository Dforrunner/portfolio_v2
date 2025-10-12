# ========================================
# Base stage
# ========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true
ENV NODE_ENV=production

# ========================================
# Dependencies stage (all deps, dev + prod)
# ========================================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ========================================
# Builder stage
# ========================================
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app (production, minified)
RUN pnpm build

# ========================================
# Production dependencies stage
# ========================================
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# ========================================
# Runner stage (minimal production image)
# ========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache libc6-compat curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Copy only necessary files for production
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.* ./

RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=6s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start Next.js in production mode
CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3001"]