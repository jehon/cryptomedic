#!/bin/bash

if [ "$FRONT" = "1" ]; then
  "$@"
else
	# Test that the command does exists:
	# Thanks to http://stackoverflow.com/a/677212/1954789
	if command -v xvfb-run >/dev/null 2>&1  ; then
  		xvfb-run --auto-servernum --server-args='-screen 0 1024x768x24 -ac +extension GLX +render -noreset' "$@"
  	else
  		echo "FALL BACK WITHOUT XFVB"
  		"$@"
  	fi
fi
