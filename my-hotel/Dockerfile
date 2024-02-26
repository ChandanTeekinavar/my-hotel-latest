# Stage 1 - Build React application
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Serve static files using Nginx
FROM nginx:alpine

# Copy built static files from the previous stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 5000

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
