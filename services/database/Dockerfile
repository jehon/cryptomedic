FROM mysql:9

ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=cryptomedic

# https://docs.docker.com/reference/dockerfile/#healthcheck
HEALTHCHECK \
	--interval=5s \
	--timeout=2s \
	--start-period=5s \
	--retries=10 \
	CMD mysql --database cryptomedic -e 'SELECT * FROM `settings` WHERE id = "structure_version";'

# For GitLab services
COPY initial/ /docker-entrypoint-initdb.d/

# For Gitlab Only
COPY --from=project www/maintenance/versions /versions
