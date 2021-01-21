#!/usr/bin/env bash

id

apachectl -D FOREGROUND || tail /var/log/apache2/error.log
