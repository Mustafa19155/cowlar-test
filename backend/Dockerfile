FROM node:14

WORKDIR /

RUN npm install -g npm@7.10.0

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "start"]
