# Use an official Node.js runtime as the base image
FROM node:14-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the remaining application files
COPY . .

# Build the production-ready frontend
RUN npm run build

# Use a lightweight web server as the base image for serving the static files
FROM nginx:1.21-alpine as production-stage

# Copy the built static files from the previous stage to the web server directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Set the command to start the web server
CMD ["nginx", "-g", "daemon off;"]
