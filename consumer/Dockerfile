# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install --production

# Copy the rest of the application
COPY . .

# Compile TypeScript
# RUN yarn build

# Expose necessary ports
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
