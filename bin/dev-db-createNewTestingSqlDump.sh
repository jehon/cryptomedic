#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

DB=`php $PRJ_DIR/config.php 'database.schema'`
if [ -z "$DB" ]; then
  echo "Missing $DB in config.php"
  exit 1
fi

BASE="$PRJ_DIR"/conf/database/base.sql

if mysqlshow --user=root "$DB" >/dev/null 2>/dev/null ; then
  mysqldump -u root "$DB" > "$BASE"
fi
