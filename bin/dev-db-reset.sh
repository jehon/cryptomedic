#!/bin/bash

PRJ_DIR="/vagrant"

# Stop on error
set -e

DBROOT=`php $PRJ_DIR/config.php 'database.rootpwd'`
DBNAME=`php $PRJ_DIR/config.php 'database.schema'`
DBUSER=`php $PRJ_DIR/config.php 'database.username'`
BASE="$PRJ_DIR"/conf/database/base.sql

if [ ! -r "$BASE" ]; then
  echo "No '$BASE' base sql script found"
  exit 1
fi

MYSQL="mysql --database=$DBNAME -u root --quick"
if [ -z "$DBROOT" ]; then
  PWD=""
else
  MYSQL=$MYSQL --password=$DBROOT
fi

echo "* Resetting the database"
$MYSQL <<-EOC
  DROP SCHEMA IF EXISTS $DBNAME;
  CREATE SCHEMA IF NOT EXISTS $DBNAME;
  USE $DBNAME;
  GRANT ALL PRIVILEGES ON $DBNAME TO $DBUSER;
EOC

echo "* Loading $BASE"
cat "$PRJ_DIR/conf/database/base.sql" | $MYSQL

echo "* Upgrading it"
$PRJ_DIR/bin/prj-db-upgrade
