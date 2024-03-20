#
# Parameters
#
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := tmp
ACCEPTANCE := live-from-production

# Defaults value for Dev:
## For patching, we need a ref to the local server
export CRYPTOMEDIC_LOCAL_HTTP_PORT = 8085
## Where to deploy
export CRYPTOMEDIC_DEPLOY_WEB_HOST ?= localhost
export CRYPTOMEDIC_DEPLOY_WEB_PORT ?= $(CRYPTOMEDIC_LOCAL_HTTP_PORT)
export CRYPTOMEDIC_DEPLOY_WEB_TOKEN ?= secret
export DBUPDATEPWD := secret # From config.php
export CRYPTOMEDIC_DOCKER_SOCKET := $(shell docker context inspect | jq -r .[0].Endpoints.docker.Host | sed "s^unix://^^")

define rehydrate
	@if [ -r "$(1)" ] && [ "$(1)" -ot "$(2)" ] ; then \
		echo "Hydrate $(1)"; \
		touch -m --reference "$(2)" "$(1)"; \
	fi
endef

# Default target
.PHONY: check
check: cls start dependencies lint build test ok

# Test with clean environment
.PHONY: full
full: cls clean stop dc-build start dependencies lint build test ok

.PHONY: ok
ok:
	@echo -n "✓ ok at "
	@date +"%H:%M:%S"

.PHONY: clean
.PHONY: dump
.PHONY: dependencies
.PHONY: lint
.PHONY: build
.PHONY: test
.PHONY: update
.PHONY: github

#
# Debug options:
#   --warn-undefined-variables
#   --debug=basic
#

dump: global-dump

.PHONY: global-dump
global-dump:
	@echo ""
	@echo "***************"
	@echo "*** generic ***"
	@echo ""
	@echo "Who am i:                       $(shell whoami) ($(shell id -u))"
	@echo "HOME:                           $(HOME)"
	@echo "SHELL:                          $(SHELL)"
	@echo "PATH:                           $(PATH)"
	@echo "arch:                           $(shell arch)"
	@echo "CRYPTOMEDIC_DOCKER_SOCKET:      $(CRYPTOMEDIC_DOCKER_SOCKET)" 
	@echo "ACCEPTANCE:                     $(ACCEPTANCE)"
	@echo "CRYPTOMEDIC_DEPLOY_FILES_HOST:  $(CRYPTOMEDIC_DEPLOY_FILES_HOST)"
	@echo "CRYPTOMEDIC_DEPLOY_WEB_HOST:    $(CRYPTOMEDIC_DEPLOY_WEB_HOST)"
	@echo "CRYPTOMEDIC_DEPLOY_WEB_PORT:    $(CRYPTOMEDIC_DEPLOY_WEB_PORT)"
	@echo "CRYPTOMEDIC_LOCAL_HTTP_PORT:    $(CRYPTOMEDIC_LOCAL_HTTP_PORT)"
	@echo "------------------------------------------"
	@echo "Docker:                         $(shell docker info -f "{{println .SecurityOptions}}")"
# @echo "MySQL:                          $(shell QUIET=y bin/cr-mysql --version 2>&1 )"
# @echo "MySQL Server:                   $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
# @echo "MySQL user:                     $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"
# @echo "Chrome:                         $(shell google-chrome --version 2>&1 )"

.PHONY: clear
clear: cls
.PHONY: cls
cls:
	@if [ -z "$$NO_CLEAR" ]; then clear; fi || true
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: stop clean-files
#	find . -name "tmp" -prune -exec "rm" "-fr" "{}" ";" || true
	rm -fr "$(ROOT)/tmp"

clean-files:
	find . -name "*.log" -delete

	rm -f "$(ROOT)/.ovhconfig"
	rm -f "$(ROOT)/www/built/backup"
	rm -f "$(ROOT)/www/built/browsers.json"

dc-build:
	docker compose build
	docker compose --profile=tools build

.PHONY: start
start: dc-up dependencies build reset
	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_LOCAL_HTTP_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_LOCAL_HTTP_PORT)/dev/"
	@echo -n "Official port: "
	@docker compose port proxy 80

dev: clear start
# No reset!
# build: other stuff than frontend need to be build

dc-up:
	docker compose up -d
# bin/cr-refresh-structure "http://$(CRYPTOMEDIC_HTTP_DEPLOY_HOST):$(CRYPTOMEDIC_HTTP_DEPLOY_PORT)/" "secret"

stop:
	docker compose down  --volumes --remove-orphans
	docker compose kill -s SIGINT mysql || true
	@echo ""

.PHONY: logs
logs:
	docker compose logs -f

reset:
	bin/cr-data-reset

database-update-base-sql:
	bin/cr-database-backup

#
#
# Acceptance
#
#
acceptance: $(ACCEPTANCE)/.done dc-up
	cr-mysql -e "DROP DATABASE cryptomedic; CREATE DATABASE cryptomedic"
	cr-mysql --database=cryptomedic < "$(ACCEPTANCE)"/backups/backup.sql
	cr-refresh-structure "http://localhost:$(CRYPTOMEDIC_HTTP_DEPLOY_PORT)/" "secret"
	rsync -itr --delete "$(ACCEPTANCE)"/storage/ live/storage

$(ACCEPTANCE)/.done:
	bin/cr-live-backup.sh "$(dir $@)"
	touch "$@"

acceptance-refresh:
	rm -f "$(ROOT)/$(ACCEPTANCE)/.done"
# Do not depend but force running
	make "$(ROOT)/$(ACCEPTANCE)/.done"

acceptance-clean:
	rm -f "$(ROOT)/$(ACCEPTANCE)/"

#
# Deploy command
#

.PHONY: deploy
deploy: .ovhconfig

	bin/cr-deploy-sshfs commit

.PHONY: deploy-test
deploy-test:
	bin/cr-deploy-patch

.PHONY: build
build: \
		www/built/backup \
		www/built/release_version.txt \
		.ovhconfig

.ovhconfig: conf/ovhconfig .env
	bash -c "set -o allexport; source .env; envsubst < conf/ovhconfig > $@"

www/built/backup: bin/cr-live-backup.sh
# Make the backup script available to web
	@mkdir -p "$(dir $@)"
	cp -f "$<" "$@"

www/built/release_version.txt:
	@mkdir -p "$(dir $@)"
	date > "$@"

.PHONY: update-references-browsers
update: update-references-browsers
update-references-browsers:
	node_modules/.bin/browserslist --update-db

include Makefile-backend
include Makefile-frontend
include Makefile-integration
