#!/bin/bash

# Test the application
# The tests that need gui will be run with xvfb-run unless FRONT is set
# The script will look in each folder in tests/, and for each of theses, look for
# phpunit.xml, karma.conf.js, nightwatch.js (see testDir())

# Stop on error
set -e

# Make a pipe fail if any command in it fail
# Thanks to http://stackoverflow.com/a/19804002/1954789
set -o pipefail

# This script can be called from outside the vagrant to help debug the end2end tests
# PRJ_DIR is thus relative to current path
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

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

test_dir() {
  # Run project custom files
  run-parts --report $PRJ_DIR/bin/dev-test.d | sed -e "s#^#[$1] #"
}

if [ "$1" ]; then
  myHeader "Test override to path $1"
  D="$1"
  shift
  cd "$D" && test_dir "Override $D" "$@"
else
  cd "$PRJ_DIR"

  myHeader "Reset the environnement"
  "$PRJ_DIR/bin/dev-reset.sh" | sed -e 's/^/[reset] /'

  myHeader "Build the application"
  npm run build

  # Test each api/* folder
  for V in "$PRJ_DIR"/www/api/* ; do
    N=`basename "$V"`
    cd "$V" && test_dir "version $N"
  done

  # Test each tests/* folder
  for T in "$PRJ_DIR"/tests/* ; do
    N=`basename "$T"`
    TITLE="$N"
    if [ -d "$T" ]; then
      cd "$T" && test_dir "$TITLE"
    fi
  done
fi

myHeader "Terminated ok"
