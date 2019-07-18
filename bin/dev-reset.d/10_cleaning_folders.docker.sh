#!/bin/bash

set -e

# Make it back executable
chmod +x "$PRJ_DIR"/node_modules/.bin/* || true
chmod +x "$PRJ_DIR"/www/api/*/vendor/bin/* || true

# Clean up .../target
mkdir -p "$PRJ_DIR/target"
find "$PRJ_DIR/target/" -mindepth 1 ! -name '.gitkeep' -delete

# Clean up logs
find . -name "*.log" -delete

# Clean up built artifacts
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

touch "$PRJ_DIR/live/.gitkeep"

rm -fr "/tmp/laravel"

mkdir -p "/tmp/laravel/framework"
mkdir -p "/tmp/laravel/framework"
mkdir -p "/tmp/laravel/framework/cache"
mkdir -p "/tmp/laravel/framework/sessions"
mkdir -p "/tmp/laravel/framework/views"
mkdir -p "/tmp/laravel/app"
mkdir -p "/tmp/laravel/app/public"
mkdir -p "/tmp/laravel/logs"

chmod -R 777 "/tmp/laravel/"

# laravel.log
mkdir -p /app/www/api/v1.3/storage/logs/
touch /app/www/api/v1.3/storage/logs/laravel.log
chmod a+rw /app/www/api/v1.3/storage/logs/laravel.log
