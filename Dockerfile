# ============================================
# Stage 1: Build (production-level)
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (package-lock.json for reproducible build)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ============================================
# Stage 2: Production serve
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Install only serve for static hosting (lightweight)
RUN npm init -y && npm install serve

# Railway provides PORT at runtime
ENV PORT=3000
EXPOSE 3000

# Serve SPA (Railway sets PORT; serve listens on all interfaces by default)
CMD ["sh", "-c", "npx serve@latest -s dist -l ${PORT:-3000}"]
