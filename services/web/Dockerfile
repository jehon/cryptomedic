
ARG PHP_VERSION=8.2

FROM php:${PHP_VERSION}-apache

ENV HOME=/home/runner
RUN mkdir -p "$HOME" && chmod a+rwx "$HOME"

############################################################
#
# Apache
#
############################################################

# Add packages for composer
RUN apt update && apt install --yes git zip

# Configure Apache
RUN a2enmod expires rewrite

RUN rm -fr /etc/apache2/sites-enabled/*.conf

#
# All files created by the server will be ugo+rw and folders will be ugo+rwx
#   default unlimited permissions for: files=0666 folders=0777
# See: https://unix.stackexchange.com/a/337184/240487
#
# [For dev only?]
RUN echo "umask 0000" >> /etc/apache2/envvars

############################################################
#
# PHP
#
############################################################

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# mbstring, xml already installed
RUN install-php-extensions pdo_mysql xdebug intl gd zip


# Add composer.phar
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/ \
  && chmod +x /composer.phar

############################################################
#
# Custom settings
#
############################################################

# Add service's configurations
ADD root /

############################################################
#
# App
#
############################################################

WORKDIR /app

# For final image
COPY --from=project . .

# For GitLab services <== split image?
# ADD ??? /app/???

# Required by composer install for one package
RUN mkdir -p \
  www/api/bootstrap/cache \
  live/laravel/sessions \
  tmp/integration/webTemp

RUN cd www/api && /composer.phar --no-interaction install

RUN chmod a+rwX -R .

RUN php www/maintenance/reset.php
