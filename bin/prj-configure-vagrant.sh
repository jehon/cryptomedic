#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

# Stop on error
set -e

# Fix permissions on the various files
chmod +x $SCRIPT_DIR

# Add the prj-build path into the server path
cat <<PROFILE > /etc/profile.d/vagrant-append-project.sh
#!/bin/bash
# Export will make this inheritable
export PATH=$PATH:$SCRIPT_DIR
export DISPLAY=":99.0"

export PRJ_DIR=$PRJ_DIR
export SCRIPT_DIR=$SCRIPT_DIR
PROFILE
chmod 777 /etc/profile.d/vagrant-append-project.sh

if ([ "$1" == "" ] || [ "$1" = "install" ]); then
  # Manage packages
  if test "`find /root/last_apt_get_update -mtime -1 2>/dev/null`"; then
    echo "Last apt-get update less than 1 day ago. Skipping it." >&2
    echo "To re-enable it:" >&2
    echo "rm /root/last_apt_get_update" >&2
  else
    apt-get -y update
    touch /root/last_apt_get_update
  fi

  # Install various packages
  # --force-yes
  DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes apache2 \
    build-essential \
    multitail       \
    mysql-client    \
    crudini         \
    mysql-server    \
    curl            \
    libapache2-mod-php5 php5-cli php5-mysql php5-mcrypt php5-curl \
    phpmyadmin      \
    xvfb            \
    firefox         \
    git
  # end

  # Install nodejs 5.*
  curl -sL https://deb.nodesource.com/setup_5.x | bash -
  apt-get install -y nodejs

  echo "Install terminated"
fi

# Enable php5-mcrypt
php5enmod mcrypt

# Manage user erights
usermod -a -G adm vagrant

# Enable SSL
a2enmod  rewrite ssl
a2ensite default-ssl

# Put various configs file in place (cp because needed before vagrant mount)
cp --force $PRJ_DIR/conf/apache-custom.conf   /etc/apache2/conf-enabled/apache-custom.conf
cp --force $PRJ_DIR/conf/phpmyadmin.site.conf /etc/apache2/sites-enabled/phpmyadmin.conf
cp --force $PRJ_DIR/conf/phpmyadmin.inc.php   /etc/phpmyadmin/conf.d/phpmyadmin.inc.php
cp --force $PRJ_DIR/conf/xvfb                 /etc/init.d/xvfb

# Enable xvfb
chmod +x /etc/init.d/xvfb
update-rc.d xvfb defaults

# This file is not necessary on vagrant boot
ln -s --force $PRJ_DIR/conf/config-dev.php /var/www/config.php
chmod a+r /var/www/config.php

# Hook the fake sendmail
if [ ! -r /usr/sbin/sendmail.bak ]; then
  if [ -r /usr/sbin/sendmail ]; then
    mv /usr/sbin/sendmail /usr/sbin/sendmail.bak
  fi
fi
sed -i -e "s:;sendmail_path =:sendmail_path = \"$SCRIPT_DIR/prj-fake-sendmail.sh\":g" /etc/php5/apache2/php.ini


if ([ "$1" == "" ] || [ "$1" = "install" ]); then
  $SCRIPT_DIR/prj-install-dependancies.sh
  $SCRIPT_DIR/prj-db-reset.php
fi

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi

# Restart necessary services
/etc/init.d/apache2 restart
