#!/bin/bash

# Install dependancies according to
# - package.json
# - composer.json
#   * install composer if necessary
#   * if a "GITHUB_OAUTH_TOKEN" is set in env, configure it into composer cache

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# Give it to any sub-scripts
export PRJ_DIR

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-install-dependancies.d
