#!/usr/bin/env bash

set -o errexit

jh-wait 60 "nc -z -w 1 localhost 80"
