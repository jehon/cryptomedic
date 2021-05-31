#!/bin/bash

#
# To protect a version, please see md5sum.php (at the bottom)
#

# Stop on error
# Thanks to https://unix.stackexchange.com/a/462157/240487
set -eE -o functrace
set -o pipefail

CR_SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# shellcheck source=./cr-lib
. "$CR_SCRIPT_DIR"/cr-lib

cr-ensure-started

failure() {
	set +x
	echo "Failed at $1: $2"
}
trap 'failure ${LINENO} "$BASH_COMMAND"' ERR

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
	echo "open -u $CRYPTOMEDIC_UPLOAD_USER,$CRYPTOMEDIC_UPLOAD_PASSWORD $CRYPTOMEDIC_UPLOAD_HOST"
}

rm -f sftp.log

sftp_exec() {
	SSHPASS="$CRYPTOMEDIC_UPLOAD_PASSWORD" sshpass -e \
		sftp "$CRYPTOMEDIC_UPLOAD_USER@$CRYPTOMEDIC_UPLOAD_HOST" \
		2>&1 |
		tee -a sftp.log |
		grep -v "Connected to" |
		grep -v "Couldn't create directory" |
		(grep -v "^sftp" || [[ $? == 1 ]]) |
		while read -r R; do
			echo "$R"
			if [[ "$R" =~ "No such file or directory" ]]; then
				echo "Problem uploading file" >&2
				return 1
			fi
		done
	echo "**********" >>sftp.log
}

sftp_put() {
	dir="$(dirname "$1")"
	while [ "$dir" != "." ]; do
		echo "mkdir \"$dir\""
		dir="$(dirname "$dir")"
	done

	echo "put \"$1\" \"$1\""
}

sftp_rm() {
	echo "rm \"$file\""
}

echo ""
echo "Updating md5sum.php script [for real]"
(
	sftp_put www/maintenance/md5sum.php
	sftp_put deploy-filter
	sftp_rm www/api/v1.3/bootstrap/cache/packages.php
	sftp_rm www/api/v1.3/bootstrap/cache/services.php
) | sftp_exec

echo "Getting the md5 from local"
wget --quiet --content-on-error "http://localhost:${CRYPTOMEDIC_PORT:-5080}/maintenance/md5sum.php?filter=local" -O "$CR_TMP"/deploy-local.txt

echo "Getting the md5 from remote"
wget --quiet --content-on-error "http://www.cryptomedic.org/maintenance/md5sum.php?filter=remote" -O "$CR_TMP"/deploy-remote.txt

echo "Sorting local file"
sort --stable "$CR_TMP"/deploy-local.txt >"$CR_TMP"/deploy-local.sorted.txt

echo "Sorting remote file"
sort --stable "$CR_TMP"/deploy-remote.txt >"$CR_TMP"/deploy-remote.sorted.txt

if diff -u "$CR_TMP"/deploy-remote.sorted.txt "$CR_TMP"/deploy-local.sorted.txt; then
	echo "No diff found"
	exit 0
fi
echo "Building the diff"
{
	diff -u "$CR_TMP"/deploy-remote.sorted.txt "$CR_TMP"/deploy-local.sorted.txt || true
} | tee "$CR_TMP"/deploy-diff-1-raw.txt |
	grep -e "^[+-]" | grep -v "^+++" | grep -v "^---" | tee "$CR_TMP"/deploy-diff-2-filtered.txt |
	cut -c 1,13- | tee "$CR_TMP"/deploy-diff-3-changed.txt |
	LC_ALL=POSIX sort -k1.2 -k1.1r | tee "$CR_TMP"/deploy-diff-4-sorted.txt |
	{
		while read -r lfile; do
			file="${lfile:1}"
			if [ "${lfile:0:1}" == "+" ]; then
				sftp_put "$file"
			else
				sftp_rm "$file"
			fi
		done
	} >"$CR_TMP"/deploy-diff-5-sftp-commands.txt

if [ -r "$CR_TMP"/deploy-diff-4-sorted.txt ]; then
	echo "-------------- Differences --------------"
	echo "-------------- Differences --------------"
	echo "-------------- Differences --------------"
	cat "$CR_TMP"/deploy-diff-4-sorted.txt
	echo "-------------- Differences --------------"
	echo "-------------- Differences --------------"
	echo "-------------- Differences --------------"

	if [ "$1" == "commit" ]; then
		echo "*** Commiting ***"
		sftp_exec <"$CR_TMP"/deploy-diff-5-sftp-commands.txt
	else
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		cat "$CR_TMP"/deploy-diff-5-sftp-commands.txt
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		echo "!!!!!!!!!!!!!!!!!!! TEST MODE !!!!!!!!!!!!!!!!!!!!!!"
		echo ""
		echo "To really commit, use:"
		echo "$0 commit"
		echo ""
	fi
fi

# Variable necessary for refresh.sh scripts
export CRYPTOMEDIC_HTTP_HOST="www.cryptomedic.org"
export CRYPTOMEDIC_DB_UPGRADE

"$CR_SCRIPT_DIR/"cryptomedic-refresh-structure.sh

echo "*** End ***"
echo "*** End ***"
echo "*** End ***"
