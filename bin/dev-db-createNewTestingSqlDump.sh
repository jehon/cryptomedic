#!/bin/bash

# Stop on error
set -e

PRJ_DIR="/vagrant"

DB=`php $PRJ_DIR/config.php 'database.schema'`
if [ -z "$DB" ]; then
  echo "Missing $DB in config.php"
  exit 1
fi

BASE="$PRJ_DIR"/conf/database/base.sql

if mysqlshow --user=root "$DB" >/dev/null 2>/dev/null ; then
  mysqldump -u root "$DB" > "$BASE"
fi
