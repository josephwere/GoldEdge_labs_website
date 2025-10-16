FROM node:18-alpine
WORKDIR /app
COPY 1_Frontend/package*.json ./
RUN npm install
COPY 1_Frontend/ .
ENV CI=true
EXPOSE 3000
CMD ["npm", "start"]
