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
export MYSQL="docker-compose exec -T -e MYSQL_PWD=$DBROOTPASS mysql mysql"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/dev-reset.d
