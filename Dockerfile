FROM node:24-slim

# Set the working directory inside the container
WORKDIR /frontend


RUN apt-get update
RUN apt-get install -y git

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "dev"]