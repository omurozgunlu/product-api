# Install node v16
FROM node:16

# Set the workdir /var/www/myapp
WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .

# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 3000 3000

# Generate build
# RUN npm run build

# Start the application
CMD ["npm", "run", "debug"]