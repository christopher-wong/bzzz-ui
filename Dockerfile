FROM node:12.16.1 AS builder

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

# final stage
FROM nginx:latest

COPY --from=builder /app/build/ /var/www
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENV NODE_ENV=production

CMD ["nginx", "-g", "daemon off;"]