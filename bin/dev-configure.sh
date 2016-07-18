#!/bin/bash

#SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
# PRJ_DIR=$(dirname "$SCRIPT_DIR")
PRJ_DIR="/vagrant"

# Stop on error
set -e

# Set the host locale
# http://serverfault.com/questions/362903/how-do-you-set-a-locale-non-interactively-on-debian-ubuntu
if [ "\$LC_ALL" != "" ]; then
  if locale -a | grep "\$LC_ALL" > /dev/null; then
    echo "Locale \$LC_ALL already configured"
  else
    echo "Generating locale \$LC_ALL"
    sudo locale-gen "\$LC_ALL"
  fi
else
  echo "No locale found in LC_ALL"
fi

# Manage user rights
usermod -a -G adm vagrant

if ([ "$1" != "offline" ]); then
  apt-get -y update
  touch /root/last_apt_get_update

  # Developpement packages
  DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes apache2 \
    php5-xdebug     \
    firefox         \
    xvfb            \
    phpmyadmin      \
    default-jre     \
    mysql-client    \
    build-essential \
    libapache2-mod-php5 php5-cli php5-mysql php5-mcrypt php5-curl \
    mysql-server    \
    multitail       \
    crudini         \
    curl            \
    git             \
  # end

  # Install nodejs 5.* ==> usefull????
  curl -sL https://deb.nodesource.com/setup_5.x | bash -
  apt-get install -y nodejs
fi

# Install project custom debs
if [ "$(ls -A /vagrant/conf/repo/*.deb)" ]; then
  echo "Installing custom debs"
  dpkg -i /vagrant/conf/repo/*.deb
  apt-get install -f
fi

# Put various configs file in place (cp because needed before vagrant mount)
rsync -a $PRJ_DIR/conf/root/ /

# Enable php5-mcrypt
php5enmod mcrypt || true

# Enable SSL
a2enmod  rewrite ssl || true
a2ensite default-ssl || true

# Configure phpmyadmin
cat /usr/share/doc/phpmyadmin/examples/create_tables.sql.gz | gunzip | mysql

# Add some swap
# See @https://jeqo.github.io/blog/devops/vagrant-quickstart/
if [ ! -r "/swapfile" ]; then
  echo 'swapfile not found. Adding swapfile.'
  #dd if=/dev/zero of=/swapfile bs=1024 count=524288
  fallocate -l 1GiB /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
fi

# Run project custom files
if [ -x $PRJ_DIR/bin/prj-configure-vagrant-custom.sh ]; then
  $PRJ_DIR/bin/prj-configure-vagrant-custom.sh
fi

# Create live folder
#mkdir -p /var/www/live
#chown -R www-data /var/www/live

if [ "$1" != "offline" ]; then
  $PRJ_DIR/bin/prj-install-dependancies.sh

  if [ -e "$PRJ_DIR"/composer.json ] && [ ! -x /usr/local/bin/composer.phar ]; then
    echo "** Getting the composer **"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin
  fi
fi

$PRJ_DIR/bin/prj-db-reset.php

# This file is not necessary on vagrant boot
echo "** Install new config.php"
ln -s --force $PRJ_DIR/conf/config-dev.php /var/www/config.php
sudo chmod a+r /var/www/config.php

if [ -r "$PRJ_DIR/conf/config-custom.php" ]; then
  echo "** Install new config-custom.php"
  sudo ln $PRJ_DIR/conf/config-custom.php /var/www/config-custom.php
  sudo chmod a+r /var/www/config-custom.php
fi

# Run project custom files
if [ -x $PRJ_DIR/bin/prj-configure-base-custom.sh ]; then
  $PRJ_DIR/bin/prj-configure-base-custom.sh
fi

/etc/init.d/apache2 restart

true
