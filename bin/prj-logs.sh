
if [ "$1" = "help" ]; then
  cat <<-EOL
    This script show the logs of the application:
    - apache logs
    - laravel logs
EOL
  exit 0
fi

touch /tmp/emails.txt
touch /var/log/apache2/error.log || true
touch /var/log/apache2/access.log || true
touch /var/log/apache2/other_vhosts_access.log || true

multitail --mark-interval 60 \
  -c  -ci red    --label "[hter]"   -i /var/log/apache2/error.log \
  -c  -cS apache --label "[http]"   -I /var/log/apache2/access.log \
  -c  -cS apache --label "[ssl ]"   -I /var/log/apache2/other_vhosts_access.log \
  -d  -ci cyan   --label "[@   ]"   -I /tmp/emails.txt \
  "$@"
