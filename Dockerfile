FROM node:16.10.0-alpine3.14 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d

COPY entrypoint.sh /
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]