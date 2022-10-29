FROM node:latest 

EXPOSE 8000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
CMD ["npm", "start"] 
