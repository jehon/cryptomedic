#!/usr/bin/env bash

set -o errexit

# shellcheck source=/usr/bin/jh-lib.sh
. jh-lib.sh

ROOT="$(dirname "$(realpath "$(dirname "${BASH_SOURCE[0]}")")")"
TMP="$ROOT/tmp"

mkdir -p "$TMP"/current

t() {
    echo "Getting $1"
    wget --quiet --content-on-error \
        "http://localhost:5555/api/v1.3/templates/$1" \
        -O "$TMP/current/$1"
}

t3() {
    t "$1_fiche"
    t "$1_write"
}

header "Downloading"

t3 appointment
t3 bill
t3 clubfoot
t3 otherconsult
t3 patient
t3 picture
t3 ricketconsult
t3 surgery

t folder
t reports
t report_statistical

header "Download done"
ls "$TMP"/current/

header "Comparison"
diff -ry --suppress-common-lines "$TMP"/original/ "$TMP"/current/

header "Done with success"
