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

for V in v* ; do
	cd $V
	echo "Version $V (`pwd`)"
	REPORTS="../../../target/php$V"
	mkdir -p $REPORTS
	chmod a+wx $REPORTS
	./vendor/bin/phpunit  --coverage-html $REPORTS --coverage-xml $REPORTS 
	cd ..
done

cd $PRJ_DIR

chmod a+rwX target/
