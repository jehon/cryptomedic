#!/bin/bash

#
# To protect a version, please see md5sum.php (at the bottom)
#

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

TMP=$PRJ_DIR/target/
LOG=$TMP/`date +%F_%H.%M.%S`.install.log

echo "Log file: $LOG"

ftp_host=$( php ${PRJ_DIR}/config.php deployment.ftp_host 2>/dev/null || true )
ftp_user=$( php ${PRJ_DIR}/config.php deployment.ftp_user 2>/dev/null || true )
ftp_pass=$( php ${PRJ_DIR}/config.php deployment.ftp_pass 2>/dev/null || true )
UPGRADE_PWD=$( php "$PRJ_DIR"/config.php "deployment.security_key" )
remote_root="/"
local_root="$PRJ_DIR"

if [[ "$ftp_host" = "" ]]; then
  echo "Site not found in configuration"
  exit 255
fi
echo "ftp_host       : $ftp_host"
echo "ftp_user       : $ftp_user"
#echo "ftp_pass       : $ftp_pass"
echo "remote_root    : $remote_root"
echo "local_root     : $local_root"

build_up(){
  while read data; do
    FN=${data:11}
    DIR=`dirname "$FN"`
    if [[ ${data:0:2} = "++" ]]; then
      # use this as a trigger to open connection
      echo "open -u $ftp_user,$ftp_pass $ftp_host";
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

echo ""
echo "Updating md5sum.php script [for real]"
printf "++\n+         /www/maintenance/md5sum.php\n" | build_up | lftp

cd $PRJ_DIR && php www/maintenance/md5sum.php > $TMP/md5sum-local.txt
curl --silent www.cryptomedic.org/maintenance/md5sum.php > $TMP/md5sum-remote.txt

if [ "$1" == "commit" ]; then
  echo "*** Commiting ***"
  diff -u $TMP/md5sum-remote.txt $TMP/md5sum-local.txt | build_up | lftp
else
  # We will use the log to see the changes
  diff -u $TMP/md5sum-remote.txt $TMP/md5sum-local.txt | build_up > /dev/null
fi

echo "******************** Log ************************"
cat $LOG

echo "Upgrading database"

# Run project custom files
curl --silent "www.cryptomedic.org/maintenance/patch_db.php?pwd=${UPGRADE_PWD}"

echo "End result: $?"

if [ "$1" != "commit" ]; then
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
  echo "Tag: $TAG"
  echo ""
  echo "To really commit, use:"
  echo "$0 commit"
  echo ""
fi
