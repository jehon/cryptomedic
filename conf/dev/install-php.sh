#!/usr/bin/env bash

set -e

mkdir -p /setup/tmp
mkdir -p /setup/composer

# PHP: https://www.tecmint.com/install-different-php-versions-in-ubuntu/

add-apt-repository --yes ppa:ondrej/php
apt-get install --yes php7.3 php7.3-xdebug php7.3-mbstring php7.3-xml
# php7.3-curl php7.3-gd php7.3-intl php7.3-json

update-alternatives --set php /usr/bin/php7.3

# Note: to specify composer version: | php -- --version 1.9.3
curl https://getcomposer.org/installer \
    --location --silent --output /setup/tmp/get-composer.sh

chmod +x /setup/tmp/get-composer.sh

cd /setup/composer || exit 1
php /setup/tmp/get-composer.sh

ln -s /setup/composer/composer.phar /usr/local/bin/composer
