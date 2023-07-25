FROM node:18.17.0-alpine3.18 as base

FROM base as builder

ARG MONGODB_URI PAYLOAD_PUBLIC_SERVER_URL PAYLOAD_SECRET PAYLOAD_CONFIG_PATH

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . ./

RUN yarn build

FROM base as runtime

ARG MONGODB_URI PAYLOAD_PUBLIC_SERVER_URL PAYLOAD_SECRET PAYLOAD_CONFIG_PATH
ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

ENV NODE_NO_WARNINGS=1

CMD ["node", "dist/server.js"]