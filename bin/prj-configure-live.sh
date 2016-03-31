#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Stop on error
set -e

# Run the base configuration
chmod +x "$SCRIPT_DIR"/*
"$SCRIPT_DIR"/prj-configure-base.sh "$@"

echo "** Install current /var/www/html **"
if [ -r /var/www/html ]; then
  if [ ! -L /var/www/html ]; then
    mv --force /var/www/html /var/www/html.bak
  fi
fi
# Override existing link, even if it is a directory
ln --symbolic --force --no-dereference "$PRJ_DIR/www" /var/www/html

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-live-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-live-custom.sh
fi
