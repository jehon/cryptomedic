#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")

DB=`php $PRJ_DIR/config.php 'database.schema'`
if [ -z "$DB" ]; then
  echo "Missing $DB in config.php"
  exit 1
fi

TESTING="$PRJ_DIR"/conf/database/dev/testing.sql

if mysqlshow --user=root "$DB" >/dev/null 2>/dev/null ; then
  mysqldump -u root "$DB" > "$TESTING"
fi
