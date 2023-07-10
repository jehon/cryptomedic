#!/usr/bin/env bash

set -o errexit

LOG=/var/log/mysql_general.log

# Log this
# tail -n0 --retry -f "$LOG" | grep "$MYSQL_DATABASE" &

# Help: docker run -it --rm mysql:tag --verbose --help
# @see https://hub.docker.com/_/mysql
/usr/local/bin/docker-entrypoint.sh --general_log=1 --general_log_file="$LOG" "$@"
