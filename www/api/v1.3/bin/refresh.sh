#!/usr/bin/env bash

set -o errexit

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# shellcheck source=/dev/null
. "$SCRIPT_DIR/../../../../bin/cr-lib"

# Current api dynamically calculated
API="$(basename "$(dirname "$SCRIPT_DIR")")"

curl -fsSL "http://${CR_HTTP_HOST}/api/$API/routes/struct/data.php?force=1&quiet=true"
