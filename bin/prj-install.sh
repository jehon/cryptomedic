#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

echo -e "\e[1m\e[45mNPM install $V\e[0m"
npm install
echo -e "\e[1m\e[45mComposer install $V\e[0m"
composer.phar install

echo -e "\e[1m\e[45mAll test terminated $V\e[0m"
