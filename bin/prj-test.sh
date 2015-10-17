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

cd "$PRJ_DIR/.."

for V in api/* ; do
  cd "$PRJ_DIR/$V" && vendor/bin/phpunit
done
