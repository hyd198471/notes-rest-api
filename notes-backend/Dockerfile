FROM node:22-alpine AS development
RUN npm install -g npm@10.3.0 
WORKDIR /app

COPY package*.json .

RUN npm ci

COPY .  .

CMD [ "npm", "run", "dev" ]

FROM node:22-alpine AS production
RUN npm install -g npm@10.3.0 
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY .  .
CMD [ "npm", "run", "prod" ]