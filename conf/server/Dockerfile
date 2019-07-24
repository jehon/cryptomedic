# https://hub.docker.com/_/ubuntu/

FROM ubuntu:19.04

WORKDIR /app

RUN DEBIAN_FRONTEND=noninteractive apt update

# enable some extensions
RUN DEBIAN_FRONTEND=noninteractive apt install -y \
	curl rsync \
	apache2 php libapache2-mod-php php-mysql \
	php-curl php-gd php-intl php-json php-mbstring php-xml php-zip \
	ssmtp \
	unzip

#    libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libpng-dev

	# && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    # && docker-php-ext-install -j$(nproc) gd

# RUN pecl install xdebug-2.6.0 \
# 	&& docker-php-ext-enable xdebug  \
# RUN docker-php-ext-install pdo_mysql
RUN a2enmod expires rewrite

# AllowOverride all

RUN sed -ri -e 's!/var/www/html!/app/www!g' /etc/apache2/sites-available/*.conf
COPY conf/server/custom.conf /etc/apache2/conf-enabled/
COPY conf/server/php.ini /etc/php/7.2/apache2/conf.d/99-php.ini

RUN cd /usr/local/bin && curl -s https://getcomposer.org/installer | php
RUN ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

COPY conf/server/ssmtp.conf /etc/ssmtp/ssmtp.conf

# https://stackoverflow.com/a/49765176/1954789
CMD apachectl -D FOREGROUND


