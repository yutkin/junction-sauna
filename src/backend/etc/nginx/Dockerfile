FROM nginx:latest

ARG CERT_PATH=/etc/letsencrypt/live/snek-gc.misha.im

COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl.conf /etc/nginx/ssl.conf


COPY fullchain.pem $CERT_PATH/fullchain.pem
COPY privkey.pem $CERT_PATH/privkey.pem

EXPOSE 80
ENV TZ Europe/Helsinki

RUN chmod +rwxrwxrwx $CERT_PATH/fullchain.pem
RUN chmod +rwxrwxrwx $CERT_PATH/privkey.pem