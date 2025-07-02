FROM node:24-alpine

WORKDIR /workspaces/frontend

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000