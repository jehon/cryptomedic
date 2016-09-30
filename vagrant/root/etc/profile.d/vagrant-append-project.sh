#!/bin/bash

# Export will make this inheritable
export PRJ_DIR="/vagrant"
export PATH=$PATH:$PRJ_DIR/bin:$PRJ_DIR/node_modules/.bin/:$PRJ_DIR/vendor/bin/

# Fix permissions on the various files
chmod +x "$PRJ_DIR/bin/"/*

cd $PRJ_DIR
