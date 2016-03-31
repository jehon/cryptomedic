#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

# Stop on error
set -e

# Fix permissions on the various files
chmod +x $SCRIPT_DIR

# Create /var/www
mkdir -p /var/www/html
chown www-data /var/www/html
chmod a+x /var/www /var/www/html
touch /var/www/config.php
chmod a+r /var/www/config.php

if ([ "$1" == "" ] || [ "$1" = "install" ]); then
  # Install various packages
  DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes apache2 \
    build-essential \
    libapache2-mod-php5 php5-cli php5-mysql php5-mcrypt php5-curl \
    mysql-server    \
    multitail       \
    crudini         \
    curl            \
    git             \
  # end
fi

# Enable php5-mcrypt
php5enmod mcrypt || true

# Enable SSL
a2enmod  rewrite ssl || true
a2ensite default-ssl || true
