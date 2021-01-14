FROM node:14-alpine as build

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn --production

RUN cp -r node_modules prod_node_modules

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-buster-slim as production

RUN yarn global add pm2

WORKDIR /api

COPY --from=build /api/dist ./dist
COPY --from=build /api/prod_node_modules ./node_modules

EXPOSE 3001

CMD pm2-runtime ./dist/server.js
