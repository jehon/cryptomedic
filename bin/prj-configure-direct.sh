#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

# Stop on error
set -e

echo "** Remove previous /var/www/html **"
sudo umount /var/www/html       || true

echo "** Install current /var/www/html **"
sudo mount -o bind "$PRJ_DIR/www/" /var/www/html

echo "** Install new config.php"
sudo ln $PRJ_DIR/conf/config-dev.php /var/www/config.php
sudo chmod a+r /var/www/config.php

$SCRIPT_DIR/prj-db-reset.php

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi
