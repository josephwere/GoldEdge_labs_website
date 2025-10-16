FROM node:18-alpine
WORKDIR /app
COPY 2_Backend/package*.json ./
RUN npm install
COPY 2_Backend/ .
ENV NODE_ENV=production
EXPOSE 10000
CMD ["node", "server.js"]
