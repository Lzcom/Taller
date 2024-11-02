FROM node:18.18.0 

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install express swagger-jsdoc swagger-ui-express firebase-admin


EXPOSE 3000

CMD [ "npm","start"]
