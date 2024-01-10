#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

export DEBIAN_FRONTEND=noninteractive

apt update

apt install --yes openssh-client sshpass sshfs curl coreutils diffutils lftp

ssh -V
sshpass -V
sshfs -V
lftp -v
