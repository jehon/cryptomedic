
FROM debian:stable

#
# Tools
#
RUN apt update

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    rsync unzip lftp openssh-client sshpass sshfs gnupg \
    git unzip \
    apache2 ssmtp

# #
# # Override configs
# # 
# COPY --chown=root:root build/ /setup/cryptomedic/build/
# RUN chmod go-w -R /setup/cryptomedic/build && rsync -ar /setup/cryptomedic/build/ /
# RUN chown -R user.user /home/user

# RUN /usr/sbin/jh-install-google-chrome
# RUN /setup/cryptomedic/setup-apache
# RUN /setup/cryptomedic/setup-mysql "5.7"
# RUN /setup/cryptomedic/setup-php "8.1"
# RUN /setup/cryptomedic/setup-phpmyadmin

# ENV PATH=/workspaces/cryptomedic/bin:${PATH}
