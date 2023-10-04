FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/dercraker.fr_private_key.key /etc/nginx/certs
COPY nginx/dercraker.fr_ssl_certificate.cer /etc/nginx/certs

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]