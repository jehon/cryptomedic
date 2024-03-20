#!/usr/bin/env bash

set -o errexit
set -o pipefail

SWD="$(dirname "$( realpath "${BASH_SOURCE[0]}")")"

export DEBIAN_FRONTEND=noninteractive

root_or_sudo() {
    if [ "$( id -u )" == "0" ]; then
        # In Docker
        "$@"
    else
        # On system
        sudo "$@"
    fi
}

root_or_sudo apt update

echo "* Installing packages..."
root_or_sudo apt install --quiet --yes \
    curl lftp
echo "* Installing packages done"

if type direnv >& /dev/null ; then
    echo "* Enabling direnv..."
    direnv allow .
    echo "* Enabling direnv done"
else
    echo "!! skipping direnv allow !!"
fi

if [ ! -r "$HOME"/.ssh/id_rsa ]; then
    echo "Generating a personnal ssh key"
    mkdir -p "$HOME"/.ssh
    ssh-keygen -b 2048 -t rsa -f "$HOME"/.ssh/id_rsa -q -N ""
fi

if ! grep "${CRYPTOMEDIC_DEPLOY_FILES_HOST}" "$HOME"/.ssh/known_hosts > /dev/null; then
    echo "Add ovh key"
    mkdir -p "$HOME"/.ssh
    cat "${SWD}/conf/ovh.key" >> "$HOME"/.ssh/known_hosts
fi
