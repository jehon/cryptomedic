#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

# Stop on error
set -e

# Run the base configuration
chmod +x "$SCRIPT_DIR"/*
"$SCRIPT_DIR"/prj-base-configure.sh "$@"

echo "** Remove previous /var/www/html **"
sudo umount /var/www/html       || true

echo "** Install current /var/www/html **"
sudo mount -o bind "$PRJ_DIR/www/" /var/www/html

echo "** Install new config.php"
sudo ln $PRJ_DIR/conf/config-dev.php /var/www/config.php
sudo chmod a+r /var/www/config.php

if [ -r "$PRJ_DIR/conf/config-custom.php" ]; then
  echo "** Install new config-custom.php"
  sudo ln $PRJ_DIR/conf/config-custom.php /var/www/config-custom.php
  sudo chmod a+r /var/www/config-custom.php
fi

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi
