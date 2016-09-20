#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

DBROOT=`php $PRJ_DIR/config.php 'database.rootpwd'`
DBNAME=`php $PRJ_DIR/config.php 'database.schema'`
DBUSER=`php $PRJ_DIR/config.php 'database.username'`
DBPASS=`php $PRJ_DIR/config.php 'database.password'`
BASE="$PRJ_DIR"/conf/database/base.sql


echo "* Cleaning tmp"
if [ -d "$PRJ_DIR/tmp" ]; then
  find "$PRJ_DIR/tmp/" -mindepth 1 ! -name '.gitkeep' -delete
else
  mkdir -p "$PRJ_DIR/tmp"
fi

#MYSQL="mysql --database=$DBNAME -u root --quick"
MYSQL="mysql -u root --quick"

if [ -z "$DBROOT" ]; then
  PWD=""
else
  # Add a password to connect to the database
  MYSQL=$MYSQL --password=$DBROOT
fi

echo "* Resetting the database $DBNAME"
$MYSQL  --database=mysql <<-EOC
  DROP SCHEMA IF EXISTS $DBNAME;
  CREATE SCHEMA $DBNAME;
  USE $DBNAME;
  GRANT ALL PRIVILEGES ON $DBNAME   TO $DBUSER IDENTIFIED BY '$DBPASS';
  GRANT ALL PRIVILEGES ON $DBNAME.* TO $DBUSER IDENTIFIED BY '$DBPASS';
EOC

if [ ! -r "$BASE" ]; then
  echo "No '$BASE' base sql script found"
else
  echo "* Loading $BASE into $DBNAME"
  cat "$PRJ_DIR/conf/database/base.sql" | $MYSQL  --database=$DBNAME
fi

echo "* Upgrading $DBNAME"
$PRJ_DIR/bin/prj-db-upgrade

echo "* Applying dev hooks to $DBNAME"
$PRJ_DIR/bin/prj-db-upgrade "$PRJ_DIR/conf/database/always-dev/"

echo "* Reset the live folder from live-for-test"
rsync                       \
  --times                   \
  --recursive               \
  --delete                  \
  --itemize-changes         \
  "$PRJ_DIR/live-for-test/" \
  "$PRJ_DIR/live/"

# Run project custom files
run-parts --report $PRJ_DIR/bin/dev-reset.d
