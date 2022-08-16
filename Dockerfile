
FROM jehon/devcontainer

#
# Tools
#
RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    rsync unzip lftp openssh-client sshpass sshfs gnupg \
    git unzip \
    apache2 ssmtp

#
# Override configs
# 
COPY build/ /
RUN chmod +x /setup/cryptomedic/*

RUN /usr/sbin/jh-install-google-chrome
RUN /setup/enable-docker

RUN /setup/cryptomedic/setup-apache
RUN /setup/cryptomedic/setup-mysql "5.6"
RUN /setup/cryptomedic/setup-php "8.1"
