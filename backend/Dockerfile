FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Non-root user
RUN addgroup -S ferrari && adduser -S ferrari -G ferrari
USER ferrari

EXPOSE 5000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
