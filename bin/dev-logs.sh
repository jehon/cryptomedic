#!/bin/bash

touch /var/log/apache2/error.log               2>/dev/null || true
touch /var/log/apache2/access.log              2>/dev/null || true
touch /var/log/apache2/other_vhosts_access.log 2>/dev/null || true
touch /tmp/php_errors.log                      2>/dev/null || true
chmod a+rw /tmp/php_errors.log                 2>/dev/null || true

multitail --mark-interval 60 \
  -c  -ci red    --label "[ht_errors]"   -i /var/log/apache2/error.log  \
  -c  -cS apache --label "[ht_access]"   -I /var/log/apache2/access.log \
  -d  -ci yellow --label "[php_error]"   -I /tmp/php_errors.log         \
  "$@"
