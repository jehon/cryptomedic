# https://hub.docker.com/_/ubuntu/

FROM ubuntu:22.04

WORKDIR /

ENV DEBIAN_FRONTEND=noninteractive

##################################
#
# Dev packages
#
RUN apt-get update && apt-get install -y \
    gnupg bash-completion \
    curl rsync unzip git make lftp curl openssh-client sshpass sshfs \
    apache2 \
    unzip \
    git \
    firefox \
    nodejs \
    apt-transport-https software-properties-common

RUN a2enmod expires rewrite proxy proxy_http proxy_html proxy_connect proxy_wstunnel

##################################
#
# Google chrome
#
# RUN apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 78BD65473CB3BD13
# RUN add-apt-repository "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main"
# RUN apt-get install -y google-chrome-stable
#

###################
#
# Apache2 config
#

RUN rm -fr /etc/apache2/sites-enabled/*.conf
COPY website.conf /etc/apache2/sites-enabled/website.conf

###################
#
# Configs
#
#

ADD . /setup/
RUN chmod a+x /setup/*.sh

RUN /setup/install-ovh-key.sh

WORKDIR /app

CMD apachectl -D FOREGROUND || tail /var/log/apache2/error.log
