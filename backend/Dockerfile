FROM node:22-alpine3.19
WORKDIR /usr/src/backend

COPY package*.json ./
# RUN npm install
RUN yarn

COPY . .
EXPOSE 5000

CMD ["yarn", "run", "start-prod"];

# FROM node:22-alpine3.19
# WORKDIR /usr/src/app
# # Раскоментировать перед деплоем на линксе!
# # RUN apt-get update

# COPY package*.json ./
# # RUN npm install
# RUN yarn

# COPY . .
# EXPOSE 5000

# CMD ["yarn", "run", "start-prod"];



# FROM node:22-alpine3.19 as builder
# WORKDIR /app
# COPY package.json /app/package.json
# RUN apk --no-cache add --virtual builds-depth build-base python
# RUN yarn
# COPY . /app
# RUN yarn run build
# FROM node:12-alpine
# WORKDIR /app
# COPY --from=builder /app/dist /app
# COPY package.json /app/package.json
# RUN apk --no-cache add --virtual builds-depth build-base python
# RUN yarn --only=prod
# EXPOSE 5000
# USER node
# CMD ["node", "index.js"]