# https://hub.docker.com/_/ubuntu/

# use https://hub.docker.com/_/php ?
# FROM php:7.3-apache

FROM ubuntu:20.10

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update

# enable some extensions
RUN apt-get install -y \
	apache2 \
	php libapache2-mod-php  \
	php-xdebug php-mysql php-curl php-gd php-mbstring php-xml \
	ssmtp

RUN a2enmod expires rewrite

COPY ssmtp.conf /etc/ssmtp/ssmtp.conf

COPY website.conf /etc/apache2/sites-enabled/website.conf
RUN rm -fr /etc/apache2/sites-enabled/000-default.conf
COPY php.ini /etc/php/7.2/apache2/conf.d/99-php.ini

COPY start.sh /start.sh
RUN chmod +x /start.sh

# https://stackoverflow.com/a/49765176/1954789
CMD /start.sh
