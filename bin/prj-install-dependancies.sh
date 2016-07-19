#!/bin/bash

# Install dependancies according to
# - package.json
# - composer.json
#   * install composer if necessary
#   * if a "GITHUB_OAUTH_TOKEN" is set in env, configure it into composer cache

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")


cd "$PRJ_DIR"

if [ -r "$PRJ_DIR"/prj-install-dependancies-custom.sh ]; then
  "$PRJ_DIR"/prj-install-dependancies-custom.sh
fi

if [ -e package.json ]; then
  echo -e "\e[1m\e[45mNPM install\e[0m"
  npm install
fi

if [ -e composer.json ]; then
  # Configure the OAUTH
  if [ -n "$GITHUB_OAUTH_TOKEN" ]; then
    echo -e "\e[1m\e[45mSetting the OAUTH token\e[0m"
    composer config github-oauth.github.com "${GITHUB_OAUTH_TOKEN}"
    echo "result: $?"
  else
    echo "no github OAuth found"
  fi

  echo -e "\e[1m\e[45mComposer install\e[0m"
  composer.phar install
fi

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
