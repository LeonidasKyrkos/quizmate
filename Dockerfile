FROM node:12-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]

FROM node:12-alpine As production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile --prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]