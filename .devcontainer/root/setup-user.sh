#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

SWD="$(dirname "$( realpath "${BASH_SOURCE[0]}")")"

. "${SWD}"/../../bin/cr-lib

if [ ! -r "$HOME"/.ssh/id_rsa ]; then
    echo "Generating a personnal ssh key"
    mkdir -p "$HOME"/.ssh
    ssh-keygen -b 2048 -t rsa -f "$HOME"/.ssh/id_rsa -q -N ""
fi

if ! grep "${CRYPTOMEDIC_DEPLOY_FILES_HOST}" "$HOME"/.ssh/known_hosts > /dev/null; then
    echo "Add ovh key"
    mkdir -p "$HOME"/.ssh
    cat "${CR_PRJ_DIR}/conf/ovh.key" >> "$HOME"/.ssh/known_hosts
fi
