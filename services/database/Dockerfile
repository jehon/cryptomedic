FROM mysql:8

ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=cryptomedic

HEALTHCHECK \
	--interval=5s \
	--timeout=2s \
	--start-period=5s \
	--retries=10 \
	CMD mysql --database cryptomedic -e 'SELECT * FROM `settings` WHERE id = "structure_version";'

ADD initial/ /docker-entrypoint-initdb.d/

# https://docs.docker.com/reference/dockerfile/#healthcheck
