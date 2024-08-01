FROM node:22-alpine3.19 AS build-stage
WORKDIR /usr/src/frontend
# ENV VITE_SERVER_ENDPOINT=http://localhost:5000
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build-stage /usr/src/frontend/dist /usr/share/nginx/html
COPY --from=build-stage nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]