FROM node:14-alpine

WORKDIR /usr/app

# Copying like this will make it so RUN npm install is only
# run again if package.json is changed, not the rest of the files.
COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]