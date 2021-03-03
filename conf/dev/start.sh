#!/usr/bin/env bash

apachectl -D FOREGROUND || tail /var/log/apache2/error.log
