#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

# shellcheck source=./cr-lib
. "$(dirname "${BASH_SOURCE[0]}")"/cr-lib

# shellcheck source-path=SCRIPTDIR/../
. "$CR_SCRIPT_DIR/cr-with-live-data" /etc/jehon/restricted/cryptomedic.sh

BACKUP_DIR="."
if [ -n "$1" ]; then
    BACKUP_DIR="$1"
fi

mkdir -p "$BACKUP_DIR"

echo "Getting storage"
lftp "$JH_CRYPTOMEDIC_DEPLOY_USER:$JH_CRYPTOMEDIC_DEPLOY_PASSWORD@$JH_CRYPTOMEDIC_DEPLOY_HOST" \
    -e "mirror live/storage '$BACKUP_DIR/storage'; bye"
echo "...done"

echo "Generating a new backup on remote"
curl -fsSL --user-agent firefox "http://$JH_CRYPTOMEDIC_WEB_HOST/maintenance/create_db_backup.php?pwd=$JH_CRYPTOMEDIC_WEB_TOKEN"
echo "- Sleeping a bit to allow the file to become visible"
sleep 10s
echo "...done"

echo "Getting db backups (and removing them from server)"
lftp "$JH_CRYPTOMEDIC_DEPLOY_USER:$JH_CRYPTOMEDIC_DEPLOY_PASSWORD@$JH_CRYPTOMEDIC_DEPLOY_HOST" \
    -e "mirror --Remove-source-files live/backups '$BACKUP_DIR/backups'; bye"
echo "...done"

echo "Backup finished with success"
