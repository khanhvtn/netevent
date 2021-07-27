FROM node:14 as build
WORKDIR /app/client
COPY client/package.json .
RUN npm install
COPY client .
RUN ["npm", "run", "build"]


WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=5000
ENV DEFAULT_HOST=https://net-event.herokuapp.com
COPY server/package.json .
RUN npm install
COPY server .
EXPOSE 5000
CMD ["npm", "start"]