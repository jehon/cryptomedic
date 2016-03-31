#!/bin/bash

if [ "$1" = "help" ]; then
  cat <<-EOL
  Run prj-logs in the vagrant.
EOL
  exit 0
fi

vagrant ssh -c "prj-logs.sh"
