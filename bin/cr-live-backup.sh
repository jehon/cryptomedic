#!/usr/bin/env bash

#
# This script should be standalone
#
#     because it is used on server to make the remote backup.
#

set -o errexit
set -o pipefail

if [ -z "$CRYPTOMEDIC_DEPLOY_FILES_PASSWORD" ]; then
    echo "$0 Need parameters" >&2
    exit 1
fi

BACKUP_DIR="."
if [ -n "$1" ]; then
    BACKUP_DIR="$1"
    mkdir -p "$BACKUP_DIR"
fi

echo "Generating a new backup on remote"
curl -fsSL "http://$CRYPTOMEDIC_DEPLOY_WEB_HOST/maintenance/create_db_backup.php?pwd=$CRYPTOMEDIC_DEPLOY_WEB_TOKEN"
echo "- Sleeping a bit to allow the file to become visible"
sleep 10s
echo "...done"

echo "Getting storage from $CRYPTOMEDIC_DEPLOY_FILES_HOST"
cr-lftp "$CRYPTOMEDIC_DEPLOY_FILES_USER:$CRYPTOMEDIC_DEPLOY_FILES_PASSWORD@$CRYPTOMEDIC_DEPLOY_FILES_HOST" \
    -e "mirror live/ '$BACKUP_DIR/'; bye"
echo "...done"

echo "Backup finished with success"
