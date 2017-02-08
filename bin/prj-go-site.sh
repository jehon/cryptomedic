#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

# protect in the target site:
# - config-site.php
# - live

# Empty in the target site:
# - tmp

# Not uploaded:
# - documentation
# - live-for-tests
# - tests
# - tmp

# Uploaded in acceptancy only?
# - backups
# - bin

# Tricky:
# - closed list or exclude?
# - upload the config-site.php?
# - what if www folder is named otherwise above?
# - how to make configuration of this?
# - have some hooks global, per site? (ex: drupal update.php or drush import)

doDeployPackage() {
  # $1: package number

  # globals: conf_site, ftp_host, ftp_user, ftp_pass

  echo "[$conf_site.$1] ftp_host       : $ftp_host"
  echo "[$conf_site.$1] ftp_user       : $ftp_user"
  #echo "[$conf_site.$1] ftp_pass       : $ftp_pass"

  remote_root=`   php ${PRJ_DIR}/config.php deployment.$conf_site.packages.$1.remote_root    2>/dev/null || echo "/"`
  local_root=`    php ${PRJ_DIR}/config.php) deployment.$conf_site.packages.$1.remote_root    2>/dev/null || echo "$PRJ_DIR"`
  extra_cmd_line=`php ${PRJ_DIR}/config.php) deployment.$conf_site.packages.$1.extra_cmd_line 2>/dev/null || echo ""`

  echo "[$conf_site.$1] Remote Root    : $remote_root"
  echo "[$conf_site.$1] Local  Root    : $local_root"
  echo "[$conf_site.$1] Extra Cmd Line : $extra_cmd_line"

  lftp <<EOC
    open -u "$ftp_user","$ftp_pass" "$ftp_host";
    mirror -R                      \
      --no-perms                   \
      --use-cache                  \
      --delete                     \
      --exclude "config-site.php"  \
      --exclude ".log"             \
      --exclude ".git/"            \
      --exclude ".settings/"       \
      --exclude "backups/"         \
      --exclude "bin/"             \
      --exclude "conf/database/base.sql" \
      --exclude "documentation/"   \
      --exclude "live/"            \
      --exclude "live-for-test/"   \
      --exclude "node_modules"     \
      --exclude "tmp/"             \
      --exclude "tests"            \
      --exclude "vagrant/"         \
      --exclude "www/api/*/storage" \
      --verbose                    \
      $extra_cmd_line              \
      $local_root                  \
      $remote_root

EOC

  echo "[$conf_site.$1] Done"
}

doDeployToSite() {
  # $1: site
  conf_site="$1"

  ftp_host=`php ${PRJ_DIR}/config.php) deployment.$conf_site.ftp_host 2>/dev/null || true`
  ftp_user=`php ${PRJ_DIR}/config.php) deployment.$conf_site.ftp_user 2>/dev/null || true`
  ftp_pass=`php ${PRJ_DIR}/config.php) deployment.$conf_site.ftp_pass 2>/dev/null || true`

  if [[ "$ftp_host" = "" ]]; then
    echo "Site not found in configuration: $conf_site"
    exit 255
  fi
  echo "Deploying to site: $ftp_host"

  php ${PRJ_DIR}/config.php deployment.$conf_site.packages | while read L; do
    doDeployPackage "$L"
  done
}

if [ "$1" = "" ]; then
  SITE="prod"
else
  SITE="$1"
fi

doDeployToSite "$SITE"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-go-site.d --arg="$SITE"

echo "End result: $?"
