#!/bin/bash

#
# To protect a version, please see md5sum.php (at the bottom)
#

# Stop on error
set -e
set -o pipefail

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

lftp_connect() {
    echo "open -u $CRYPTOMEDIC_UPLOAD_USER,$CRYPTOMEDIC_UPLOAD_PASSWORD $CRYPTOMEDIC_UPLOAD_HOST";
}

sftp_exec() {
	SSHPASS="$CRYPTOMEDIC_UPLOAD_PASSWORD" sshpass -e \
		sftp "$CRYPTOMEDIC_UPLOAD_USER@$CRYPTOMEDIC_UPLOAD_HOST" \
			2>&1 \
				| grep -v "Connected to" \
				| grep -v "sftp> "
}

sftp_put() {
	(
		dir="$(dirname "$1")"
		echo "-mkdir \"$dir\" "
		echo "put \"$1\" \"$1\""
	) | sftp_exec \
		| grep -v "Couldn't create directory: Failure"
}

sftp_rm() {
    echo "rm \"$file\"" \
		| sftp_exec 
}

echo ""
echo "Updating md5sum.php script [for real]"
sftp_put www/maintenance/md5sum.php

echo "Getting the md5 from local"
wget --quiet --content-on-error "http://localhost:5555/maintenance/md5sum.php?filter=local" -O "$TMP"deploy-local.txt

echo "Getting the md5 from remote"
wget --quiet --content-on-error "http://www.cryptomedic.org/maintenance/md5sum.php?filter=remote" -O "$TMP"deploy-remote.txt

echo "Sorting local file"
sort --stable "$TMP"deploy-local.txt > "$TMP"deploy-local.sorted.txt

echo "Sorting remote file"
sort --stable "$TMP"deploy-remote.txt > "$TMP"deploy-remote.sorted.txt

echo "Building the diff"
diff -u "$TMP"deploy-remote.sorted.txt "$TMP"deploy-local.sorted.txt | grep -e "^[+-]"  | grep -v "^+++" | grep -v "^---" \
    | cut -c 1,13- > "$TMP"deploy-changed.txt \
    || true

# We got a list of changed files

echo "Sortering the diff"
sort -k 1.1r < "$TMP"deploy-changed.txt > "$TMP"deploy-changed-sorted.txt 

echo "Transforming into ftp commands"
(
    while read -r lfile; do
		file=${lfile:1}
        if [ "${lfile:0:1}" == "+" ]; then
			if [ "$1" == "commit" ]; then
				sftp_put "$file"
			else 
            	echo "+ $file" >&3
			fi
        else
			if [ "$1" == "commit" ]; then
				sftp_rm "$file"
			else 
            	echo "- $file" >&3
			fi
        fi
    done

) < "$TMP"deploy-changed-sorted.txt

if [ "$1" == "commit" ]; then
    echo "*** Commiting ***"

    echo "Upgrading database"
    wget -O - --quiet --content-on-error "www.cryptomedic.org/maintenance/patch_db.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"
else
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
    echo ""
    echo "To really commit, use:"
    echo "$0 commit"
    echo ""
fi

echo "*** End ***"
echo "*** End ***"
echo "*** End ***"
