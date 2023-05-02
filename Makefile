
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := $(ROOT)/tmp

GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)

# Default target
# End by test, since check-styles may fail
.PHONY: dev
dev: clear stop start dependencies lint build test ok

.PHONY: full
full: clear clean stop dc-build start dependencies lint update-dependencies build test ok

.PHONY: pull-request
pull-request: full

.PHONY: update
update: clear dependencies lint update-references-api update-references-styles update-references-browsers ok

.PHONY: ok
ok:
	@echo "ok"
	date

#
# Debug options:
#   --warn-undefined-variables
#   --debug=basic
#

#
# Parameters
#
export CYPRESS_CACHE_FOLDER := $(TMP)/cache/cypress

BACKUP_DIR ?= $(TMP)/backup-online
DEPLOY_HOST := ftp.cluster003.ovh.net
DEPLOY_MOUNT := $(TMP)/remote
DEPLOY_MOUNT_TEST_FILE := $(DEPLOY_MOUNT)/.ovhconfig
DEPLOY_TEST_DIR ?= $(TMP)/deploy-test-dir
SSH_KNOWN_HOSTS := ~/.ssh/known_hosts
DISPLAY ?= ":0"

# Defaults value for Dev:
JH_CRYPTOMEDIC_HTTP_HOST ?= localhost
JH_CRYPTOMEDIC_HTTP_PORT ?= 5555
JH_CRYPTOMEDIC_HTTP_TOKEN ?= secret
JH_CRYPTOMEDIC_HTTP_LOCAL_PORT := 5555

#
# Dev env fixed
#
# From config.php
export DBUPDATEPWD := secret

#
# Fixed
#
CJS2ESM_DIR := src/cjs2esm


# See https://coderwall.com/p/cezf6g/define-your-own-function-in-a-makefile
# 1: folder where to look
# 2: base file to have files newer than, to limit the length of the output
define recursive-dependencies
	$(shell \
		if [ -r "$(2)" ]; then \
			find "$(1)" -name tests_data -prune -o -name tmp -prune -o -type f -newer "$(2)"; \
		else \
			find "$(1)" -name tests_data -prune -o -name tmp -prune -o -type f;\
		fi \
	)
endef

dump:
	@echo "Who am i:                       $(shell whoami) ($(shell id -u))"
	@echo "HOME:                           $(HOME)"
	@echo "SHELL:                          $(SHELL)"
	@echo "PATH:                           $(PATH)"
	@echo "DISPLAY:                        $(DISPLAY)"
	@echo "JH_CRYPTOMEDIC_HTTP_HOST:       $(JH_CRYPTOMEDIC_HTTP_HOST)"
	@echo "JH_CRYPTOMEDIC_HTTP_PORT:       $(JH_CRYPTOMEDIC_HTTP_PORT)"
	@echo "JH_CRYPTOMEDIC_HTTP_LOCAL_PORT: $(JH_CRYPTOMEDIC_HTTP_LOCAL_PORT)"
	@echo "JH_CRYPTOMEDIC_DEPLOY_HOST:     $(JH_CRYPTOMEDIC_DEPLOY_HOST)"
	@echo "------------------------------------------"
	@echo "MySQL:                          $(shell bin/cr-mysql --version 2>&1 )"
	@echo "MySQL Server:                   $(shell bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
	@echo "MySQL user:                     $(shell bin/cr-mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"
	@echo "PHP:                            $(shell bin/cr-php -r 'echo PHP_VERSION;' 2>&1 )"
	@echo "PHP composer:                   $(shell bin/cr-composer --version 2>&1 )"
	@echo "NodeJS:                         $(shell bin/cr-node --version 2>&1 )"
	@echo "NPM:                            $(shell bin/cr-npm --version 2>&1 )"
	@echo "Cypress:                        $(shell QUIET=y bin/cr-cypress desktop --version --component package )"
#	@echo "Chrome:                         $(shell google-chrome --version 2>&1 )"

clear:
	@if [ -z "$$NO_CLEAR" ]; then clear; fi
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: stop
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then echo "Remote mounted - stopping"; exit 1; fi
	find . -type d \( -name "vendor" -or -name "node_modules" \) -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "tmp" -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "*.log" -delete

	rm -f .ovhconfig
	rm -fr live/
	rm -f www/index.html
	rm -fr www/built
	rm -fr $(CJS2ESM_DIR)
	rm -fr www/api/*/bootstrap/cache
	rm -fr www/api/*/storage
	rm -fr $(TMP)

	@echo "!! Removed dependencies, so husky (commit) will not work anymore. Please make dependencies-node to enable it again"

# Kill all ports
.PHONY: clean-ports
clean-ports:
	pkill chromedriver || true
	jh-kill-by-port 9515 || true

dc-build:
	docker compose build
	docker compose --profile=tool build

.PHONY: start
start: dc-up dependencies build reset
	@echo "Open browser: http://localhost:$(JH_CRYPTOMEDIC_HTTP_LOCAL_PORT)/"
	@echo "Test page: http://localhost:$(JH_CRYPTOMEDIC_HTTP_LOCAL_PORT)/dev/"

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
acceptance: $(TMP)/backup dc-up
	cr-mysql -e "DROP DATABASE cryptomedic;CREATE DATABASE cryptomedic"
	cr-mysql --database=cryptomedic < $$( ls tmp/backup/backups/*.sql | sort | tail -n 1 )
	rsync -itr --delete tmp/backup/storage/ live/storage

acceptance-download: $(TMP)/backup/.done

$(TMP)/backup/.done:
	mkdir -p "$(dir $@)"
	bin/cr-live-backup.sh "$@"
	touch "$@"

#
#
# Tests
#
#

.PHONY: lint
lint: lint-es lint-css lint-html
	./node_modules/.bin/prettier --list-different .

.PHONY: lint-es
lint-es: $(TMP)/.dependencies-node
	node node_modules/.bin/eslint .

.PHONY: lint-css
lint-css: $(TMP)/.dependencies-node
	node node_modules/.bin/stylelint src/**/*.css

.PHONY: lint-html
lint-html: $(TMP)/.dependencies-node
	node node_modules/.bin/htmlhint src/**/*.html tests/**/*.html www/api/*/public/**/*.html --format=compact

.PHONY: test # In Jenkinfile, each step is separated:
test: $(TMP)/.dependencies $(TMP)/.built test-api test-unit test-e2e test-styles

.PHONY: test-api
test-api: $(TMP)/.dependencies-api
	cr-data-reset
	bin/cr-phpunit

.PHONY: update-references-api
update-references-api: $(TMP)/.dependencies-api
	cr-data-reset
	COMMIT=1 bin/cr-phpunit

.PHONY: test-unit
test-unit: $(TMP)/.dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

# TODO: reenable coverage
	mkdir -p $(TMP)/js
	NOCOV=1 bin/cr-npm run test-unit-continuously-withcov -- --single-run
# node tests/report.js

.PHONY: test-e2e
test-e2e: test-e2e-desktop test-e2e-mobile

.PHONY: test-e2e-desktop
test-e2e-desktop: $(TMP)/.tested-e2e-desktop
$(TMP)/.tested-e2e-desktop: $(TMP)/.built $(TMP)/.dependencies $(shell find tests/cypress/ -name "*.js")
	bin/cr-data-reset
	bin/cr-cypress "desktop"

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: test-e2e-mobile
test-e2e-mobile: $(TMP)/.tested-e2e-mobile
$(TMP)/.tested-e2e-mobile: $(TMP)/.built $(TMP)/.dependencies $(shell find tests/cypress/ -name "*.js")
	bin/cr-data-reset
	bin/cr-cypress "mobile"

	@mkdir -p "$(dir $@)"
	@touch "$@"

cypress-open:
	./bin/cr-cypress open desktop

.PHONY: test-styles
test-styles: $(TMP)/styles/styles-problems-list.json

$(TMP)/styles/styles-problems-list.json: $(TMP)/styles/.structure
	bin/cr-node tests/styles/check-styles.js

.PHONY: update-references-styles
update-references-styles: $(TMP)/styles/.structure
	bin/cr-node tests/styles/check-styles.js --update

$(TMP)/styles/.structure: tests/styles tests/styles/references $(TMP)/.tested-e2e-desktop $(TMP)/.tested-e2e-mobile
	@rm -fr "$(dir $@)"
	@mkdir -p "$(dir $@)"
	@mkdir -p "$(dir $@)/run/mobile"
	@mkdir -p "$(dir $@)/run/desktop"

	rsync -r tests/styles/ "$(dir $@)"
	find $(TMP)/e2e/mobile/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/mobile/" ";"
	find $(TMP)/e2e/desktop/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/desktop/" ";"

	@touch "$@"

#
# Deploy command
#

.PHONY: deploy
deploy:
	bin/cr-deploy-patch commit

.PHONY: deploy-test
deploy-test:
	bin/cr-deploy-patch

#
#
# Install > dependencies
#
#

.PHONY: dependencies
dependencies: $(TMP)/.dependencies
$(TMP)/.dependencies: $(TMP)/.dependencies-node $(TMP)/.dependencies-api

	@mkdir -p "$(dir $@)"
	@touch "$@"

update-dependencies: update-dependencies-node update-dependencies-api

.PHONY: dependencies-node
dependencies-node: $(TMP)/.dependencies-node
$(TMP)/.dependencies-node: package.json package-lock.json
	bin/cr-npm install

	touch package-lock.json

	@mkdir -p "$(dir $@)"
	@touch "$@"

update-dependencies-node: dependencies-node

# %/composer.lock: %/composer.json
# 	bin/composer install --working-dir "$(dir $@)"
# 	touch "$@"

.PHONY: dependencies-api
dependencies-api: $(TMP)/.dependencies-api
$(TMP)/.dependencies-api: \
		www/api/composer.json \
		www/api/composer.lock

	cr-ensure-folder-empty www/api//bootstrap/cache
	bin/cr-composer install --working-dir "www/api/"

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: update-dependencies-api
update-dependencies-api:
	mkdir -m 777 -p www/api/bootstrap/cache
	bin/cr-composer update --working-dir "www/api/"

#
#
# Build
#
#

package-lock.json: package.json
	bin/cr-npm install

.PHONY: build
build: $(TMP)/.built
$(TMP)/.built: \
		www/built/.webpack \
		www/built/browsers.json \
		.ovhconfig

	@mkdir -p "$(dir $@)"
	@touch "$@"

build-on-change:
	find src/ | entr -a -c -c -d -n make build

.ovhconfig: conf/ovhconfig .env
	bash -c "set -o allexport; source .env; envsubst < conf/ovhconfig > $@"

# We need to depend on axios-mock-adapter.js, because otherwise, this will force a rebuild
# due to the recursive-dependencies
www/built/.webpack: $(TMP)/.dependencies-node webpack.config.js  \
		package.json package-lock.json \
		$(call recursive-dependencies,src/,$@) \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

	bin/cr-node node_modules/.bin/webpack
	touch "$@"

www/built/browsers.json: .browserslistrc $(TMP)/.dependencies-node
	bin/cr-node node_modules/.bin/browserslist --json > "$@"

update-references-browsers:
	bin/cr-node node_modules/.bin/browserslist --update-db

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
	bin/cr-node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
	bin/cr-node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

# Dependencies are used in the build !
$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
	bin/cr-node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
