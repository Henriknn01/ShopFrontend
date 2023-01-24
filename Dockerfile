FROM node:14-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/

RUN npm install && npm cache clean --force
RUN npm install yarn
RUN yarn install
RUN yarn build

COPY . .

ENV PATH ./node_modules/.bin/:$PATH