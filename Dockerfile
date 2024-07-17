# Use the official Node.js image with version 20.13.1 as the base image
FROM node:20.13.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the working directory
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on (if applicable)
EXPOSE 3000

# Define the command to run the application
CMD ["node", "index.js"]
