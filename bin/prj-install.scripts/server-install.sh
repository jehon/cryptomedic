#!/usr/bin/env bash

set -e

pushd /app/www/api/v1.3/
composer install

popd
