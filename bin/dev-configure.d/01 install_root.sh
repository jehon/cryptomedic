#!/bin/bash

# Put various configs file in place (cp because needed before vagrant mount)
rsync -r -i --omit-dir-times $PRJ_DIR/conf/root/ /
