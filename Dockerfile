# Use the official Node.js image as a base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ARG DB_NAME
ENV DB_NAME=$DB_NAME
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
ARG DB_USER
ENV DB_USER=$DB_USER

RUN echo DB_HOST

# Add a non-root user (recommended for security)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if needed, otherwise skip this step)
RUN npm run build

# Set the port the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

