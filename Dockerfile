FROM node:12
WORKDIR /usr/workspace/src/music_weather_api
COPY ./package.json .
RUN npm install --only=prod