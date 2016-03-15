#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

if [ "$1" = "help" ]; then
  cat <<-EOL
    Install dependancies according to
    - package.json
    - composer.json (install composer if necessary)
    - if a "GITHUB_OAUTH_TOKEN" is set in env, configure it into composer cache
EOL
  exit 0
fi

cd "$PRJ_DIR"

if [ -e package.json ]; then
  echo -e "\e[1m\e[45mNPM install\e[0m"
  npm install
fi

if [ -e composer.json ]; then
  if [ -n "$GITHUB_OAUTH_TOKEN" ]; then
    echo "setting composer oauth"
    composer config github-oauth.github.com "${GITHUB_OAUTH_TOKEN}"
    echo "result: $?"
  else
    echo "no github OAuth found"
  fi

  echo -e "\e[1m\e[45mComposer install\e[0m"
  composer.phar install
fi

echo -e "\e[1m\e[45mTerminated ok.\e[0m"
