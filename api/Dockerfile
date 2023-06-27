FROM node:16-alpine

WORKDIR /app

COPY package.json ./api/

RUN cd api && yarn

COPY . ./api/

CMD ["node", "api/index.js"]
