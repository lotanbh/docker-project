# this command starts from image that already node js installed in version 20;
FROM node:20-alpine AS builder

# sets  /app as the working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json first to take advantage of docker layer
COPY package*.json ./

# install all dependencies define in package.json
RUN npm install

# copy the entire project into the container
COPY . .

# build the project
FROM node:20-alpine
WORKDIR /app

# copy the built project from the builder stage
COPY --from=builder /app .

# install only production dependencies
RUN npm prune --production && npm cache clean --force

# change the ownership of the /app directory to the node user
RUN chown -R node:node /app

# switch to the node user
USER node

# inform docker that the app uses port 3000
EXPOSE 3000

# execute this command when the container starts
CMD ["node" , "app.js"]




