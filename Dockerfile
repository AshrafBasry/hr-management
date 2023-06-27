FROM node:16-alpine

WORKDIR /server

COPY package.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn; \
    else yarn --only=production; \
    fi

COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["yarn", "dev"]
