
ARG PHP_VERSION

FROM php:${PHP_VERSION}-cli

RUN apt-get update && \
    apt-get install -y --no-install-recommends git unzip

RUN docker-php-ext-install pdo_mysql

# Install composer.phar at /composer.phar
RUN curl --silent --show-error https://getcomposer.org/installer | php
