#!/bin/bash

# Stop on error
set -e

if [ -r nightwatch.json ] || [ -r nightwatch.conf.js ]; then
  P=`PWD`
  P=`basename "$P"`

  echo "JS End2End [$P]"
  $PRJ_DIR/bin/prj-xvfb-run.sh node "$PRJ_DIR/node_modules/.bin/nightwatch" -e default "$@"
fi
