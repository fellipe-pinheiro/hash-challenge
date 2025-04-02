FROM node:14.15.5-alpine3.10

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 8080

CMD [ "node", "./src/server.js" ]