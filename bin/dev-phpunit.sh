#!/bin/bash

set -e
set -x

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

	echo "- Type: $T version: $V"

	pushd "$V" || exit 255
	echo "Version $V ($(pwd))"

	if [[ -z "$T" ]] || [[ "$T" == "laravel" ]]; then
		if [ -f "phpunit.xml" ]; then
			echo "** Laravel $V **"
			REPORTS="$PRJ_DIR/target/php$V"
			mkdir -p "$REPORTS"
			chmod a+wx "$REPORTS"
			./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
			chmod -R a+wx "$REPORTS"
		else
			echo "** Laravel $V: skipping because no phpunit.xml **"
		fi
	fi

	if [[ -z "$T" ]] || [[ "$T" == "bare" ]]; then
		if [ -f "public/phpunit.xml" ]; then
			pushd "public" || exit 255
			echo "** Bare $V **"

			REPORTS="$PRJ_DIR/target/php$V-bare"
			mkdir -p "$REPORTS"
			chmod a+wx "$REPORTS"
			./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
			chmod -R a+wx "$REPORTS"
			popd
		else
			echo "** Bare $V: skipping because no phpunit.xml **"
		fi
	fi
	popd
}

# 1: type (laravel/bare)
# 2: version
T="$1"
V="$2"
shift || true # If arg is missing, do not fail...
shift || true # If arg is missing, do not fail...

echo "Type: $T version: $V"

if [ -n "$T" ]; then
	if [[ -z "$V" ]]; then
		for Vi in v* ; do
			echo "T- Type: $T version: $V"
			testOne "$T" "$Vi"
		done
	else
		echo "TV Type: $T version: $V"
		testOne "$T" "$V"
	fi
else
	if [[ -z "$V" ]]; then
		for Vi in v* ; do
			echo "-- Type: $T version: $V"
			testOne "" "$Vi"
		done
	else
		echo "-V Type: $T version: $V"
		testOne "" "$V"
	fi
fi

cd "$PRJ_DIR"

chmod a+rwX target/
