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

deployItem() {
  # $1: site
  # $2: ftp root
  # $3: package number

  echo "[$1.$3] Ftp_root       : $2"
  echo "[$1.$3] Package        : $3"

  remote_root=`   php config.php deployment.$1.packages.$3.remote_root    2>/dev/null || echo "/"`
  local_root=`    php config.php deployment.$1.packages.$3.remote_root    2>/dev/null || echo "$PRJ_DIR"`
  extra_cmd_line=`php config.php deployment.$1.packages.$3.extra_cmd_line` # 2>/dev/null || echo ""`

  echo "[$1.$3] Remote Root    : $remote_root"
  echo "[$1.$3] Local  Root    : $local_root"
  echo "[$1.$3] Extra Cmd Line : $extra_cmd_line"

      # --parallel=10                \
  lftp <<EOC
    open "$2";
    mirror -R                      \
      --no-perms                   \
      --use-cache                  \
      --delete                     \
      --exclude ".git/"            \
      --exclude "config-site.php"  \
      --exclude "backups/"         \
      --exclude "documentation/"   \
      --exclude "live/"            \
      --exclude "live-for-test/"   \
      --exclude "tmp/"             \
      --exclude "tests"            \
      --exclude "vagrant/"         \
      $etra_cmd_line               \
      --dry-run                               \
      $local_root                  \
      $remote_root

EOC

  echo "[$1.$3] Done"
}

deploySite() {
  # $1: site
  ftp_site=`php config.php deployment.$1.ftp_site 2>/dev/null || true`
  if [[ "$ftp_site" = "" ]]; then
    echo "Site not found in configuration: $1"
    exit 255
  fi
  echo "Deploying to site: $ftp_site"

  php config.php deployment.$1.packages | while read L; do
    deployItem "$1" "$ftp_site" "$L"
  done
}

if [ "$1" = "" ]; then
  deploySite "prod"
else
  deploySite "$1"
fi

echo "End result: $?"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-go-site.d
