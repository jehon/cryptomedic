#!/bin/bash

# Stop on error
set -e

# Clear terminal
echo -e \\033c

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")


DBROOTUSER=`php $PRJ_DIR/config.php 'database.rootuser'`
DBROOTPASS=`php $PRJ_DIR/config.php 'database.rootpwd'`

# Give it to any sub-scripts
export PRJ_DIR
export MYSQL="mysql --quick --user=$DBROOTUSER"
export MYSQL_PWD="$DBROOTPASS"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/dev-reset.d
