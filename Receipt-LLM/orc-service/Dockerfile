FROM node:18-slim

# Install system dependencies needed by Tesseract.js
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    && apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
