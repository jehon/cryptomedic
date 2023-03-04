#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

SWD="$(dirname "$( realpath "${BASH_SOURCE[0]}")")"

export DEBIAN_FRONTEND=noninteractive

apt update

apt install -y openssh-client sshpass curl coreutils diffutils

mkdir -p "$HOME/.ssh/"
chmod 755 "$HOME/.ssh/"
cat $SWD/setup/ovh.key >> "$HOME/.ssh/known_hosts"
