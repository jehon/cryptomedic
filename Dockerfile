
FROM jehon/devcontainer

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    git unzip

ADD conf/ovh.key /etc/ssh/known_hosts/ovh.key

RUN /usr/sbin/jh-install-google-chrome
RUN /usr/sbin/jh-install-docker

ADD bin/setup-php /setup/setup-php
RUN chmod +x /setup/setup-php && /setup/setup-php "8.1"
