FROM node:alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --only=production

COPY . .

CMD [ "npm", "start" ]

