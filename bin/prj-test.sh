#!/bin/bash

set -e

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

test_dir() {
  # $1 = the name of the test

  N=`pwd`
  N=`basename "$N"`
  if [ -r phpunit.xml ]; then
    echo -e "\e[0;45m[\e[1;45m$N/phpunit\e[0;45m] Testing $1\e[0m"
    $PRJ_DIR/vendor/bin/phpunit \
        --coverage-html   "$PRJ_DIR/tmp/$N" \
        --coverage-xml    "$PRJ_DIR/tmp/$N"
  fi

  if [ -r nightwatch.json ]; then
    echo -e "\e[0;45m[\e[1;45m$N/nightwatch\e[0;45m] Testing $1\e[0m"
    node $PRJ_DIR/node_modules/.bin/nightwatch
  fi
}

if [ "$1" ]; then
  echo "Test override to path $1"
  cd "$PRJ_DIR/$1" && test_dir "Override $1"
  exit 0
fi

for V in "$PRJ_DIR"/api/* ; do
  N=`basename "$V"`
  cd "$V" && test_dir "version api/$N"
done

for T in "$PRJ_DIR"/tests/* ; do
  N=`basename "$T"`
  TITLE="Custom test $N"
  if [ -d "$T" ]; then
    cd "$T" && test_dir $TITLE
  fi
done

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
