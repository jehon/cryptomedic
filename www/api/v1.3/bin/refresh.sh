#!/usr/bin/env bash

set -o errexit

#
# This script is called by "cr-refresh-structure" that will set all necessary variables
#
#    CR_*
#    CR_API_VERSION
#
#

curl -fsSL "http://${CR_HTTP_HOST}/api/$CR_API_VERSION/routes/struct/data.php?force=1&quiet=true"
