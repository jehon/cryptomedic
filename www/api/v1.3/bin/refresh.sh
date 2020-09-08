#!/usr/bin/env bash

set -x

SCRIPT_DIR="$( dirname "${BASH_SOURCE[0]}" )"

# Current api dynamically calculated
API="$( basename "$( dirname "$SCRIPT_DIR" )" )"

wget -O - --quiet --content-on-error "http://${CRYPTOMEDIC_HTTP_HOST}/api/$API/struct/data.php"
