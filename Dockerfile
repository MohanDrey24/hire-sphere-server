# Use Node.js 20 as the base image
FROM node:20-alpine as base

# Set working directory
WORKDIR /usr/src/app

# Copy package and package lock json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

FROM node:20-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Copy all files
COPY --chown=node:node . .

# Copy node_modules from base
COPY --from=base /usr/src/app/node_modules ./node_modules

# Generate prisma client
RUN npx prisma generate

# Build project
RUN npm run build

FROM node:20-alpine as runner

# Set working directory
WORKDIR /usr/src/app

# Copy necessary files 
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env .env
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/package-lock.json .

# Install dependencies except dev dependencies
RUN npm install --omit=dev

# Copy prisma client into the working directory's node_modules folder
COPY --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

# Make the port accessible
EXPOSE 4000

# Set production environmental variables 
ENV NODE_ENV production
ENV PORT 4000

# Run project
# ENTRYPOINT [ "node", "dist/src/main" ]
CMD ["npm", "run", "start:prod"]