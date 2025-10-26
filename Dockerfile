FROM node:22-bookworm

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3000
CMD npm run dev
