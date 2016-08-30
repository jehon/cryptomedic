#!/bin/bash

# Stop on error
set -e

if [ -r phpunit.xml ]; then
  P=`PWD`
  P=`basename "$P"`

  echo "PHP Unit [$P]"

  $PRJ_DIR/vendor/bin/phpunit \
      --coverage-html   "$PRJ_DIR/tmp/$P" \
      --coverage-xml    "$PRJ_DIR/tmp/$P" \
      "$@"
fi
