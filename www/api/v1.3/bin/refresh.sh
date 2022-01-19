#!/usr/bin/env bash

set -o errexit

# shellcheck source=../../../../bin/cr-lib
. "$(dirname "${BASH_SOURCE[0]}")"/../../../../bin/cr-lib

curl -fsSL "http://${CR_HTTP_HOST}/api/$CR_API_VERSION/routes/struct/data.php?force=1&quiet=true"
