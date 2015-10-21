#!/bin/bash

set -e

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

echo -e "\e[1m\e[45mNPM install\e[0m"
npm install

echo -e "\e[1m\e[45mComposer install\e[0m"
composer install

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
