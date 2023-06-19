# Set base container
FROM node:18.12.1-alpine as base


RUN apk add --no-cache libtool automake autoconf nasm build-base


# Dependencies stage
FROM base AS deps


WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./


RUN yarn install

# Build stage
FROM base AS builder
ARG ENV_FILE=.env.dev



WORKDIR /app
COPY . .

COPY ./$ENV_FILE .env



COPY --from=deps /app/node_modules ./node_modules
RUN yarn build
# Workaround part 1: Create empty files and folders to replicate the structure of the pages in the app
RUN find ./src/pages \( -type d -exec mkdir -p "/app/dummyPages/{}" \; -o -type f -exec touch "/app/dummyPages/{}" \; \)


# Run stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.env ./.env


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/i18n.json ./i18n.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/postcss.config.js ./postcss.config.js
# Workaround part 2: Copy the empty files and folders to the run environment so next-translate can figure out how the pages are laid out.
COPY --from=builder /app/dummyPages ./pages

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]