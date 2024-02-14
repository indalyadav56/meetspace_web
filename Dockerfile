FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to avoid re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy over the rest of the app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]