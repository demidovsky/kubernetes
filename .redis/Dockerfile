FROM redis

# RUN apt-get update && apt-get install -y curl lsb-release libhiredis0.10

COPY redis.conf /usr/local/etc/redis/redis.conf

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
