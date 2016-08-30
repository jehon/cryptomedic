#!/bin/bash

# Stop on error
set -e

if [ -r karma.conf.js ]; then
  P=`PWD`
  P=`basename "$P"`

  echo "JS Unit [$P]"

  # http://bahmutov.calepin.co/debugging-karma-unit-tests.html
  if [ "$FRONT" ]; then
    ARGS="--single-run=false --debug"
  fi
  $PRJ_DIR/bin/prj-xvfb-run.sh ../../node_modules/.bin/karma start --single-run $ARGS "$@"
fi
