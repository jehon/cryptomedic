#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")


DBROOTUSER=`php $PRJ_DIR/config.php 'database.rootuser'`
DBROOTPASS=`php $PRJ_DIR/config.php 'database.rootpwd'`


#MYSQL="mysql --database=$DBNAME -u root --quick"
MYSQL="mysql --quick"

if [ ! -z "$DBROOTUSER" ]; then
  # Add a user to connect to the database
  MYSQL="$MYSQL --user=$DBROOTUSER"
fi

if [ ! -z "$DBROOTPASS" ]; then
  # Add a password to connect to the database
  MYSQL="$MYSQL --password=$DBROOTPASS"
fi

# Give it to any sub-scripts
export PRJ_DIR
export MYSQL

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/dev-reset.d
