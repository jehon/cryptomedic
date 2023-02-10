
FROM debian:stable

ADD . /

#
# Tools
#
RUN apt update

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    curl git unzip lsb-release \
    make rsync unzip lftp openssh-client sshpass sshfs gnupg

# #
# # Override configs
# # 
# COPY --chown=root:root build/ /setup/cryptomedic/build/
# RUN chmod go-w -R /setup/cryptomedic/build && rsync -ar /setup/cryptomedic/build/ /
# RUN chown -R user.user /home/user

# RUN /usr/sbin/jh-install-google-chrome

ENV PATH=/workspaces/cryptomedic/bin:${PATH}
