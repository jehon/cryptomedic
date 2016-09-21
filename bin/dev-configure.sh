#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

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
    curl            \
    mysql-server    \
    mysql-client    \
    apache2 \
    php-cli php-mysql php-mcrypt php-curl \
    libapache2-mod-php php-xdebug     \
    phpmyadmin      \
    default-jre     \
    xvfb            \
    firefox         \
    nodejs          \
    ssmtp           \
    dos2unix        \
    lftp            \
  # end

  # Install composer (here since it is an install)
  if [ -e "$PRJ_DIR"/composer.json ]; then
    echo "** Getting the composer **"
    $PRJ_DIR/bin/lib/install-composer.sh
  fi

  # Install project custom debs
  if [ "$(ls -A /vagrant/vagrant/custom-debs/*.deb 2>/dev/null)" ]; then
    echo "Installing custom debs"
    dpkg -i /vagrant/vagrant/custom-debs/*.deb
    apt-get install -f
  fi
fi

# Fix rights for Windows environnement
find $PRJ_DIR/bin/ -type f -exec chmod +x "{}" ";"
find $PRJ_DIR/bin/ -type f -exec dos2unix "{}" ";"

# Make the Apache server run as Vagrant user:
cat /etc/apache2/envvars \
  | grep -v APACHE_RUN_USER \
  > /etc/apache2/envvars2
echo "export APACHE_RUN_USER=vagrant" >> /etc/apache2/envvars2
mv /etc/apache2/envvars2 /etc/apache2/envvars

# Enable php5-mcrypt
phpenmod mcrypt

# Enable apache modules
a2enmod  rewrite ssl
a2enmod  proxy_http

# Configure phpmyadmin (fix missing preference tables in normal install) (still usefull on 2016-07-20)
cat /usr/share/doc/phpmyadmin/examples/create_tables.sql.gz | gunzip | mysql

# Install project dependancies
su vagrant -c $PRJ_DIR/bin/prj-install-dependancies.sh

# Run project custom files
run-parts --report $PRJ_DIR/bin/dev-configure.d
