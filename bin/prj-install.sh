#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

export PRJ_DIR

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-install.d
