#!/usr/bin/env bash

set -o errexit

jh-wait 60 "mysql -e 'SHOW DATABASES;' "
