FROM node:14 as build
WORKDIR /app/client
COPY client/package.json .
RUN npm install
COPY client .
RUN ["npm", "run", "build"]


WORKDIR /app/server
ENV NODE_ENV=production
ENV CONNECTION_URL_HOST=mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV PORT=5000
COPY server/package.json .
RUN npm install
COPY server .
EXPOSE 5000
CMD ["npm", "start"]