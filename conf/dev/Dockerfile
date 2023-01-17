
FROM debian:stable

ADD . /

#
# Tools
#
RUN apt update

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    curl git unzip lsb-release \
    make rsync unzip lftp openssh-client sshpass sshfs gnupg

RUN /setup/setup-node "lts"

RUN /setup/setup-php "8.1"

# #
# # Override configs
# # 
# COPY --chown=root:root build/ /setup/cryptomedic/build/
# RUN chmod go-w -R /setup/cryptomedic/build && rsync -ar /setup/cryptomedic/build/ /
# RUN chown -R user.user /home/user

# RUN /usr/sbin/jh-install-google-chrome
# RUN /setup/cryptomedic/setup-mysql "5.7"

ENV PATH=/workspaces/cryptomedic/bin:${PATH}
