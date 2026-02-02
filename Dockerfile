# 使用node环境构建Dist包
# 使用pnpm作为包管理工具
FROM node:22-alpine
WORKDIR /app
# 将项目中除node_modules外的所有文件复制到工作目录中
COPY . ./
# 全局安装pnpm，并使用pnpm安装依赖和构建项目
RUN npm install -g pnpm@10.15.0 --loglevel=error
RUN pnpm install --loglevel=error
RUN pnpm run build --loglevel=error

# 使用nginx服务器来发布Dist包
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

