FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run in dev mode with external access enabled
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
    