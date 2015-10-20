#!/bin/bash

PRJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PRJ_DIR=$(dirname "$PRJ_DIR")
echo "Project directory is $PRJ_DIR"

cd "$PRJ_DIR"

echo -e "\e[1m\e[45mNPM install $V\e[0m"
if npm install; then
    echo -e "\e[0;45mNPM install: \e[1;42msuccess.\e[0m"
  else
    echo -e "\e[0;45mNPM install: \e[1;41mfailed\e[0m"
    exit 1;
fi

echo -e "\e[1m\e[45mComposer install $V\e[0m"
if composer.phar install; then
    echo -e "\e[0;45mNPM install: \e[1;42msuccess.\e[0m"
  else
    echo -e "\e[0;45mNPM install: \e[1;41mfailed\e[0m"
    exit 1;
fi

echo -e "\e[1m\e[45mAll test terminated $V\e[0m"
