# stage build
FROM node:16.10.0-alpine3.14 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i

COPY . .

RUN npm run build

# stage setup
FROM nginx:1.21.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

ENTRYPOINT ["sh","/entryPoint.sh"]

CMD ["nginx", "-g", "daemon off;"]