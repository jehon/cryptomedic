#!/bin/bash

# SOURCE="${BASH_SOURCE[0]}"
# while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
#   DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
#   SOURCE="$(readlink "$SOURCE")"
#   [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
# done
# PRJ_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#PRJ_DIR=$(realpath "$PRJ_DIR")
PRJ_DIR=$(dirname "$PRJ_DIR")

echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

for V in api/* ; do
  echo -e "\e[1m\e[45mBuilding version $V\e[0m"
  cd "$PRJ_DIR/$V" && vendor/bin/phpunit
  RES=$?
  if cd "$PRJ_DIR/$V" && vendor/bin/phpunit; then
    echo "ok"
  else
    echo "failed"
    return 1;
  fi
  echo "Result: $RES"
done

echo -e "\e[1m\e[45mAll test terminated $V\e[0m"
