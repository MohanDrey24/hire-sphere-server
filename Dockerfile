FROM node:20-alpine AS builder

# Install pnpm and necessary build tools
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if you have one)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application's code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build your application
RUN pnpm run build

# Start a new stage for a smaller final image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy necessary files from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json

# Copy Prisma schema and generated client
COPY --from=builder /usr/src/app/prisma ./prisma

# Copy .env file
COPY .env .env

EXPOSE 4000

# Run Prisma migrations and start the application
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/main"]
