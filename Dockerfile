# Use Node.js 20 as the base image
FROM node:20

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy pnpm-lock.yaml and package.json
COPY pnpm-lock.yaml* package.json ./

# Install dependencies
RUN pnpm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Copy the .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD npx prisma generate && pnpm run start:prod