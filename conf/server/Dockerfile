#
# https://hub.docker.com/_/php
#
# See https://github.com/docker-library/docs/blob/master/php/variant-apache.md
#
FROM php:7.4-apache

RUN a2enmod expires rewrite

ENV APACHE_DOCUMENT_ROOT /app/www
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# mbstring, xml already installed
RUN install-php-extensions gd pdo_mysql xdebug

COPY ssmtp.conf /etc/ssmtp/ssmtp.conf

COPY php.ini /etc/php/7.3/apache2/conf.d/99-php.ini

RUN mkdir -p \
    /tmp/laravel/framework \
    /tmp/laravel/framework/cache \
    /tmp/laravel/framework/sessions \
    /tmp/laravel/framework/views \
    /tmp/laravel/app \
    /tmp/laravel/app/public \
    /tmp/laravel/logs

RUN chmod -R 777 /tmp/laravel/

WORKDIR /app
