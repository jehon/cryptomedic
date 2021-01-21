#!/usr/bin/env bash

whoami

apachectl -D FOREGROUND || tail /var/log/apache2/error.log
