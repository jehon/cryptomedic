#!/usr/bin/env bash

set -e

PHPVERSION="7.3"

###############################
#
# Install php version $PHPVERSION
#
#
echo "* Installing php version $PHPVERSION"

mkdir -p /setup/tmp

# PHP: https://www.tecmint.com/install-different-php-versions-in-ubuntu/

add-apt-repository --yes ppa:ondrej/php
apt-get install --yes php${PHPVERSION} php${PHPVERSION}-xdebug php${PHPVERSION}-mbstring php${PHPVERSION}-xml php${PHPVERSION}-mysql
# php${PHPVERSION}-curl php${PHPVERSION}-gd php${PHPVERSION}-intl php${PHPVERSION}-json

update-alternatives --set php /usr/bin/php${PHPVERSION}


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

ln -s /setup/composer/composer.phar /usr/local/bin/composer
