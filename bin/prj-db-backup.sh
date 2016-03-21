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

DB=`php $PRJ_DIR/conf/config-dev.php 'database.schema'`
if [ -z "$DB" ]; then
  echo "Missing $DB in config.php"
  exit 1
fi

ROOT="$PRJ_DIR/backups/dev/"
mkdir -p "$ROOT"

TS=`/bin/date "+%Y-%m-%d-%H.%M.%S"`

FILENAME="backup-$DB-$TS"
if [ "$1" != "" ]; then
  FILENAME="$FILENAME-$1"
fi
FILENAME="$FILENAME.sql.gz"

if mysqlshow --user=root "$DB" 2>/dev/null ; then
  mysqldump -u root "$DB" | gzip -c > "$ROOT/$FILENAME"
else
  echo "No database found: $DB"
fi
echo "Backup of $DB done: $FILENAME"
