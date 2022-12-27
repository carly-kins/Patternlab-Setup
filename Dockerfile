FROM node:16
WORKDIR /app
ENV NODE_ENV=PRODUCTION
RUN npm install -g grunt-cli 
COPY package.json /app/package.json
RUN npm install
COPY . /app
CMD grunt dev