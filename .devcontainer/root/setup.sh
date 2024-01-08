#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

export DEBIAN_FRONTEND=noninteractive

apt update

apt install -y openssh-client sshpass curl coreutils diffutils

if [ ! -r "$HOME"/.ssh/id_rsa ]; then
    echo "Generating a ssh key"
    ssh-keygen -b 2048 -t rsa -f "$HOME"/.ssh/id_rsa -q -N ""
fi

ssh -V
sshpass -V
