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
		sftp "$CRYPTOMEDIC_UPLOAD_USER@$CRYPTOMEDIC_UPLOAD_HOST"
	echo "sftp exit code: $?"
}

echo ""
echo "Updating md5sum.php script [for real]"
sftp_exec <<-EOC
	mkdir www/maintenance
	put www/maintenance/md5sum.php
EOC

echo "Getting the md5 from local"
wget --quiet --content-on-error "http://localhost:5555/maintenance/md5sum.php" -O "$TMP"deploy-local.txt

echo "Getting the md5 from remote"
wget --quiet --content-on-error "http://www.cryptomedic.org/maintenance/md5sum.php" -O "$TMP"deploy-remote.txt

echo "Sorting local file"
sort --stable "$TMP"deploy-local.txt > "$TMP"deploy-local.sorted.txt

echo "Sorting remote file"
sort --stable "$TMP"deploy-remote.txt > "$TMP"deploy-remote.sorted.txt

echo "Building the diff"
diff -u "$TMP"deploy-remote.sorted.txt "$TMP"deploy-local.sorted.txt | grep -e "^[+-]"  | grep -v "^+++" | grep -v "^---" \
    | cut -c 13- > "$TMP"deploy-changed.txt \
    || true

# We got a list of changed files

echo "Sortering the diff"
sort --unique < "$TMP"deploy-changed.txt > "$TMP"deploy-changed-sorted.txt 

echo "Transforming into ftp commands"
(
    while read -r file; do
        if [ -r "$file" ]; then
            echo "+ $file" >&3
            dir="$(dirname "$file")"
            echo "-mkdir \"$dir\" "
            echo "put \"$file\""
        else
            echo "- $file" >&3
            echo "rm \"$file\" || true"
        fi
    done

) < "$TMP"deploy-changed-sorted.txt > "$TMP"deploy-ftpcommands.txt

if [ "$1" == "commit" ]; then
    echo "*** Commiting ***"
	sftp_exec < "$TMP"deploy-ftpcommands.txt
    # lftp -v -f "$TMP"deploy-ftpcommands.txt

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
	# cat "$TMP"deploy-ftpcommands.txt
fi

echo "*** End ***"
echo "*** End ***"
echo "*** End ***"
