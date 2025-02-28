
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=optional && npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
