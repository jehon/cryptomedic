#!/usr/bin/env bash

set -o errexit
set -o pipefail

if [ -z "$CRYPTOMEDIC_DEPLOY_PASSWORD" ]; then
    echo "$0 Need parameters" >&2
    exit 1
fi

BACKUP_DIR="."
if [ -n "$1" ]; then
    BACKUP_DIR="$1"
    mkdir -p "$BACKUP_DIR"
fi

echo "Generating a new backup on remote"
curl -fsSL "http://$CRYPTOMEDIC_HTTP_HOST/maintenance/create_db_backup.php?pwd=$CRYPTOMEDIC_HTTP_TOKEN"
echo "- Sleeping a bit to allow the file to become visible"
sleep 10s
echo "...done"

echo "Getting storage from $CRYPTOMEDIC_DEPLOY_HOST"
lftp "$CRYPTOMEDIC_DEPLOY_USER:$CRYPTOMEDIC_DEPLOY_PASSWORD@$CRYPTOMEDIC_DEPLOY_HOST" \
    -e "mirror live/ '$BACKUP_DIR/'; bye"
echo "...done"

echo "Backup finished with success"
