FROM node:12

WORKDIR /opt/jetdriver-api

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=443
ENV DEBUG=FALSE

EXPOSE 443
CMD [ "node", "src/app.js" ]