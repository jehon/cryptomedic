#!/bin/bash

# Stop on error
set -e

PRJ_DIR="/vagrant"

DBROOT=`php $PRJ_DIR/config.php 'database.rootpwd'`
DBNAME=`php $PRJ_DIR/config.php 'database.schema'`
DBUSER=`php $PRJ_DIR/config.php 'database.username'`
DBPASS=`php $PRJ_DIR/config.php 'database.password'`
BASE="$PRJ_DIR"/conf/database/base.sql

if [ ! -r "$BASE" ]; then
  echo "No '$BASE' base sql script found"
  exit 1
fi

#MYSQL="mysql --database=$DBNAME -u root --quick"
MYSQL="mysql -u root --quick"
if [ -z "$DBROOT" ]; then
  PWD=""
else
  MYSQL=$MYSQL --password=$DBROOT
fi

echo "* Resetting the database"
$MYSQL  --database=mysql <<-EOC
  DROP SCHEMA IF EXISTS $DBNAME;
  CREATE SCHEMA $DBNAME;
  USE $DBNAME;
  GRANT ALL PRIVILEGES ON $DBNAME   TO $DBUSER IDENTIFIED BY '$DBPASS';
  GRANT ALL PRIVILEGES ON $DBNAME.* TO $DBUSER IDENTIFIED BY '$DBPASS';
EOC

echo "* Loading $BASE"
cat "$PRJ_DIR/conf/database/base.sql" | $MYSQL  --database=$DBNAME

echo "* Upgrading it"
$PRJ_DIR/bin/prj-db-upgrade
