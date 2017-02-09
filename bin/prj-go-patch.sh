#!/bin/bash

# Stop on error
#set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

TMP=$PRJ_DIR/tmp
LOG=$TMP/`date +%F_%H.%M.%S`.install.log
conf_site="prod"

echo "Log file: $LOG"

filter() {
  cat "$1"                                \
    | grep -v ".git"                      \
    | grep -v "/config-site.php"          \
    | grep -v "/.log"                     \
    | grep -v "/.settings"                \
    | grep -v "/backups"                  \
    | grep -v "/bin"                      \
    | grep -v "/conf/database/base.sql"   \
    | grep -v "/live"                     \
    | grep -v "/live-for-test"            \
    | grep -v "/node_modules"             \
    | grep -v "/tmp/"                     \
    | grep -v "/tests"                    \
    | grep -v "/test"                     \
    | grep -v "/Test"                     \
    | grep -v "/vagrant/"                 \
    | grep -v "/storage/"                 \
    | grep -v "/conf/www-root-10000"      \
    | grep -v "/documentation"            \
    > "$1.filtered"
}

ftp_host=`   php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_host 2>/dev/null || true`
ftp_user=`   php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_user 2>/dev/null || true`
ftp_pass=`   php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_pass 2>/dev/null || true`
remote_root=`php ${PRJ_DIR}/config.php deployment.$conf_site.packages.remote_root    2>/dev/null || echo "/"`
local_root=` php ${PRJ_DIR}/config.php deployment.$conf_site.packages.remote_root    2>/dev/null || echo "$PRJ_DIR"`

if [[ "$ftp_host" = "" ]]; then
  echo "Site not found in configuration: $conf_site"
  exit 255
fi
echo "[$conf_site] ftp_host       : $ftp_host"
echo "[$conf_site] ftp_user       : $ftp_user"
#echo "[$conf_site.$1] ftp_pass       : $ftp_pass"
echo "[$conf_site] remote_root    : $remote_root"
echo "[$conf_site] local_root     : $local_root"


wget   cryptomedic.local/maintenance/md5sum.php -O $TMP/md5sum-local.txt
wget www.cryptomedic.org/maintenance/md5sum.php -O $TMP/md5sum-remote.txt

filter $TMP/md5sum-local.txt
filter $TMP/md5sum-remote.txt

build_up(){
  while read data; do
    FN=${data:11}
    DIR=`dirname "$FN"`
    if [[ ${data:0:2} = "++" ]]; then
      # use this as a trigger to open connection
      echo open -u "$ftp_user","$ftp_pass" "$ftp_host";
      continue;
    fi
    if [[ ${data:0:2} = "--" ]]; then
      # skip
      continue
    fi
    if [[ ${data:0:1} = "+" ]]; then
      echo "+ $FN" >> $LOG
      echo "mkdir -f -p $remote_root/$DIR"
      echo "put '$local_root/$FN' -o '$remote_root/$FN'"
      continue
    fi
    if [[ ${data:0:1} = "-" ]]; then
      echo "- $FN" >> $LOG
      echo "rm '$remote_root/$FN'"
      continue
    fi
  done
}

if [ "$1" == "test" ]; then
  diff -u $TMP/md5sum-remote.txt.filtered $TMP/md5sum-local.txt.filtered | build_up > /dev/null
else
  diff -u $TMP/md5sum-remote.txt.filtered $TMP/md5sum-local.txt.filtered | build_up | lftp
fi

echo "******************** Log ************************"
cat $LOG

# lftp <<EOC
#   open -u "$ftp_user","$ftp_pass" "$ftp_host";
# EOC

echo "[$conf_site] Done"

echo "Running parts:"

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-go-site.d --arg="$conf_site"

echo "End result: $?"
