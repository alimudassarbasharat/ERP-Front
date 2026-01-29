# ============================================
# Stage 1: Build (production-level)
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (include devDependencies for build: tailwindcss, vite, etc.)
COPY package.json package-lock.json* ./
RUN npm ci --include=dev || npm install --include=dev --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# ============================================
# Stage 2: Production serve
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built assets and Express server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Install only express (no cache on index.html = no build mismatch)
RUN npm init -y && npm install express

# Railway provides PORT at runtime
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
