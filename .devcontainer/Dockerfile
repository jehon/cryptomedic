
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
COPY --chown=root:root build/ /
RUN chown -R user.user /home/user

RUN /usr/sbin/jh-install-google-chrome
RUN /setup/enable-docker

RUN /setup/cryptomedic/setup-apache
RUN /setup/cryptomedic/setup-mysql "5.6"
RUN /setup/cryptomedic/setup-php "8.1"
RUN /setup/cryptomedic/setup-phpmyadmin

ENV PATH=/workspaces/cryptomedic/bin:${PATH}
