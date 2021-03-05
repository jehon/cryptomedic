#!/usr/bin/env bash

set -e

cr-ensure-started

SCRIPT_DIR="$( dirname "${BASH_SOURCE[0]}" )"
PRJ_DIR="$(dirname "$SCRIPT_DIR")"

if [ -z "$CRYPTOMEDIC_HTTP_HOST" ]; then
    CRYPTOMEDIC_HTTP_HOST="localhost:${CRYPTOMEDIC_PORT:-5080}"
    CRYPTOMEDIC_DB_UPGRADE="$( php "$PRJ_DIR/config.php" "security.key" )"
fi
echo "Deploying to $CRYPTOMEDIC_HTTP_HOST with pwd of #${#CRYPTOMEDIC_DB_UPGRADE} char length"

echo "* Upgrading database"
wget -O - --quiet --content-on-error "http://${CRYPTOMEDIC_HTTP_HOST}/maintenance/patch_db.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"

echo "* Upgrading files"
wget -O - --quiet --content-on-error "http://${CRYPTOMEDIC_HTTP_HOST}/maintenance/reset.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"

# Variable necessary for refresh.sh scripts
export CRYPTOMEDIC_HTTP_HOST

for E in "$PRJ_DIR"/www/api/*/bin/refresh.sh ; do
    if [ ! -f "$E" ]; then
        continue;
    fi
    echo "Found: $E"
    "$E"
done
