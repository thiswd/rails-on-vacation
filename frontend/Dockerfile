FROM node:18-alpine AS vacation-on-react

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
