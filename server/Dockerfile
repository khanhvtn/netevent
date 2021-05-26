FROM node:14
WORKDIR /app
COPY ./server/package.json .
ENV CONNECTION_URL_HOST=mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/netEvent?retryWrites=true&w=majority
RUN npm install
COPY ./server .
EXPOSE 5000
CMD ["npm", "run", "dev"]