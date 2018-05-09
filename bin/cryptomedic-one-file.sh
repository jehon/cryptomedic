#!/bin/bash

set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

conf_site="prod"

ftp_host=`php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_host 2>/dev/null || true`
ftp_user=`php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_user 2>/dev/null || true`
ftp_pass=`php ${PRJ_DIR}/config.php deployment.$conf_site.ftp_pass 2>/dev/null || true`
remote_root=""
local_root="$PRJ_DIR"

if [[ "$ftp_host" = "" ]]; then
  echo "Site not found in configuration: $conf_site"
  exit 255
fi

FN="${1#$PRJ_DIR/}"
echo "Reduced file: $FN"
if [ ! -r "$FN" ]; then
	echo "File not found: $FN"
	exit 255
fi
(
    echo "open -u $ftp_user,$ftp_pass $ftp_host";
    echo "put '$local_root/$FN' -o '$remote_root/$FN'"
	echo ""
) | lftp
