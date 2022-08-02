
FROM jehon/devcontainer

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    docker.io

ADD conf/ovh.key /etc/ssh/known_hosts/ovh.key

RUN /usr/sbin/jh-install-google-chrome

RUN /usr/sbin/jh-install-docker
