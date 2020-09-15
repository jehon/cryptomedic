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

for V in v* ; do
	cd "$V" || exit 255
	echo "Version $V ($(pwd))"
	echo "** Laravel $V **"
	REPORTS="$PRJ_DIR/target/php$V"
	mkdir -p "$REPORTS"
	chmod a+wx "$REPORTS"
	echo "Current folder: $(pwd)"
	./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
	chmod -R a+wx "$REPORTS"
	cd ..

	echo "** Bare $V **"
	cd "$V/public" || exit 255
	REPORTS="$PRJ_DIR/target/php$V-bare"
	mkdir -p "$REPORTS"
	chmod a+wx "$REPORTS"
	echo "Current folder: $(pwd)"
	./vendor/bin/phpunit  --coverage-html "$REPORTS" --coverage-xml "$REPORTS" "$@"
	chmod -R a+wx "$REPORTS"
	cd ..
done

cd "$PRJ_DIR"

chmod a+rwX target/
