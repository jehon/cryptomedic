#!/bin/bash

cd /vagrant/www && \
  node \
    /vagrant/node_modules/.bin/sw-precache \
    --static-file-globs=static/**          \
    --static-file-globs=build/**           \
    --static-file-globs=cryptomedic/**     \
    --static-file-globs=index.html         \
    --static-file-globs=favicon.ico        \
    --static-file-globs=license.txt        \
