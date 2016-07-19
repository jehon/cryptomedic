#!/bin/bash

# Stop on error
set -e

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PRJ_DIR=$(dirname "$SCRIPT_DIR")

# protect in the target site:
# - config-site.php
# - live

# Empty in the target site:
# - tmp

# Not uploaded:
# - documentation
# - live-for-tests
# - tests
# - tmp

# Uploaded in acceptancy only?
# - backups
# - bin

# Tricky:
# - closed list or exclude?
# - upload the config-site.php?
# - what if www folder is named otherwise above?
# - how to make configuration of this?
# - have some hooks global, per site? (ex: drupal update.php or drush import)
