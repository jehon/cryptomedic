
ARG PHP_VERSION

FROM php:${PHP_VERSION}-cli

RUN apt-get update && \
    apt-get install -y --no-install-recommends git unzip

RUN docker-php-ext-install pdo_mysql

# Thanks to https://stackoverflow.com/a/61700205/1954789
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# && { \
# echo "xdebug.mode=debug"; \
# } > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;
# && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
# && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini

# Install composer.phar at /composer.phar
RUN curl --silent --show-error https://getcomposer.org/installer | php
