# Use a Node.js image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (instead of package-lock.json)
COPY package.json .
COPY bun.lockb .

# Install dependencies using npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port from the environment variable or use 3000 as a default
EXPOSE ${PORT:-4000}

# Start the application using the host and port from .env
CMD ["npm", "start"]
