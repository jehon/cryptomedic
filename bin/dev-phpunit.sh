#!/bin/bash

set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Test install of php-xdebug
# php -i | grep xdebug
# apt update && apt install php-xdebug

cd "$PRJ_DIR"
mkdir -p target
chmod a+rwx target

cd "$PRJ_DIR/www/api"

if [ "$1" == "COMMIT" ]; then
	echo "Setting COMMIT"
	export COMMIT=1
    shift
fi

testOne() {
	local T="$1"
	local V="$2"
	shift
	shift

	pushd "$V" >/dev/null || exit 255
	echo "Version $V ($(pwd))"

	if [[ -z "$T" ]] || [[ "$T" == "laravel" ]]; then
		if [ -f "phpunit.xml" ]; then
			echo "** Laravel $V starting **"
			REPORTS="$PRJ_DIR/target/php$V"
			mkdir -p "$REPORTS"
			chmod a+wx "$REPORTS"
			./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
			chmod -R a+wx "$REPORTS"
			echo "** Laravel $V done **"
		else
			echo "** Laravel $V: skipping because no phpunit.xml **"
		fi
	fi

	if [[ -z "$T" ]] || [[ "$T" == "bare" ]]; then
		if [ -f "public/phpunit.xml" ]; then
			pushd "public" >/dev/null || exit 255
			echo "** Bare $V starting **"

			REPORTS="$PRJ_DIR/target/php$V-bare"
			mkdir -p "$REPORTS"
			chmod a+wx "$REPORTS"
			./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
			chmod -R a+wx "$REPORTS"
			popd >/dev/null
			echo "** Bare $V done **"
		else
			echo "** Bare $V: skipping because no phpunit.xml **"
		fi
	fi
	popd >/dev/null
}

# 1: type (laravel/bare)
# 2: version
T="$1"
V="$2"
shift || true # If arg is missing, do not fail...
shift || true # If arg is missing, do not fail...

if [ -n "$T" ]; then
	if [[ -z "$V" ]]; then
		for Vi in v* ; do
			testOne "$T" "$Vi"
		done
	else
		testOne "$T" "$V"
	fi
else
	if [[ -z "$V" ]]; then
		for Vi in v* ; do
			testOne "" "$Vi"
		done
	else
		testOne "" "$V"
	fi
fi

cd "$PRJ_DIR"

chmod a+rwX target/
