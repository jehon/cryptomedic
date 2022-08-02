
FROM jehon/devcontainer

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    docker.io

ADD conf/ovh.key /etc/ssh/known_hosts/ovh.key
