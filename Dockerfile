FROM node:16 AS builder

WORKDIR /build
COPY package*.json .
RUN npm ci
COPY ./ ./
RUN npm run build

FROM nginx:stable
COPY --from=builder /build/dist /usr/share/nginx/html/
EXPOSE 80
