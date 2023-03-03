#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

SWD="$(dirname "$( realpath "${BASH_SOURCE[0]}")")"

export DEBIAN_FRONTEND=noninteractive

apt update

apt install -y openssh-client sshpass curl coreutils diffutils
