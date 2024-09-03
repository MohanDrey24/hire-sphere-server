# Use Node.js 20 as the base image
FROM node:20 as base

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY . .

COPY --from=base /usr/src/app/node_modules ./node_modules

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine as runner

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env .env
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev

COPY --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 4000
ENV NODE_ENV production
ENV PORT 4000

CMD ["node", "dist/src/main"]