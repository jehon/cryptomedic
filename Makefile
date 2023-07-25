#
# Parameters
#
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := $(ROOT)/tmp
ACCEPTANCE := $(ROOT)/live-from-production

# Defaults value for Dev:
export CRYPTOMEDIC_HTTP_HOST ?= localhost
export CRYPTOMEDIC_HTTP_PORT ?= 5555
export CRYPTOMEDIC_HTTP_TOKEN ?= secret
export CRYPTOMEDIC_HTTP_LOCAL_PORT = 5555
export DBUPDATEPWD := secret # From config.php

# Default target
.PHONY: full
full: clear clean stop dc-build start dependencies lint build test ok

# End by test, since check-styles may fail
.PHONY: dev
dev: clear clean-files dc-build dc-up dependencies lint build test ok

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

#
# Debug options:
#   --warn-undefined-variables
#   --debug=basic
#

dump:
	@echo ""
	@echo "***************"
	@echo "*** generic ***"
	@echo ""
	@echo "Who am i:                       $(shell whoami) ($(shell id -u))"
	@echo "HOME:                           $(HOME)"
	@echo "SHELL:                          $(SHELL)"
	@echo "PATH:                           $(PATH)"
	@echo "ACCEPTANCE:                     $(ACCEPTANCE)"
	@echo "CRYPTOMEDIC_HTTP_HOST:          $(CRYPTOMEDIC_HTTP_HOST)"
	@echo "CRYPTOMEDIC_HTTP_PORT:          $(CRYPTOMEDIC_HTTP_PORT)"
	@echo "CRYPTOMEDIC_HTTP_LOCAL_PORT:    $(CRYPTOMEDIC_HTTP_LOCAL_PORT)"
	@echo "CRYPTOMEDIC_DEPLOY_HOST:        $(CRYPTOMEDIC_DEPLOY_HOST)"
	@echo "------------------------------------------"
	@echo "MySQL:                          $(shell QUIET=y bin/cr-mysql --version 2>&1 )"
	@echo "MySQL Server:                   $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
	@echo "MySQL user:                     $(shell QUIET=y bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"
# @echo "Chrome:                         $(shell google-chrome --version 2>&1 )"

clear:
	@if [ -z "$$NO_CLEAR" ]; then clear; fi || true
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: stop clean-files
#	find . -name "tmp" -prune -exec "rm" "-fr" "{}" ";" || true
	rm -fr tmp

clean-files:
	find . -name "*.log" -delete

	rm -f .ovhconfig
	rm -f www/built/backup
	rm -f www/built/browsers.json

dc-build:
	docker compose build
	docker compose --profile=tool build

.PHONY: start
start: dc-up dependencies build reset
	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_HTTP_LOCAL_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_HTTP_LOCAL_PORT)/dev/"

dc-up:
	docker compose up -d
	bin/cr-dc-init

stop:
	docker compose down

.PHONY: logs
logs:
	docker compose logs -f

reset:
	cr-data-reset

#
#
# Acceptance
#
#
acceptance: $(ACCEPTANCE)/.done dc-up
	cr-mysql -e "DROP DATABASE cryptomedic; CREATE DATABASE cryptomedic"
	cr-mysql --database=cryptomedic < "$(ACCEPTANCE)"/backups/backup.sql
	cr-refresh-structure "http://localhost:5555/" "secret"
	rsync -itr --delete "$(ACCEPTANCE)"/storage/ live/storage

$(ACCEPTANCE)/.done:
	bin/cr-live-backup.sh "$(dir $@)"
	touch "$@"

acceptance-refresh:
	rm -f "$(ACCEPTANCE)/.done"
# Do not depend but force running
	make "$(ACCEPTANCE)/.done"

acceptance-clean:
	rm -f "$(ACCEPTANCE)/"

#
# Deploy command
#

.PHONY: deploy
deploy:
	bin/cr-deploy-patch commit

.PHONY: deploy-test
deploy-test:
	bin/cr-deploy-patch

.PHONY: build
build: \
		www/built/browsers.json \
		www/built/backup \
		www/built/release_version.txt \
		.ovhconfig

.ovhconfig: conf/ovhconfig .env
	bash -c "set -o allexport; source .env; envsubst < conf/ovhconfig > $@"

www/built/backup: bin/cr-live-backup.sh
# Make the backup script available to web
	cp -f "$<" "$@"

www/built/browsers.json: .browserslistrc $(FRONTEND_DEPENDENCIES_MARK)
	@mkdir -p "$(dir $@)"
	bin/cr-node node_modules/.bin/browserslist --json > "$@"

www/built/release_version.txt:
	@mkdir -p "$(dir $@)"
	date > "$@"

.PHONY: update-references-browsers
update: update-references-browsers
update-references-browsers:
	bin/cr-node node_modules/.bin/browserslist --update-db

include Makefile-backend
include Makefile-frontend
include Makefile-integration
