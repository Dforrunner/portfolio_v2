# ========================================
# Base stage
# ========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true
ENV NODE_ENV=production
ENV PORT=3000

# ========================================
# Dependencies stage (all deps, dev + prod)
# ========================================
FROM base AS deps

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ========================================
# Builder stage
# ========================================
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Remove devDependencies
RUN pnpm prune --prod

# ========================================
# Runner stage
# ========================================
FROM node:22-alpine AS runner

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache libc6-compat curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy all build artifacts and node_modules
COPY --from=builder /app /app

# Ensure nextjs owns everything
RUN chown -R nextjs:nodejs /app

# Switch to non-root
USER nextjs

EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start Next.js server
CMD ["pnpm", "start", "-H", "0.0.0.0", "-p", "3001"]
