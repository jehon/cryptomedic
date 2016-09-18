#!/bin/bash

# Export will make this inheritable
PRJ_DIR="/vagrant"

export PATH=$PATH:$PRJ_DIR/bin:$PRJ_DIR/node_modules/.bin/
export PRJ_DIR=$PRJ_DIR

# Fix permissions on the various files
chmod +x "$PRJ_DIR/bin/"/*

cd $PRJ_DIR
