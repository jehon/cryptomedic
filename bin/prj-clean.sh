#!/bin/bash

set -e

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

if [ -d "$PRJ_DIR/tmp" ]; then
  echo -e "\e[0;45mRemoving tmp (test results)\e[0m"
  find "$PRJ_DIR/tmp/" -mindepth 1 -not -name ".gitignore" -not -name ".gitkeep" -delete;
fi

for V in "$PRJ_DIR"/api/* ; do
  echo -e "\e[0;45mRemoving storage in `basename \"$V\"`\e[0m"
  N=`basename "$V"`
  find "$V/storage/" -type f -not -name ".gitignore" -not -name ".gitkeep" -delete

  echo -e "\e[0;45mRemoving tmp in `basename \"$V\"`\e[0m"
  N=`basename "$V"`
  find "$V/tmp/" -mindepth 1 -not -name ".gitignore" -not -name ".gitkeep" -delete
done

exit 0

echo -e "\e[0;45mReset the database\e[0m"
"$PRJ_DIR/bin/prj-rebuild-db.sh"

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
