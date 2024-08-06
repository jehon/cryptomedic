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
# libevent-2.1-7t64: playwright
root_or_sudo apt install --quiet --yes \
    curl lftp sshfs sshpass \
    libevent-2.1-7t64
echo "* Installing packages done"

if type direnv >&/dev/null; then
    echo "* Enabling direnv..."
    direnv allow .
    echo "* Enabling direnv done"
else
    echo "!! skipping direnv allow !!"
fi
