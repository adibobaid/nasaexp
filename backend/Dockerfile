# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"] 