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
	unzip \
	git

RUN a2enmod expires rewrite

COPY website.conf /etc/apache2/sites-enabled/website.conf
RUN rm -fr /etc/apache2/sites-enabled/000-default.conf
COPY php.ini /etc/php/7.2/apache2/conf.d/99-php.ini

# Note: to specify composer version: | php -- --version 1.9.3
RUN cd /usr/local/bin && curl -s https://getcomposer.org/installer | php
RUN ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

COPY ssmtp.conf /etc/ssmtp/ssmtp.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh

# https://stackoverflow.com/a/49765176/1954789
CMD /start.sh
