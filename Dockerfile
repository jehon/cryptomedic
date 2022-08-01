
FROM jehon/devcontainer

RUN DEBIAN_FRONTEND=noninteractive apt install --quiet --yes \
    docker.io

RUN bin/cr-deploy-update-key
