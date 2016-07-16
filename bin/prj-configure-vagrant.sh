#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

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

# Add the prj-build path into the server path
cat <<PROFILE > /etc/profile.d/vagrant-append-project.sh
#!/bin/bash
# Export will make this inheritable
export PATH=$PATH:$SCRIPT_DIR
export DISPLAY=":99.0"

export PRJ_DIR=$PRJ_DIR
export SCRIPT_DIR=$SCRIPT_DIR

# Fix permissions on the various files
chmod +x "$SCRIPT_DIR"/*

cd /$SCRIPT_DIR

#prj-logs.sh
PROFILE
chmod 777 /etc/profile.d/vagrant-append-project.sh

# Manage user rights
usermod -a -G adm vagrant

if ([ "$1" != "offline" ]); then
  # Manage packages
  if test "`find /root/last_apt_get_update -mtime -1 2>/dev/null`"; then
    echo "Last apt-get update less than 1 day ago. Skipping it." >&2
    echo "To re-enable it:" >&2
    echo "rm /root/last_apt_get_update" >&2
  else
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

    echo "Install terminated"
  fi
fi

# Install project custom debs
if [ "$(ls -A /vagrant/conf/repo/*.deb)" ]; then
  echo "Installing custom debs"
  dpkg -i /vagrant/conf/repo/*.deb
  apt-get install -f
fi

# Enable php5-mcrypt
php5enmod mcrypt || true

# Enable SSL
a2enmod  rewrite ssl || true
a2ensite default-ssl || true

# Put various configs file in place (cp because needed before vagrant mount)
rsync -a $PRJ_DIR/conf/root/ /

# Configure phpmyadmin
cat /usr/share/doc/phpmyadmin/examples/create_tables.sql.gz | gunzip | mysql

# Enable xvfb

# Hook the fake sendmail
if [ ! -r /usr/sbin/sendmail.bak ]; then
  if [ -r /usr/sbin/sendmail ]; then
    mv /usr/sbin/sendmail /usr/sbin/sendmail.bak
  fi
fi
sed -i -e "s:;sendmail_path =:sendmail_path = \"$SCRIPT_DIR/prj-fake-sendmail.sh\":g" /etc/php5/apache2/php.ini
touch /tmp/emails.txt
chmod a+rwx /tmp/emails.txt

#sed -i -e "s:;error_log = php_errors.log:error_log = /tmp/php_errors.log:g" /etc/php5/apache2/php.ini
touch /tmp/php_errors.log
chmod a+rwx /tmp/php_errors.log

# Add some swap
# See @https://jeqo.github.io/blog/devops/vagrant-quickstart/
if [ ! -r "/swapfile" ]; then
  echo 'swapfile not found. Adding swapfile.'
  #dd if=/dev/zero of=/swapfile bs=1024 count=524288
  fallocate -l 1GiB /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  #echo '/swapfile none swap defaults 0 0' > /etc/fstab.d/swapfile
fi

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi

# Create live folder
#mkdir -p /var/www/live
#chown -R www-data /var/www/live

if [ "$1" != "offline" ]; then
  $SCRIPT_DIR/prj-install-dependancies.sh

  if [ -e "$PRJ_DIR"/composer.json ] && [ ! -x /usr/local/bin/composer.phar ]; then
    echo "** Getting the composer **"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin
  fi
fi

$SCRIPT_DIR/prj-db-reset.php

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
if [ -x $SCRIPT_DIR/prj-configure-base-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-base-custom.sh
fi

/etc/init.d/apache2 restart

true
