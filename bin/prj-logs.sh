#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

if [ "$1" = "help" ]; then
  cat <<-EOL
    This script show the logs of the application:
    - apache logs
    - emails.txt (dump of emails sent in the prj-fake-sendmail.sh)
EOL
  exit 0
fi

touch /tmp/emails.txt || true
touch /var/log/apache2/error.log || true
touch /var/log/apache2/access.log || true
touch /var/log/apache2/other_vhosts_access.log || true
touch /tmp/php_errors.log || true

chmod a+rw /tmp/email.txt /tmp/php_errors.log || true

multitail --mark-interval 60 \
  -c  -ci red    --label "[hter]"   -i /var/log/apache2/error.log \
  -c  -cS apache --label "[http]"   -I /var/log/apache2/access.log \
  -d  -ci cyan   --label "[@   ]"   -I /tmp/emails.txt \
  -d  -ci yellow --label "[php ]"   -I /tmp/php_errors.log \
  "$@"

#  -c  -cS apache --label "[ssl ]"   -I /var/log/apache2/other_vhosts_access.log \
