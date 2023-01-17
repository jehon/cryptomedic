#!/usr/bin/env bash

set -o errexit

PHP_VERSION="7.3"

###############################
#
# Install php version $PHP_VERSION
#
#
echo "* Installing php version $PHP_VERSION"

mkdir -p /setup/tmp

# PHP: https://www.tecmint.com/install-different-php-versions-in-ubuntu/

add-apt-repository --yes ppa:ondrej/php
apt-get install --yes php${PHP_VERSION} php${PHP_VERSION}-xdebug php${PHP_VERSION}-mbstring php${PHP_VERSION}-xml php${PHP_VERSION}-mysql
# php${PHP_VERSION}-curl php${PHP_VERSION}-gd php${PHP_VERSION}-intl php${PHP_VERSION}-json

update-alternatives --set php /usr/bin/php${PHP_VERSION}

###############################
#
# Install composer
#
#
echo "* Installing composer"

mkdir -p /setup/composer

# Note: to specify composer version: | php -- --version 1.9.3
curl https://getcomposer.org/installer \
    --location --silent --output /setup/tmp/get-composer.sh

chmod +x /setup/tmp/get-composer.sh

cd /setup/composer || exit 1
php /setup/tmp/get-composer.sh
