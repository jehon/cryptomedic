#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

if [ -z "$CRYPTOMEDIC_DEPLOY_PASSWORD" ]; then
    echo "$0 Need parameters" >&2
    exit 1
fi

BACKUP_DIR="."
if [ -n "$1" ]; then
    BACKUP_DIR="$1"
fi

mkdir -p "$BACKUP_DIR"

echo "Getting storage from $CRYPTOMEDIC_DEPLOY_HOST"
lftp "$CRYPTOMEDIC_DEPLOY_USER:$CRYPTOMEDIC_DEPLOY_PASSWORD@$CRYPTOMEDIC_DEPLOY_HOST" \
    -e "mirror live/storage '$BACKUP_DIR/storage'; bye"
echo "...done"

echo "Generating a new backup on remote"
curl -fsSL --user-agent firefox "http://$CRYPTOMEDIC_HTTP_HOST/maintenance/create_db_backup.php?pwd=$CRYPTOMEDIC_HTTP_TOKEN"
echo "- Sleeping a bit to allow the file to become visible"
sleep 10s
echo "...done"

echo "Getting db backups (and removing them from server)"
lftp "$CRYPTOMEDIC_DEPLOY_USER:$CRYPTOMEDIC_DEPLOY_PASSWORD@$CRYPTOMEDIC_DEPLOY_HOST" \
    -e "mirror --Remove-source-files live/backups '$BACKUP_DIR/backups'; bye"
echo "...done"

echo "Backup finished with success"
