#!/bin/bash

if [ ! -r /usr/local/bin/composer.phar ]; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin
  chmod +x /usr/local/bin/composer.phar
fi
