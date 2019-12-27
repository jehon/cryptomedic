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
				| grep -v "Couldn't create directory" \
				| grep -v "sftp> " \
				| while read R ; do
					echo "$R"
					if [[ "$R" =~ "No such file or directory" ]]; then
						echo "Problem uploading file" >&2
						return 1
					fi
				done

}

sftp_put() {
	dir="$( dirname "$1" )"
	while [ "$dir" != "." ] ; do
		echo "mkdir \"$dir\""
		dir="$( dirname "$dir" )"
	done

	echo "put \"$1\" \"$1\""
}

sftp_rm() {
    echo "rm \"$file\""
}

echo ""
echo "Updating md5sum.php script [for real]"
sftp_put www/maintenance/md5sum.php | sftp_exec

echo "Getting the md5 from local"
wget --quiet --content-on-error "http://localhost:5555/maintenance/md5sum.php?filter=local" -O "$TMP"deploy-local.txt

echo "Getting the md5 from remote"
wget --quiet --content-on-error "http://www.cryptomedic.org/maintenance/md5sum.php?filter=remote" -O "$TMP"deploy-remote.txt

echo "Sorting local file"
sort --stable "$TMP"deploy-local.txt > "$TMP"deploy-local.sorted.txt

echo "Sorting remote file"
sort --stable "$TMP"deploy-remote.txt > "$TMP"deploy-remote.sorted.txt

echo "Building the diff"
diff -u "$TMP"deploy-remote.sorted.txt "$TMP"deploy-local.sorted.txt | tee "$TMP"deploy-diff-1-raw.txt \
	| grep -e "^[+-]"  | grep -v "^+++" | grep -v "^---" | tee "$TMP"deploy-diff-2-filtered.txt \
    | cut -c 1,13- | tee "$TMP"deploy-diff-3-changed.txt
	| sort -r > "$TMP"deploy-diff-4-sorted.txt \
	| while read -r lfile; do
		file=${lfile:1}
        if [ "${lfile:0:1}" == "+" ]; then
			sftp_put "$file"
        else
			sftp_rm "$file"
        fi
    done | tee "$TMP"deploy-diff-5-sftp-commands.txt

if [ "$1" == "commit" ]; then
    echo "*** Commiting ***"
	cat "$TMP"deploy-diff-5-sftp-commands.txt | sftp_exec

    echo "Upgrading database"
    wget -O - --quiet --content-on-error "http://www.cryptomedic.org/maintenance/patch_db.php?pwd=${CRYPTOMEDIC_DB_UPGRADE}"
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
