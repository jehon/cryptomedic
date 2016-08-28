#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

cd "$PRJ_DIR"

# Run project custom files
run-parts --report $PRJ_DIR/bin/prj-build.d
