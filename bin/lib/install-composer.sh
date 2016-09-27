#!/bin/bash

if [ ! -r /usr/local/bin/composer.phar ]; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin
  chmod +x /usr/local/bin/composer.phar
fi

# Configure the OAUTH
if [ -n "$GITHUB_OAUTH_TOKEN" ]; then
  echo -e "\e[1m\e[45mSetting the OAUTH token\e[0m"
  composer.phar config github-oauth.github.com "${GITHUB_OAUTH_TOKEN}"
  echo "result: $?"
else
  echo "no github OAuth found"
fi
