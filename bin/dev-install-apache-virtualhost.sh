#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

NAME=${PRJ_DIR//\//_}

VH=`php $PRJ_DIR/config.php "database.schema"`

echo $NAME
echo $VH

cat > "/etc/apache2/sites-enabled/$NAME.conf" <<EOCONF
<VirtualHost *:80 >
  ServerName $VH.local
  DocumentRoot $PRJ_DIR/www

  <Directory $PRJ_DIR/www>
    Allow from all
    Require all granted
    Options +Indexes
  </Directory>
  <Location />
    Allow from all
    Require all granted
    Options +Indexes
  </Location>

# LogLevel alert rewrite:trace3
</VirtualHost>

<VirtualHost *:443 >
  ServerName $VH.local
  DocumentRoot $PRJ_DIR/www

  SSLEngine On

  <Directory $PRJ_DIR/www>
    Allow from all
    Require all granted
    Options +Indexes
  </Directory>
  <Location />
    Allow from all
    Require all granted
    Options +Indexes
  </Location>

# LogLevel alert rewrite:trace3
</VirtualHost>
EOCONF


cat /etc/hosts | grep -v "$VH.local" > /etc/hosts.2
echo "127.0.0.1     $VH.local" >> /etc/hosts.2
mv /etc/hosts.2 /etc/hosts
