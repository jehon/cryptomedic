#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Stop on error
set -e

# Run the base configuration
chmod +x "$SCRIPT_DIR"/*
"$SCRIPT_DIR"/prj-configure-base.sh "$@"

echo "** Mount current /var/www/html **"
#ln --symbolic --force --no-dereference "$PRJ_DIR/www" /var/www/html
cat /etc/fstab | grep -v "/var/www/html" > /etc/fstab.new
echo -e "$PRJ_DIR/www\t/var/www/html\tnone\tbind\t0\t0" >> /etc/fstab.new
mv /etc/fstab /etc/fstab.prj-install.bak
mv /etc/fstab.new /etc/fstab
mount /var/www/html

# Run project custom files
if [ -x $SCRIPT_DIR/prj-configure-live-custom.sh ]; then
  $SCRIPT_DIR/prj-configure-live-custom.sh
fi
