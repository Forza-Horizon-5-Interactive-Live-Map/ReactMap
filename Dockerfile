FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/privkey.key /etc/nginx/ssl
COPY nginx/fullchain.cer /etc/nginx/ssl

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]