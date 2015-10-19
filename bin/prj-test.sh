#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

test_phpunit() {
  # $1 = technical name of the test
  # $2 = the name of the test
  if [ ! -r phpunit.xml ]; then
    return 0
  fi
  N=`pwd`
  N=`basename "$N"`
  echo name $N

  echo -e "\e[0;45mTesting \e[1;45m$2\e[0;45m [phpunit/$1]\e[0m"
#      --coverage-clover "$PRJ_DIR/tmp/$1.clover" \
  if $PRJ_DIR/vendor/bin/phpunit \
      --coverage-html   "$PRJ_DIR/tmp/$1" \
      --coverage-xml    "$PRJ_DIR/tmp/$1" \
      ; then
    echo -e "\e[0;45mTesting \e[1;45m$2\e[0;45m [phpunit/$1]: \e[1;42msuccess.\e[0m"
  else
    echo -e "\e[0;45mTesting \e[1;45m$2\e[0;45m [phpunit/$1]: \e[1;41mfailed\e[0m"
    exit 1;
  fi

}

for V in "$PRJ_DIR"/api/* ; do
  N=`basename "$V"`
  cd "$V" && test_phpunit  "$N" "version api/$N"
done

for T in "$PRJ_DIR"/tests/* ; do
#  if [ -r "$T/phpunit.xml" ]; then
      N=`basename "$T"`
      cd "$T" && test_phpunit "$N" "custom test $N"
#  fi
done

echo -e "\e[1m\e[45mAll test terminated $V\e[0m"
