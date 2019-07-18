#!/usr/bin/env bash

set -e

cd "$PRJ_DIR"

for V in v* ; do
	cd "$V" || exit 255
	echo "Version $V (`pwd`)"
    composer install
	cd ..
done

cd "$PRJ_DIR"

popd
