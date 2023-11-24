FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src /app/src
COPY .env /app/.env
ENV PORT=8081
EXPOSE 8081
CMD ["npm", "start"]