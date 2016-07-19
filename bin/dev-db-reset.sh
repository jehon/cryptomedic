#!/bin/bash

PRJ_DIR="/vagrant"

# Stop on error
set -e

ROOTPẄ=`php $PRJ_DIR/config.php 'database.rootpwd'`
DBNAME=`php $PRJ_DIR/config.php 'database.schema'`
DBUSER=`php $PRJ_DIR/config.php 'database.username'`
if [ -z "$ROOTPW" ]; then
  echo "Missing database.rootpwd in config.php"
  exit 1
fi

if [ -z "$DBNAME" ]; then
  echo "Missing database.schema in config.php"
  exit 1
fi

if [ -z "$DBUSER" ]; then
  echo "Missing database.username in config.php"
  exit 1
fi

BASE="$PRJ_DIR"/conf/database/base.sql

if [ ! -r "$BASE" ]; then
  echo "No $BASE base sql script found"
  exit 1
fi

cat <<-EOC
  DROP SCHEMA IF EXISTS $DBNAME;
  CREATE SCHEMA IF NOT EXISTS $DBNAME;
  GRANT ALL PRIVILEGES ON $DBNAME TO $
EOC | mysql -u root -P "$ROOTPẄ"


cat "$PRJ_DIR/../conf/database/base.sql" | mysql -u root -P "$ROOTPẄ"
$PRJ_DIR/bin/prj-db-upgrade
