FROM node:22-alpine3.19
WORKDIR /usr/src/backend

COPY package*.json ./
# RUN npm install
RUN yarn

COPY . .
RUN yarn run build

EXPOSE 5000

CMD ["yarn", "run", "start-prod"]