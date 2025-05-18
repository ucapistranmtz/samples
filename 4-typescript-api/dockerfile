# ----------- Stage 1: Build the application -----------
# Base image
FROM node:24-alpine AS first-stage-builder

# Set working directory
WORKDIR /app

# update/upgrade/ image packages
RUN apk update && apk upgrade --no-cache
  
# copy package.json and package-lock.json
COPY package.json package-lock.json ./

# install only production dependencies and only the ones that exist in package.json
RUN npm ci

COPY  . .

RUN npm run build
# ----------- Stage 2: Run the application -----------
FROM node:24-alpine AS second-stage-runner
# Set working directory
WORKDIR /app

# Copy package files and install production deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy only the compiled output from first-stage-builder
COPY --from=first-stage-builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node","dist/app.js"]