
ARG PHP_VERSION

FROM php:${PHP_VERSION}-apache

ENV HOME=/home/runner
RUN mkdir -p "$HOME" && chmod a+rwx "$HOME"

# Add packages for composer
RUN apt update && apt install --yes git zip

# Configure Apache
RUN a2enmod expires rewrite

RUN rm -fr /etc/apache2/sites-enabled/*.conf

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# mbstring, xml already installed
RUN install-php-extensions pdo_mysql xdebug intl gd zip

#
# All files created by the server will be ugo+rw and folders will be ugo+rwx
#   default unlimited permissions for: files=0666 folders=0777
# See: https://unix.stackexchange.com/a/337184/240487
#
# [For dev only?]
RUN echo "umask 0000" >> /etc/apache2/envvars

# Add composer.phar
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/ \
    && chmod +x /composer.phar

# Add project in it
ADD . /

WORKDIR /app
