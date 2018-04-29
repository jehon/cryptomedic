#!/bin/bash

set -e

# Clean up .../target
mkdir -p "$PRJ_DIR/target"
find "$PRJ_DIR/target/" -mindepth 1 ! -name '.gitkeep' -delete

# Clean up logs
find . -name "*.log" -delete

# Clean up builded artifacts
rm -fv "$PRJ_DIR/www/build/*"
rm -fv "$PRJ_DIR/www/static/index.html"

# Clean up .../live
# .gitkeep will be recreated by
find "$PRJ_DIR/live/" -mindepth 1 -type f -delete

echo "* Reset the live folder from live-for-test"
cp -v \
	--recursive \
	--preserve=mode,timestamp \
	"$PRJ_DIR/live-for-test"/* "$PRJ_DIR/live/"

touch $PRJ_DIR/live/.gitkeep
