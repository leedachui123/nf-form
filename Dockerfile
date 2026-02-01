# 使用node环境构建Dist包
FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN zip -r dist.zip dist

# 使用nginx服务器发布Dist包
FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80