#!/bin/bash

# Stop on error
set -e

# Clear terminal
echo -e \\033c

# Run project custom files
run-parts --exit-on-error --report $PRJ_DIR/bin/prj-install.d
