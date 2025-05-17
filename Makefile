#
# Parameters
#
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := tmp
ACCEPTANCE := live-from-production
CRYPTOMEDIC_DEV_HTTP_HOST ?= localhost
CRYPTOMEDIC_DEV_HTTP_PORT ?= 8085

# To disable husky scripts
export HUSKY=0

## Where to deploy
export CRYPTOMEDIC_DEPLOY_WEB_TOKEN ?= secret
export DBUPDATEPWD := secret # From config.php

define rehydrate
	@if [ -r "$(1)" ] && [ "$(1)" -ot "$(2)" ] ; then \
		echo "Hydrate $(1)"; \
		touch -m --reference "$(2)" "$(1)"; \
	fi
endef

# Default target
.PHONY: check
check: cls dependencies lint build reset-lite test ok

# Test with clean environment
.PHONY: full
full: cls stop clean dc-build start dependencies lint build test integration-test-desktop ok

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

include Makefile-backend
include Makefile-frontend
include Makefile-integration

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
	@echo "ACCEPTANCE:                     $(ACCEPTANCE)"
	@echo "CRYPTOMEDIC_DEPLOY_FILES_HOST:  $(CRYPTOMEDIC_DEPLOY_FILES_HOST)"
	@echo "CRYPTOMEDIC_DEPLOY_WEB_HOST:    $(CRYPTOMEDIC_DEPLOY_WEB_HOST)"
	@echo "CRYPTOMEDIC_DEPLOY_WEB_PORT:    $(CRYPTOMEDIC_DEPLOY_WEB_PORT)"
	@echo "CRYPTOMEDIC_DEV_HTTP_PORT:      $(CRYPTOMEDIC_DEV_HTTP_PORT)"
	@echo "CRYPTOMEDIC_DEV_HTTP_HOST:      $(CRYPTOMEDIC_DEV_HTTP_HOST)"
	@echo "------------------------------------------"
	@echo "Docker:                         $(shell docker --version)"
	@echo "Docker compose:                 $(shell docker compose version)"
	@echo "Docker security:                $(shell docker info -f "{{println .SecurityOptions}}" )"
	@echo ""
	@echo "+++ lsb release +++"
	lsb_release -a
	@echo ""
	@echo "+++ docker version +++"
# This can fail if the docker server is not running (see CI)
	docker version || true
	@echo ""
# @echo "MySQL:                          $(shell QUIET=y bin/cr-mysql --version 2>&1 )"
# @echo "MySQL Server:                   $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
# @echo "MySQL user:                     $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"

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


dc-build:
	docker compose build
	docker compose --profile=tools build

.PHONY: start
start: dc-up dependencies build reset
	@echo "Open browser: http://$(CRYPTOMEDIC_DEV_HTTP_HOST):$(CRYPTOMEDIC_DEV_HTTP_PORT)/"
	@echo "Test page: http://$(CRYPTOMEDIC_DEV_HTTP_HOST):$(CRYPTOMEDIC_DEV_HTTP_PORT)/dev/"
	@echo "Test page: http://$(CRYPTOMEDIC_DEV_HTTP_HOST):$(CRYPTOMEDIC_DEV_HTTP_PORT)/dev/patient/1"
	@echo "Frontend entry point: http://$(CRYPTOMEDIC_DEV_HTTP_HOST):$(CRYPTOMEDIC_DEV_HTTP_PORT)/built/frontend/ng1x.html"
	@echo -n "Official port: "
	@docker compose port proxy 80

# .PHONY: check-env
# check-env:
# 	@if [ -z "$(CRYPTOMEDIC_DEV_HTTP_HOST)" ] || [ -z "$(CRYPTOMEDIC_DEV_HTTP_PORT)" ]; then \
# 		echo "Error: Les variables d'environnement CRYPTOMEDIC_DEV_HTTP_HOST et CRYPTOMEDIC_DEV_HTTP_PORT doivent être définies"; \
# 		echo "Veuillez configurer votre fichier .envrc ou .env"; \
# 		exit 1; \
# 	fi

dev: clear start
# No reset!
# build: other stuff than frontend need to be build

#? 
dc-up:
	docker compose up -d --wait --remove-orphans --build
# bin/cr-refresh-structure "http://$(CRYPTOMEDIC_HTTP_DEPLOY_HOST):$(CRYPTOMEDIC_HTTP_DEPLOY_PORT)/" "secret"

stop:
	docker compose down --volumes --remove-orphans
	docker compose kill -s SIGINT mysql || true
	@echo ""

.PHONY: logs
logs:
	docker compose logs -f

reset:
	bin/cr-data-reset session

reset-lite:
	bin/cr-data-reset

database-update-base-sql:
	bin/cr-database-backup

lint: global-lint-prettier
.PHONY: global-lint-prettier
global-lint-prettier: $(FRONTEND_DEPENDENCIES_MARK)
	node_modules/.bin/prettier --check .

.PHONY: global-lint-prettier-fix
global-lint-prettier-fix: $(FRONTEND_DEPENDENCIES_MARK)
	node_modules/.bin/prettier --write .

#
#
# Acceptance
#
#
acceptance: $(ACCEPTANCE)/.done dc-up
	cr-mysql -e "DROP DATABASE cryptomedic; CREATE DATABASE cryptomedic"
	cr-mysql --database=cryptomedic < "$(ACCEPTANCE)"/backups/backup.sql
	cr-refresh-structure "http://$(CRYPTOMEDIC_HTTP_DEPLOY_HOST):$(CRYPTOMEDIC_HTTP_DEPLOY_PORT)/" "secret"
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
deploy: .ovhconfig $(HOME)/.ssh/id_rsa
	bin/cr-deploy-sshfs commit

.PHONY: deploy-test
deploy-test: .ovhconfig $(HOME)/.ssh/id_rsa
	bin/cr-deploy-sshfs

$(HOME)/.ssh/id_rsa:
	mkdir -p "$(HOME)"/.ssh
	ssh-keygen -b 2048 -t rsa -f "$(HOME)"/.ssh/id_rsa -q -N ""

.PHONY: build
build: \
		www/built/backup \
		.ovhconfig

.ovhconfig: conf/ovhconfig .env
	bash -c "set -o allexport; source .env; envsubst < conf/ovhconfig > $@"

www/built/backup: bin/cr-live-backup.sh
# Make the backup script available to web
	@mkdir -p "$(dir $@)"
	cp -f "$<" "$@"

.PHONY: update-references-browsers
update: update-references-browsers
update-references-browsers:
	node_modules/.bin/browserslist --update-db
