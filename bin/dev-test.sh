#!/bin/bash

# Test the application
# The tests that need gui will be run with xvfb-run unless FRONT is set
# The script will look in each folder in tests/, and for each of theses, look for
# phpunit.xml, karma.conf.js, nightwatch.js (see testDir())


# Stop on error
set -e

# This script can be called from outside the vagrant to help debug the end2end tests
# PRJ_DIR is thus relative to current path
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

cd "$PRJ_DIR"

myHeader() {
  echo -ne "\e[0;45m"
  if [ "$2" != "" ]; then
    N=`pwd`
    N=`basename "$N"`
    echo -ne "[\e[1;45m$N/$1\e[0;45m] "
    shift
  fi
  echo -ne "$1"
  echo -e "\e[0m"
}

mxvfb() {
  if [ "$FRONT" = "" ]; then
    # Run it in xvfb
    xvfb-run --auto-servernum --server-args='-screen 0 1024x768x24 -ac +extension GLX +render -noreset' "$@"
  else
    # Run it live if FRONT is specified
    "$@"
  fi
}

testPHPUnit() {
  N=`pwd`
  N=`basename "$N"`
  L="$1"
  shift

  myHeader "phpunit" "Testing $L"
  $PRJ_DIR/vendor/bin/phpunit \
      --coverage-html   "$PRJ_DIR/tmp/$N" \
      --coverage-xml    "$PRJ_DIR/tmp/$N" \
      "$@"
}

testJSUnit() {
  L="$1"
  shift

  myHeader "karma" "Testing $L"
  ARGS=""
  # http://bahmutov.calepin.co/debugging-karma-unit-tests.html
  if [ "$FRONT" ]; then
    ARGS="--single-run=false --debug"
  fi
  mxvfb ../../node_modules/.bin/karma start --single-run $ARGS "$@"

}

testEnd2End() {
  L="$1"
  shift

  myHeader "nightwatch" "Testing $L"
  mxvfb node "$PRJ_DIR/node_modules/.bin/nightwatch" -e default "$@"
}

test_dir() {
  if [ -r nightwatch.json ]; then
    testEnd2End "$@"
  fi

  if [ -r nightwatch.conf.js ]; then
    testEnd2End "$@"
  fi

  if [ -r karma.conf.js ]; then
    testJSUnit "$@"
  fi

  if [ -r phpunit.xml ]; then
    testPHPUnit "$@"
  fi
}

if [ "$FRONT" != "" ]; then
  myHeader "Running in FRONT mode - not using xvfb-run anymore"
fi

if [ "$1" ]; then
  myHeader "Test override to path $1"
  D="$1"
  shift
  cd "$D" && test_dir "Override $D" "$@"
else
  myHeader "Reset the environnement"
  "$PRJ_DIR/bin/dev-reset.sh"

  if [ -d "$PRJ_DIR/www/build" ]; then
    myHeader "Cleaning old build"
    find "$PRJ_DIR/www/build/" -mindepth 1 -delete
  fi

  myHeader "Rebuild for production"
  find "$PRJ_DIR/www/build/" -mindepth 1 -delete
  npm run build

  # Test each api/* folder
  for V in "$PRJ_DIR"/www/api/* ; do
    N=`basename "$V"`
    cd "$V" && test_dir "version www/api/$N"
  done

  # Test each tests/* folder
  for T in "$PRJ_DIR"/tests/* ; do
    N=`basename "$T"`
    TITLE="Custom test $N"
    if [ -d "$T" ]; then
      cd "$T" && test_dir "$TITLE"
    fi
  done
fi

myHeader "Terminated ok"
