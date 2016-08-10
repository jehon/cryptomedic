#!/bin/bash

if [ "$FRONT" = "1" ]; then
  "$@"
else
  xvfb-run --auto-servernum --server-args='-screen 0 1024x768x24 -ac +extension GLX +render -noreset' "$@"
fi
