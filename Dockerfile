FROM node
WORKDIR /app
COPY . .
EXPOSE 5173
CMD ["npm", "run", "preview"]