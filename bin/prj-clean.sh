#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")

if [ "$1" = "help" ]; then
  cat <<-EOL
  This script remove temporary scripts from all around:
  - tmp
  - build dir (in www/build)
  - tmp in Laravel api (in /api/vxxx/storage and /api/vxxx/tmp)
EOL
  exit 0
fi

set -e

cd "$PRJ_DIR"

if [ -d "$PRJ_DIR/tmp" ]; then
  echo -e "\e[0;45mRemoving tmp (test results)\e[0m"
  find "$PRJ_DIR/tmp/" -mindepth 1 -not -name ".gitignore" -not -name ".gitkeep" -delete;
fi

if [ -d "$PRJ_DIR/www/build" ]; then
  echo -e "\e[0;45mRemoving build (webpack)\e[0m"
  find "$PRJ_DIR/www/build" -mindepth 1 -not -name ".gitignore" -not -name ".gitkeep" -delete;
fi

if [ -d "$PRJ_DIR/api/" ]; then
  for V in "$PRJ_DIR"/api/* ; do
    echo -e "\e[0;45mRemoving storage in `basename \"$V\"`\e[0m"
    N=`basename "$V"`
    find "$V/storage/" -type f -not -name ".gitignore" -not -name ".gitkeep" -delete

    echo -e "\e[0;45mRemoving tmp in `basename \"$V\"`\e[0m"
    N=`basename "$V"`
    find "$V/tmp/" -mindepth 1 -not -name ".gitignore" -not -name ".gitkeep" -delete
  done
fi

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
