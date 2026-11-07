FROM node:26

ENV TZ=Europe/Vienna

WORKDIR /usr/src/app

COPY apps/api/package*.json ./

RUN npm ci

COPY apps/api ./

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]