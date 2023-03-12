#FROM node:14.20-alpine as build
FROM node:19.6.0-alpine as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.17.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/software /usr/share/nginx/html

