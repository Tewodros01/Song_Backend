# Use an official Node.js runtime as the base image
FROM node:20.10.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code to the working directory
COPY . .

# Compile TypeScript code to JavaScript
RUN yarn build

# Expose the port  app runs on
EXPOSE 3000

# Run the application
CMD ["node", "dist/server.js"]

