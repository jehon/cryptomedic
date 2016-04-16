#!/bin/bash

# *** Depend on DEV ***

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")
echo "SCRIPT: $SCRIPT_DIR"
echo "PRJ:    $PRJ_DIR"

# Stop on error
set -e

# Add the prj-build path into the server path
cat <<PROFILE > /etc/profile.d/vagrant-append-project.sh
#!/bin/bash
# Export will make this inheritable
export PATH=$PATH:$SCRIPT_DIR
export DISPLAY=":99.0"

export PRJ_DIR=$PRJ_DIR
export SCRIPT_DIR=$SCRIPT_DIR

cd /vagrant
PROFILE
chmod 777 /etc/profile.d/vagrant-append-project.sh

INDEX_CREATED=""
if [ ! -r "/var/www/html/index.cgi" ]; then
  touch /var/www/html/index.cgi
  INDEX_CREATED=/var/www/html/index.cgi
fi

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

  echo "Install terminated"
fi

if [ "$INDEX_CREATED" != "" ]; then
  echo "Removing place holder index.cgi"
  rm "$INDEX_CREATED"
fi

# Run the dev configuration
"$SCRIPT_DIR"/prj-configure-dev.sh "$@"

# Manage user rights
usermod -a -G adm vagrant

# Put various configs file in place (cp because needed before vagrant mount)
cp --force $PRJ_DIR/conf/apache-config.conf         /etc/apache2/conf-enabled/apache-config.conf
cp --force $PRJ_DIR/conf/apache-server-10080.conf   /etc/apache2/sites-enabled/apache-server-10080.conf
cp --force $PRJ_DIR/conf/phpmyadmin.site.conf       /etc/apache2/sites-enabled/phpmyadmin.conf
cp --force $PRJ_DIR/conf/phpmyadmin.inc.php         /etc/phpmyadmin/conf.d/phpmyadmin.inc.php

# Configure phpmyadmin
cat /usr/share/doc/phpmyadmin/examples/create_tables.sql.gz | gunzip | sudo mysql

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

sed -i -e "s:;error_log = php_errors.log:error_log = /tmp/php_errors.log:g" /etc/php5/apache2/php.ini
touch /tmp/php_errors.log
chmod a+rwx /tmp/php_errors.log

# Add some swap
# See @https://jeqo.github.io/blog/devops/vagrant-quickstart/
if [ ! -r "/etc/fstab/swapfile" ]; then
  echo 'swapfile not found. Adding swapfile.'
  #dd if=/dev/zero of=/swapfile bs=1024 count=524288
  fallocate -l 1GiB /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap defaults 0 0' > /etc/fstab.d/swapfile
fi

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-vagrant-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-vagrant-custom.sh
fi

/etc/init.d/apache2 restart

true
