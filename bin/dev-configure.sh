#!/bin/bash

# Stop on error
set -e

PRJ_DIR="/vagrant"

# Manage user rights
usermod -a -G adm vagrant

if ([ "$1" != "offline" ]); then
  if [ ! -r /etc/apt/sources.list.d/nodesource.list ]; then
    # Install nodejs 6.* (still v0.10.25 in Ubuntu repository as of 17/07/2016)
    # This will run a "apt-get update"
    curl -sL https://deb.nodesource.com/setup_6.x | bash -
  else
    # The nodesource script will make a "apt-get update", thus we do this only in case
    # we do not run the above script
    apt-get -y update
  fi

  # apt-get -y update

  # Developpement packages
  DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes \
    build-essential \
    git             \
    multitail       \
    crudini         \
    curl            \
    mysql-server    \
    mysql-client    \
    apache2 \
    php5-cli php5-mysql php5-mcrypt php5-curl \
    libapache2-mod-php5 php5-xdebug     \
    phpmyadmin      \
    xvfb            \
    firefox         \
    default-jre     \
    nodejs          \
  # end

  # Install composer
  if [ -e "$PRJ_DIR"/composer.json ] && [ ! -x /usr/local/bin/composer.phar ]; then
    echo "** Getting the composer **"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin
  fi

  # Install project custom debs
  if [ "$(ls -A /vagrant/conf/custom-debs/*.deb 2>/dev/null)" ]; then
    echo "Installing custom debs"
    dpkg -i /vagrant/conf/custom-debs/*.deb
    apt-get install -f
  fi
fi

# Make the Apache server run as Vagrant user:
cat /etc/apache2/envvars \
  | grep -v APACHE_RUN_USER \
  > /etc/apache2/envvars2
echo "export APACHE_RUN_USER=vagrant" >> /etc/apache2/envvars2
mv /etc/apache2/envvars2 /etc/apache2/envvars

# Put various configs file in place (cp because needed before vagrant mount)
rsync -r -i --omit-dir-times $PRJ_DIR/conf/root/ /

# Enable php5-mcrypt
php5enmod mcrypt

# Enable apache modules
a2enmod  rewrite ssl
a2ensite default-ssl

# Configure phpmyadmin (fix missing preference tables in normal install) (still usefull on 2016-07-20)
cat /usr/share/doc/phpmyadmin/examples/create_tables.sql.gz | gunzip | mysql

# Add some swap (the swap mount is configured by rsync /conf/root/etc/fstab.d/swapfile)
# See @https://jeqo.github.io/blog/devops/vagrant-quickstart/
if [ ! -r "/swapfile" ]; then
  echo 'swapfile not found. Adding swapfile.'
  fallocate -l 1GiB /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
fi

# Install project dependancies
if [ "$1" != "offline" ]; then
  su vagrant -c $PRJ_DIR/bin/prj-install-dependancies.sh
fi

$PRJ_DIR/bin/dev-db-reset.sh

# Run project custom files
if [ -x $PRJ_DIR/bin/dev-configure-custom.sh ]; then
  $PRJ_DIR/bin/dev-configure-custom.sh
fi

/etc/init.d/apache2 restart
$PRJ_DIR/bin/dev-reset.sh
