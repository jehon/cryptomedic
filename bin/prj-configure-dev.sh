#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Stop on error
set -e

if ([ "$1" == "" ] || [ "$1" = "install" ]); then
  # Developpement packages
  DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes apache2 \
    firefox         \
    xvfb            \
    phpmyadmin      \
    default-jre     \
    mysql-client    \
  # end

  # Install nodejs 5.*
  curl -sL https://deb.nodesource.com/setup_5.x | bash -
  apt-get install -y nodejs

  echo "Install terminated"
fi

# Run the base configuration
"$SCRIPT_DIR"/prj-configure-live.sh "$@"

# This file is not necessary on vagrant boot
echo "** Install new config.php"
ln -s --force $PRJ_DIR/conf/config-dev.php /var/www/config.php
sudo chmod a+r /var/www/config.php

if [ -r "$PRJ_DIR/conf/config-custom.php" ]; then
  echo "** Install new config-custom.php"
  sudo ln $PRJ_DIR/conf/config-custom.php /var/www/config-custom.php
  sudo chmod a+r /var/www/config-custom.php
fi

if ([ "$1" == "" ] || [ "$1" != "offline" ]); then
  $SCRIPT_DIR/prj-install-dependancies.sh
  $SCRIPT_DIR/prj-db-reset.php
fi

# Restart necessary services
/etc/init.d/apache2 restart

# echo "** Remove previous /var/www/html **"
# sudo umount /var/www/html       || true

# echo "** Install current /var/www/html **"
# sudo mount -o bind "$PRJ_DIR/www/" /var/www/html

true
