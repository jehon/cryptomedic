
ARG PHP_VERSION

FROM php:${PHP_VERSION}-apache

ENV HOME=/home/runner
RUN mkdir -p "$HOME" && chmod a+rwx "$HOME"

RUN a2enmod expires rewrite

RUN rm -fr /etc/apache2/sites-enabled/*.conf

RUN apt update && apt install --yes git zip

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# mbstring, xml already installed
RUN install-php-extensions pdo_mysql xdebug intl gd

RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/ \
    && chmod +x /composer.phar
ADD . /

# All files created by the server will be ugo+rw and folders will be ugo+rwx
#   default unlimited permissions for: files=0666 folders=0777
# See: https://unix.stackexchange.com/a/337184/240487
RUN echo "umask 0000" >> /etc/apache2/envvars

WORKDIR /app
