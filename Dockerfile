FROM node:16-alpine as builder

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

RUN yarn build 

# FROM node:16-alpine

# ENV NODE_ENV production

# WORKDIR /usr/src/app

# COPY --from=builder --chown=node:node /usr/src/app/package.json ./
# COPY --from=builder --chown=node:node /usr/src/app/yarn.lock ./
# COPY --from=builder --chown=node:node /usr/src/app/dist ./dist/
# COPY --from=builder --chown=node:node /usr/src/app/node_modules/ ./node_modules/
# COPY --from=builder --chown=node:node /usr/src/app/src/schemas/ ./dist/src/schemas/

CMD [ "node", "dist/src/main.js" ]