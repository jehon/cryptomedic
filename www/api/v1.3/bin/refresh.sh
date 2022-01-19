#!/usr/bin/env bash

set -o errexit

# shellcheck source=../../../../bin/cr-lib
. "$(dirname "${BASH_SOURCE[0]}")"/../../../../bin/cr-lib

SWD="$(dirname "${BASH_SOURCE[0]}")"
V="$(basename "$(dirname "$SWD")")"

curl -fsSL "http://${CR_HTTP_HOST}/api/$V/routes/struct/data.php?force=1&quiet=true"
