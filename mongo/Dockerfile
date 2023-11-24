FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src /app/src
COPY .env /app/.env
ENV PORT=3000 
EXPOSE 3000
CMD ["npm", "start"]