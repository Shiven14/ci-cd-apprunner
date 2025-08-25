FROM node:20-alpine
WORKDIR /usr/src/app

# Copy manifests
COPY package*.json ./

# Install deps (works with or without lockfile)
RUN npm install --omit=dev --no-audit --fund=false

# Copy the rest
COPY . .

EXPOSE 8080
CMD ["npm", "start"]

