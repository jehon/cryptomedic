# https://hub.docker.com/_/ubuntu/

FROM ubuntu:19.10

WORKDIR /app

RUN DEBIAN_FRONTEND=noninteractive apt update

# enable some extensions
RUN DEBIAN_FRONTEND=noninteractive apt install -y \
	curl rsync \
	apache2 php libapache2-mod-php php-mysql \
	php-curl php-gd php-intl php-json php-mbstring php-xml php-zip \
	ssmtp \
	unzip

RUN a2enmod expires rewrite

RUN sed -ri -e 's!/var/www/html!/app/www!g' /etc/apache2/sites-available/*.conf
COPY conf/server/custom.conf /etc/apache2/conf-enabled/
COPY conf/server/php.ini /etc/php/7.2/apache2/conf.d/99-php.ini

RUN cd /usr/local/bin && curl -s https://getcomposer.org/installer | php
RUN ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

COPY conf/server/ssmtp.conf /etc/ssmtp/ssmtp.conf

# https://stackoverflow.com/a/49765176/1954789
CMD apachectl -D FOREGROUND


