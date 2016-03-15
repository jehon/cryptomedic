#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")

if [ "$1" = "help" ]; then
  cat <<-EOL
  Backup the actual dev database into backups/dev/
EOL
  exit 0
fi

set -e

ROOT="$PRJ_DIR/backups/dev/"
mkdir -p "$ROOT"

TS=`/bin/date "+%Y-%m-%d-%H.%M.%S"`

FILENAME="backup-$TS"
if [ "$1" != "" ]; then
  FILENAME="$FILENAME-$1"
fi
FILENAME="$FILENAME.sql.gz"

if mysqlshow --user=root mydb 2>/dev/null ; then
  mysqldump -u root mydb | gzip -c > "$ROOT/$FILENAME"
else
  echo "No database found"
fi
