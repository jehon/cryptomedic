
FROM jehon/devcontainer

#
# Tools
#
RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    rsync unzip lftp openssh-client sshpass sshfs gnupg \
    git unzip \
    apache2 \
    ssmtp
RUN /usr/sbin/jh-install-google-chrome
RUN /usr/sbin/jh-install-docker

#
# PHP
#
ADD bin/setup-php /setup/setup-php
RUN chmod +x /setup/setup-php && /setup/setup-php "8.1"

#
# Website
#
RUN a2enmod expires rewrite proxy proxy_http proxy_html proxy_connect proxy_wstunnel
RUN rm -fr /etc/apache2/sites-enabled/*.conf

#
# Override configs
# 
COPY conf/etc/ /etc/
COPY conf/startup/ /setup/startup
