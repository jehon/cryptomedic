#!/bin/bash

#
# To protect a version, please see md5sum.php (at the bottom)
#

# Stop on error
set -e

SCRIPT_DIR="$( dirname "${BASH_SOURCE[0]}" )"
PRJ_DIR="$(dirname "$SCRIPT_DIR")"
TMP="$PRJ_DIR/target/"

CRYPTOMEDIC_UPLOAD_HOST="ftp.cluster003.ovh.net"
if [ -z "$CRYPTOMEDIC_UPLOAD_USER" ]; then
    echo "Missing CRYPTOMEDIC_UPLOAD_USER" >&2
    exit 255
fi

if [ -z "$CRYPTOMEDIC_UPLOAD_PASSWORD" ]; then
    echo "Missing CRYPTOMEDIC_UPLOAD_PASSWORD" >&2
    exit 255
fi

if [ -z "$CRYPTOMEDIC_DB_UPGRADE" ]; then
    echo "Missing CRYPTOMEDIC_DB_UPGRADE" >&2
    exit 255
fi


# Create a "3"rd out where all structured messages will go
# This allow us to capture stdout and stderr everywhere, 
# while still letting passing through the messages "Success / failure / ..."
exec 3>&1

build_up(){
    while read -r data; do
        FN="${data:12}"
        DIR="$( dirname "$FN" )"
        if [[ ${data:0:2} = "++" ]]; then
            # use this as a trigger to open connection
            echo "open -u $CRYPTOMEDIC_UPLOAD_USER,$CRYPTOMEDIC_UPLOAD_PASSWORD $CRYPTOMEDIC_UPLOAD_HOST";
            continue;
        fi
        if [[ ${data:0:2} = "--" ]]; then
            # skip
            continue
        fi
        if [[ ${data:0:1} = "+" ]]; then
            echo "+ $FN" >&3
            echo "cd /$DIR || mkdir -p /$DIR"
            echo "put '$FN' -o '/$FN'"
            continue
        fi
        if [[ ${data:0:1} = "-" ]]; then
            echo "- $FN" >&3
            echo "rm '/$FN'"
            continue
        fi
    done
}

echo ""
echo "Updating md5sum.php script [for real]"
(
    echo "++"
    echo "+ aaaaaaa /www/maintenance/md5sum.php"
) | build_up | lftp -v

echo "Getting the md5 from local"
wget --quiet --content-on-error "http://localhost:5555/maintenance/md5sum.php" -O "$TMP"/md5sum-local.txt

echo "Getting the md5 from remote"
wget --quiet --content-on-error "http://www.cryptomedic.org/maintenance/md5sum.php" -O "$TMP"/md5sum-remote.txt

echo "Building the diff"
if [ "$1" == "commit" ]; then
    echo "*** Commiting ***"
    diff -u "$TMP"/md5sum-remote.txt "$TMP"/md5sum-local.txt | build_up | lftp -v || true
else
    # We will use the log to see the changes
    diff -u "$TMP"/md5sum-remote.txt "$TMP"/md5sum-local.txt | build_up > /dev/null || true
fi

echo "Upgrading database"

# Run project custom files
wget -O - --quiet --content-on-error "www.cryptomedic.org/maintenance/patch_db.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"

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

echo "End"
