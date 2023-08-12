FROM node:18-alpine

RUN apk update && apk add --no-cache python3 make g++ bash git # for bcrypt

# Working directory
WORKDIR /usr/src/app

# Copy both package.json AND package-lock.json
COPY package*.json ./

# Copy all resouces
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Set env for production after built
ENV NODE_ENV=production

# Start the server using build dist folder
CMD [ "node", "dist/main.js" ]