#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")

cd PRJ_DIR

git clean -d -x -f
git pull
