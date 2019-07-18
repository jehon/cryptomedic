#!/usr/bin/env bash

set -e
set -x

pushd "$PRJ_DIR/www/api"

type php
type composer
php --version
composer --version

for V in v* ; do
	cd "$V" || exit 255
	echo "Version $V (`pwd`)"
    composer install
	cd ..
done

cd "$PRJ_DIR"

popd
