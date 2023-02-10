
ARG PHP_VERSION=8.1

FROM php:${PHP_VERSION}-apache

RUN apt update && apt install --yes ssmtp

RUN a2enmod expires rewrite

RUN rm -fr /etc/apache2/sites-enabled/*.conf

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# mbstring, xml already installed
RUN install-php-extensions gd pdo_mysql xdebug

RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/

ADD . /

WORKDIR /app
