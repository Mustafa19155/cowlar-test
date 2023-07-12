FROM node:14
WORKDIR /

COPY package.json ./
RUN npm install --force

COPY . .

CMD ["npm", "start"]

