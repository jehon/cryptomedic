#!/bin/bash

# Stop on error
set -e

# Clear terminal
echo -e \\033c

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")


DBROOTPASS=password
DBROOTUSER=root

# Give it to any sub-scripts
export PRJ_DIR
export MYSQL="mysql --quick --host 127.0.0.1 --port=5556 --user=$DBROOTUSER "
export MYSQL_PWD="$DBROOTPASS"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/dev-reset.d
