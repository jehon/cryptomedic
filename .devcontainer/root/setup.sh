#!/usr/bin/env bash

set -o errexit
set -o pipefail
shopt -s nullglob

export DEBIAN_FRONTEND=noninteractive

apt update

apt install --yes curl coreutils diffutils lftp

lftp -v
