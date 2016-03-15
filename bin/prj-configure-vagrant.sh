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
PATH=$PATH:$SCRIPT_DIR
PRJ_DIR=$PRJ_DIR
SCRIPT_DIR=$SCRIPT_DIR
PROFILE
chmod 777 /etc/profile.d/vagrant-append-project.sh

# Manage packages
if test "`find /root/last_apt_get_update -mtime -1 2>/dev/null`"; then
  echo "Last apt-get update less than 1 day ago. Skipping it." >&2
  echo "To re-enable it:" >&2
  echo "rm /root/last_apt_get_update" >&2
else
  apt-get -y update
  touch /root/last_apt_get_update
fi

# Configure mysql-server package to not ask for password
#debconf-set-selections <<< 'mysql-server mysql-server/root_password password empty'
#debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password empty'

# Install various packages
# --force-yes
DEBIAN_FRONTEND=noninteractive apt-get install --yes --force-yes apache2 \
  build-essential \
  multitail       \
  mysql-client    \
  crudini         \
  mysql-server    \
  nodejs npm nodejs-legacy \
  curl            \
  libapache2-mod-php5 php5-cli php5-mysql php5-mcrypt php5-curl \
  phpmyadmin      \
  git
# end


echo "Install terminated"

# Manage user rights
usermod -a -G adm vagrant

# Enable SSL
a2enmod  rewrite ssl
a2ensite default-ssl

# Put various configs file in place (cp because needed before vagrant mount)
cp --force $PRJ_DIR/conf/phpmyadmin.site.conf /etc/apache2/sites-enabled/phpmyadmin.conf
cp --force $PRJ_DIR/conf/apache-custom.conf   /etc/apache2/conf-enabled/apache-custom.conf
cp --force $PRJ_DIR/conf/phpmyadmin.inc.php   /etc/phpmyadmin/conf.d/phpmyadmin.inc.php

# This file is not necessary on vagrant boot
ln -s --force $PRJ_DIR/conf/config-dev.php /var/www/config.php

# Hook the fake sendmail
if [ ! -r /usr/sbin/sendmail.bak ]; then
  mv /usr/sbin/sendmail /usr/sbin/sendmail.bak
fi
sed -i -e "s:;sendmail_path =:sendmail_path = \"$SCRIPT_DIR/prj-fake-email-server\":g" /etc/php5/apache2/php.ini


$SCRIPT_DIR/prj-install-dependancies.sh.sh
$SCRIPT_DIR/prj-db-reset.php

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi

# Restart necessary services
/etc/init.d/apache2 restart
