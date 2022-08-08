# cryptomedic

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![workflow](https://github.com/jehon/cryptomedic/actions/workflows/workflow.yml/badge.svg)](https://github.com/jehon/cryptomedic/actions/workflows/workflow.yml)

## Local requirements

(to be checked)

- docker-compose
- docker
- make
- curl
- node

```lang=bash
sudo apt install docker-compose docker.io make curl nodejs
```

## Quick install

To start quickly:
make start dependencies build data-reset

| Command    | What does it does?
|------------|----------------------
| make start | will install and start the whole stack. Open localhost:${CRYPTOMEDIC_PORT:-80} to view cryptomedic
| make dependencies | install dependencies
| make data-reset | install data
| make stop  | stop the server
| make test  | launch the tests
| make clean | clean up generated files
| make clean-hard | make clean + remove dependencies
| make deploy | deploy the stack to the production server (env config necessary)
| make data-reset | To reset the database and files

Notes:
- All passwords are reset to "p" (see passwords.sql)
- Available users: thierry, jehon, murshed, readonly, ershad, shetou

## Other commands

| Command    | What does it does?
|------------|----------------------
| make deploy-test | simulate deploy the stack to the production server (env config necessary)
| make database-backup | create a new base.sql for next run (usefull when creating new data)

# Style

## JSDoc
https://github.com/cancerberoSgx/jsdoc-typeof-plugin

```lang=javascript
/**
 * @return {typeof Something} a new Something subclass
 */
```
## Material design

All Components: https://github.com/material-components/material-components-web-components

Text field: https://github.com/material-components/material-components-web-components/tree/master/packages/textfield
