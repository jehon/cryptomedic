# cryptomedic

[![Build Status](https://travis-ci.com/jehon/cryptomedic.svg?branch=master)](https://travis-ci.com/jehon/cryptomedic)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

cryptomedic

## Local requirements

(to be checked)

- docker-compose
- docker
- make
- wget
- node

```lang=bash
sudo apt install docker-compose docker.io make wget nodejs
```

## Quick install

| Command    | What does it does?
|------------|----------------------
| make start | will install and start the whole stack. Open localhost:${CRYPTOMEDIC_PORT:-5080} to view cryptomedic
| make stop  | stop the server
| make test  | launch the tests
| make clean | clean up generated files
| make clean-hard | make clean + remove dependencies
| make deploy | deploy the stack to the production server (env config necessary)

## Other commands

| Command    | What does it does?
|------------|----------------------
| make deploy-test | simulate deploy the stack to the production server (env config necessary)
| make database-backup | create a new base.sql for next run (usefull when creating new data)

# Travis

A build is automatically made on [travis-ci](http://www.travis-ci.com/jehon/cryptomedic).
When the master branch success, it is automatically deployed to the production server.
