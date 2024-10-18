FROM node:20

WORKDIR /app
EXPOSE 3000

COPY . .

RUN yarn

CMD ["yarn", "dev"]
