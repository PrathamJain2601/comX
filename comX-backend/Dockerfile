FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache openssl
RUN npm install

COPY . .

# Generate Prisma client so TS compilation works
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD sh -c "npx prisma generate && npx prisma migrate deploy && node dist/server.js"
