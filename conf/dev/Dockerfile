# https://hub.docker.com/_/ubuntu/

From ubuntu:20.10

WORKDIR /

ENV DEBIAN_FRONTEND=noninteractive

##################################
#
# Dev packages
#
RUN apt-get update && apt-get install -y \
    gnupg bash-completion \
    curl rsync unzip git make lftp wget openssh-client sshpass sshfs \
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

##################################
#
# Config
#

RUN mkdir -p /setup
ADD . /setup
RUN chmod +x /setup/*.sh

COPY website.conf /etc/apache2/sites-enabled/website.conf
RUN rm -fr /etc/apache2/sites-enabled/000-default.conf

RUN /setup/install-ovh-key.sh
RUN /setup/install-php.sh

WORKDIR /app

CMD /setup/start.sh
