#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
cd "$PRJ_DIR"

if [ "$1" = "help" ]; then
  cat <<-EOL
  Test the application
  The tests that need gui will be run with xvfb-run unless DEBUG is set

  The script will look in each folder in tests/, and for each of theses, look for
  phpunit.xml, karma.conf.js, nightwatch.js (see testDir())
EOL
  exit 0
fi

set -e

export XVFB_ARGS="--auto-servernum --server-args=-screen=1024x768x24 -ac +extension GLX +render -noreset"
XVFB='xvfb-run'
#--auto-servernum --server-args="-screen=1024x768x24 -ac +extension GLX +render -noreset" '
# --server-args='-screen 0 1024x768x24 -ac +extension GLX +render -noreset'"

mxvfb() {
  if [ "$DEBUG" != "" ]; then
    xvfb-run --auto-servernum --server-args='-screen 0 1024x768x24 -ac +extension GLX +render -noreset' "$@"
  else
    "$@"
  fi
}

testPHPUnit() {
  N=`pwd`
  N=`basename "$N"`
  L="$1"
  shift

  echo -e "\e[0;45m[\e[1;45m$N/phpunit\e[0;45m] Testing $L\e[0m"
  $PRJ_DIR/vendor/bin/phpunit \
      --coverage-html   "$PRJ_DIR/tmp/$N" \
      --coverage-xml    "$PRJ_DIR/tmp/$N" \
      "$@"
}

testJSUnit() {
  N=`pwd`
  N=`basename "$N"`
  L="$1"
  shift

  echo -e "\e[0;45m[\e[1;45m$N/karma\e[0;45m] Testing $L\e[0m"
  ARGS=""
  # http://bahmutov.calepin.co/debugging-karma-unit-tests.html
  if [ "$DEBUG" ]; then
    ARGS="--single-run=false --debug"
  fi
  mxvfb ../../node_modules/.bin/karma start --single-run $ARGS "$@"

}

testEnd2End() {
  N=`pwd`
  N=`basename "$N"`
  L="$1"
  shift

  echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Testing $L\e[0m"
  mxvfb node "$PRJ_DIR/node_modules/.bin/nightwatch" -e default "$@"
}

test_dir() {
  if [ -r nightwatch.json ]; then
    testEnd2End "$@"
  fi

  if [ -r karma.conf.js ]; then
    testJSUnit "$@"
  fi

  if [ -r phpunit.xml ]; then
    testPHPUnit "$@"
  fi
}


if [ "$DEBUG" != "" ]; then
  echo "\e[0;45mRunning in debug mode - not using xvfb-run anymore\e[0m"
fi

if [ "$1" ]; then
  echo "Test override to path $1"
  D="$1"
  shift
  cd "$PRJ_DIR/$D" && test_dir "Override $D" "$@"
else
  echo -e "\e[0;45mCleaning old tests\e[0m"
  if [ -d "$PRJ_DIR/tmp" ]; then
    find "$PRJ_DIR/tmp/" -mindepth 1 -delete
  else
    mkdir -p "$PRJ_DIR/tmp"
  fi

  echo -e "\e[0;45mReset the database\e[0m"
  "$PRJ_DIR/bin/prj-db-reset.php"

  echo -e "\e[0;45mRebuild for production\e[0m"
  find "$PRJ_DIR/www/build/" -mindepth 1 -delete
  npm run build

  for V in "$PRJ_DIR"/www/api/* ; do
    N=`basename "$V"`
    cd "$V" && test_dir "version www/api/$N"
  done

  for T in "$PRJ_DIR"/tests/* ; do
    N=`basename "$T"`
    TITLE="Custom test $N"
    if [ -d "$T" ]; then
      cd "$T" && test_dir "$TITLE"
    fi
  done
fi

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
