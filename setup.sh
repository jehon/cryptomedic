#!/usr/bin/env bash

set -o errexit
set -o pipefail

export DEBIAN_FRONTEND=noninteractive

root_or_sudo() {
    if [ "$(id -u)" == "0" ]; then
        # In Docker
        "$@"
    else
        # On system
        sudo "$@"
    fi
}

echo "* Installing packages..."
root_or_sudo apt update
root_or_sudo apt install --quiet --yes \
    curl lftp sshfs sshpass jq make gettext-base rsync \
    google-chrome-stable
echo "* Installing packages done"

if type direnv >&/dev/null; then
    echo "* Enabling direnv..."
    direnv allow .
    echo "* Enabling direnv done"
else
    echo "!! skipping direnv allow !!"
fi
