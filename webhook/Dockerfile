FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src /app/src
COPY .env /app/.env
ENV PORT=3001
EXPOSE 3001
CMD ["npm", "start"]