FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 14734

CMD [ "npm", "start" ]