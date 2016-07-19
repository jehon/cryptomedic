#!/bin/bash

# This script show the logs of the application:
# - apache logs
# - emails.txt (dump of emails sent in the prj-fake-sendmail.sh)

touch /tmp/emails.txt                          2>/dev/null || true
touch /var/log/apache2/error.log               2>/dev/null || true
touch /var/log/apache2/access.log              2>/dev/null || true
touch /var/log/apache2/other_vhosts_access.log 2>/dev/null || true
touch /tmp/php_errors.log                      2>/dev/null || true
chmod a+rw /tmp/emails.txt /tmp/php_errors.log 2>/dev/null || true

if [ "$1" = "extended" ]; then
  EXTENDED=-c  -cS apache --label "[http]"   -I /var/log/apache2/access.log
fi

multitail --mark-interval 60 \
  -c  -ci red    --label "[hter]"   -i /var/log/apache2/error.log \
  -d  -ci cyan   --label "[@   ]"   -I /tmp/emails.txt \
  -d  -ci yellow --label "[php ]"   -I /tmp/php_errors.log \
  $EXTENDED
  "$@"

#  -c  -cS apache --label "[ssl ]"   -I /var/log/apache2/other_vhosts_access.log \
