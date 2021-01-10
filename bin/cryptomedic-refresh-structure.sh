#!/usr/bin/env bash

set -e

SCRIPT_DIR="$( dirname "${BASH_SOURCE[0]}" )"
PRJ_DIR="$(dirname "$SCRIPT_DIR")"

if [ -z "$CRYPTOMEDIC_HTTP_HOST" ]; then
    echo "Deploying locally"
    CRYPTOMEDIC_HTTP_HOST="localhost:5080"
    CRYPTOMEDIC_DB_UPGRADE="$( php "$PRJ_DIR/config.php" "security.key" )"
fi

echo "* Upgrading database"
wget -O - --quiet --content-on-error "http://${CRYPTOMEDIC_HTTP_HOST}/maintenance/patch_db.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"

# Variable necessary for refresh.sh scripts
export CRYPTOMEDIC_HTTP_HOST

for E in "$PRJ_DIR"/www/api/*/bin/refresh.sh ; do
    if [ ! -f "$E" ]; then
        continue;
    fi
    echo "Found: $E"
    "$E"
done
