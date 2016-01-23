#!/bin/bash

set -e

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"
PHPUNIT="$PRJ_DIR/vendor/bin/phpunit"

if [ "$TRAVIS" ]; then
  PHPUNIT=phpunit
fi

cd "$PRJ_DIR"

test_dir() {
  # $1 = the name of the test

  N=`pwd`
  N=`basename "$N"`
  L="$1"
  shift
  if [ -r phpunit.xml ]; then
    echo -e "\e[0;45m[\e[1;45m$N/phpunit\e[0;45m] Testing $L\e[0m"
    $PHPUNIT \
        --coverage-html   "$PRJ_DIR/tmp/$N" \
        --coverage-xml    "$PRJ_DIR/tmp/$N" \
        "$@"
  fi

  if [ -r nightwatch.json ]; then
    echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Testing $L\e[0m"
    echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Starting server\e[0m"
    cd $PRJ_DIR
    BYPASS_AUTHENTICATION=1 php -S localhost:1234 tests/router.php -t . &
    PHPSERV=$!
    cd - > /dev/null
    echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Starting Test\e[0m"
    if [ "$FRONT" ]; then
      node $PRJ_DIR/node_modules/.bin/nightwatch "$@"
    else
      node $PRJ_DIR/node_modules/.bin/nightwatch -e default "$@"
      # node $PRJ_DIR/node_modules/.bin/nightwatch -e default,chrome "$@"
    fi

    echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Stoping server @$PHPSERV\e[0m"
    kill -s SIGINT $PHPSERV
  fi

  if [ -r karma.conf.js ]; then
    echo -e "\e[0;45m[\e[1;45m$N/karma\e[0;45m] Testing $L\e[0m"
    ARGS=""
    # http://bahmutov.calepin.co/debugging-karma-unit-tests.html
    if [ "$DEBUG" ]; then
      ARGS="--single-run=false --debug"
    fi
    ../../node_modules/.bin/karma start --single-run $ARGS "$@"
  fi
}


if [ "$FRONT" = "" ]; then
  # If FRONT is not set, then do that is the background
  export DISPLAY=:99.0
fi

if [ "$DEBUG" != "" ]; then
  echo "\e[0;45mRunning in debug mode\e[0m"
fi

if [ "$1" ]; then
  echo "Test override to path $1"
  D="$1"
  shift
  cd "$PRJ_DIR/$D" && test_dir "Override $D" "$@"
else
  clear
  clear
  echo -e "\e[0;45mCleaning old tests\e[0m"
  if [ -d "$PRJ_DIR/tmp" ]; then
    find "$PRJ_DIR/tmp/" -mindepth 1 -delete;
  else
    mkdir -p "$PRJ_DIR/tmp"
  fi

  echo -e "\e[0;45mReset the database\e[0m"
  "$PRJ_DIR/bin/prj-rebuild-db.sh"

  echo -e "\e[0;45mRebuild for production\e[0m"
  find "$PRJ_DIR/build/" -mindepth 1 -delete
  npm run build

  for V in "$PRJ_DIR"/api/* ; do
    N=`basename "$V"`
    cd "$V" && test_dir "version api/$N"
  done

  for T in "$PRJ_DIR"/tests/* ; do
    N=`basename "$T"`
    TITLE="Custom test $N"
    if [ -d "$T" ]; then
      cd "$T" && test_dir "$TITLE"
    fi
  done

  if [ -r "tmp/router.log" ]; then
    echo -e "\e[0;45mRouter.log\e[0m"
    cat tmp/router.log | sort | uniq
  fi
fi

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
