
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := $(ROOT)/tmp

GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)

# Default target
# End by test, since test-styles may fail
.PHONY: dev
dev: clear dependencies build lint test ok

.PHONY: full
full: clear clean stop start-with-rebuild test lint ok

.PHONY: ok
ok:
	@echo "ok"
	date

.PHONY: pull-request
pull-request: update-dependencies-api test

#
# Debug options:
#   --warn-undefined-variables
#   --debug=basic
#

#
# Parameters
#
export CRYPTOMEDIC_PORT ?= 80
export VAPI := v1.3
export CYPRESS_CACHE_FOLDER := $(TMP)/cache/cypress

BACKUP_DIR ?= $(TMP)/backup-online
DEPLOY_HOST := ftp.cluster003.ovh.net
DEPLOY_MOUNT := $(TMP)/remote
DEPLOY_MOUNT_TEST_FILE := $(DEPLOY_MOUNT)/.ovhconfig
DEPLOY_TEST_DIR ?= $(TMP)/deploy-test-dir
SSH_KNOWN_HOSTS := ~/.ssh/known_hosts
DISPLAY ?= ":0"

#
# Dev env fixed
#
# From config.php
export DBUPDATEPWD := secret

#
# Fixed
#
CJS2ESM_DIR := app/cjs2esm


# See https://coderwall.com/p/cezf6g/define-your-own-function-in-a-makefile
# 1: folder where to look
# 2: base file to have files newer than, to limit the length of the output
define recursive-dependencies
	$(shell \
		if [ -r "$(2)" ]; then \
			find "$(1)" -name tests_data -prune -o -name tmp -prune -o -type f -newer "$(2)"; \
		else \
			echo "$(1)";\
		fi \
	)
endef

dump:
	@echo "Who am i:         $(shell whoami)"
	@echo "HOME:             $(HOME)"
	@echo "SHELL:            $(SHELL)"
	@echo "PATH:             $(PATH)"
	@echo "DISPLAY:          $(DISPLAY)"
	@echo "CRYPTOMEDIC_PORT: $(CRYPTOMEDIC_PORT)"
	@echo "------------------------------------------"
	@echo "MySQL:            $(shell bin/mysql --version 2>&1 )"
	@echo "MySQL Server:     $(shell bin/mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
	@echo "MySQL user:       $(shell bin/mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"
	@echo "PHP:              $(shell bin/php -r 'echo PHP_VERSION;' 2>&1 )"
	@echo "PHP composer:     $(shell bin/composer --version 2>&1 )"
	@echo "NodeJS:           $(shell bin/node --version 2>&1 )"
# @echo "Cypress:          $(shell node node_modules/.bin/cypress --version --component package 2>&1 )"
#	@echo "Chrome:           $(shell google-chrome --version 2>&1 )"
#	@echo "Supported:        $(shell npx -y browserslist 2>&1 )"

clear:
	@if [ -z "$$NO_CLEAR" ]; then clear; fi
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: deploy-unmount
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then echo "Remote mounted - stopping"; exit 1; fi
	find . -type d \( -name "vendor" -or -name "node_modules" \) -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "tmp" -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "*.log" -delete

	rm -fr live/
	rm -fr www/built
	rm -fr app/cjs2esm
	rm -fr www/api/*/bootstrap/cache
	rm -fr www/api/*/storage
	rm -fr $(TMP)

	@echo "!! Removed dependencies, so husky (commit) will not work anymore. Please make dependencies-node to enable it again"

# Kill all ports
.PHONY: clean-ports
clean-ports:
	pkill chromedriver || true
	jh-kill-by-port 9515 || true

.PHONY: start
start: dependencies build
	docker compose up -d --build

	@echo -n "Waiting for mysql to be ready"
	@while ! bin/mysqladmin ping -h "localhost" --silent >/dev/null; do sleep 1; echo -n "."; done
	@echo "Done"

	cr-data-reset

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/"

stop:
	docker compose down

reset: 
	cr-data-reset
#
#
# Tests
#
#

.PHONY: lint
lint: lint-es lint-css lint-html

.PHONY: lint-es
lint-es: $(TMP)/.dependencies-node
	node node_modules/.bin/eslint

.PHONY: lint-css
lint-css: $(TMP)/.dependencies-node
	node node_modules/.bin/stylelint app/**/*.css

.PHONY: lint-html
lint-html: $(TMP)/.dependencies-node
	node node_modules/.bin/htmlhint app/**/*.html tests/**/*.html www/api/*/public/**/*.html --format=compact

.PHONY: test # In Jenkinfile, each step is separated:
test: $(TMP)/.dependencies $(TMP)/.built test-api test-unit test-e2e test-styles

.PHONY: test-api
test-api: $(TMP)/.dependencies-api
	jh-run-and-capture cr-data-reset
	bin/cr-phpunit

.PHONY: update-references-api
update-references-api: $(TMP)/.dependencies-api
	jh-run-and-capture cr-data-reset
	COMMIT=1 bin/cr-phpunit

.PHONY: test-unit
test-unit: $(TMP)/.dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

# TODO: reenable coverage
	mkdir -p $(TMP)/js
	NOCOV=1 bin/npm run test-unit-continuously-withcov -- --single-run
# node tests/report.js

.PHONY: test-e2e
test-e2e: test-e2e-desktop test-e2e-mobile

# TODO
.PHONY: test-e2e-desktop
test-e2e-desktop: $(TMP)/.tested-e2e-desktop
$(TMP)/.tested-e2e-desktop: $(TMP)/.built $(TMP)/.dependencies $(shell find cypress/ -name "*.js")
	cr-data-reset
	cr-cypress "desktop"

	@mkdir -p "$(dir $@)"
	@touch "$@"

# TODO
.PHONY: test-e2e-mobile
test-e2e-mobile: $(TMP)/.tested-e2e-mobile
$(TMP)/.tested-e2e-mobile: $(TMP)/.built $(TMP)/.dependencies $(shell find cypress/ -name "*.js")
	cr-data-reset
	cr-cypress "mobile"

	@mkdir -p "$(dir $@)"
	@touch "$@"

# TODO
cypress-open:
	node node_modules/.bin/cypress open

# TODO
.PHONY: test-styles
test-styles: $(TMP)/styles/styles-problems-list.json
$(TMP)/styles/styles-problems-list.json: tests/styles tests/styles/references $(TMP)/.tested-e2e-desktop $(TMP)/.tested-e2e-mobile
	@rm -fr "$(dir $@)"
	@mkdir -p "$(dir $@)"
	@mkdir -p "$(dir $@)/run/mobile"
	@mkdir -p "$(dir $@)/run/desktop"

	rsync -r tests/styles/ "$(dir $@)/"
	find $(TMP)/e2e/mobile/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/mobile/" ";"
	find $(TMP)/e2e/desktop/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/desktop/" ";"

	@echo "Compare"
	bin/node tests/styles/test-styles.mjs
	@echo "Report is at http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tmp/style.html"
	du -ksh "$(dir $@)"

.PHONY: update-references-styles
update-references-styles:
	if [ ! -r $(TMP)/styles/styles-problems-list.json ]; then echo "No tmp/styles/styles-problems-list.json found!"; exit 1; fi
	@echo "Compare"
	node tests/styles/update-styles.mjs

#
# Deploy command
#

# TODO
.PHONY: deploy
deploy:
	bin/cr-deploy-patch commit

# TODO
.PHONY: deploy-test
deploy-test:
	bin/cr-deploy-patch

#
# Other commands
#

.PHONY: logs
logs:
	/setup/bin/dc-logs

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

.PHONY: dependencies-node
dependencies-node: $(TMP)/.dependencies-node
$(TMP)/.dependencies-node: package.json package-lock.json
	npm install
	touch package-lock.json

	@mkdir -p "$(dir $@)"
	@touch "$@"

# %/composer.lock: %/composer.json
# 	bin/composer install --working-dir "$(dir $@)"
# 	touch "$@"

.PHONY: dependencies-api
dependencies-api: $(TMP)/.dependencies-api
$(TMP)/.dependencies-api: \
		www/api/$(VAPI)/composer.json \
		www/api/$(VAPI)/composer.lock

	cr-ensure-folder-empty www/api/v1.3/bootstrap/cache
	bin/composer install --working-dir "www/api/$(VAPI)"

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: update-dependencies-api
update-dependencies-api:
	mkdir -m 777 -p www/api/v1.3/bootstrap/cache
	bin/composer update --working-dir "www/api/$(VAPI)/"

#
#
# Build
#
#

package-lock.json: package.json
	npm install

.PHONY: build
build: $(TMP)/.built
$(TMP)/.built: www/built/index.html www/built/browsers.json
	@mkdir -p "$(dir $@)"
	@touch "$@"

# We need to depend on axios-mock-adapter.js, because otherwise, this will force a rebuild
# due to the recursive-dependencies
www/built/index.html: $(TMP)/.dependencies-node webpack.config.js  \
		package.json package-lock.json \
		$(call recursive-dependencies,app/,www/built/index.html) \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

	node node_modules/.bin/webpack

www/built/browsers.json: .browserslistrc $(TMP)/.dependencies-node
	node node_modules/.bin/browserslist --json > "$@"

update-references-browsers:
	node node_modules/.bin/browserslist --update-db

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
	node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
	node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

# Dependencies are used in the build !
$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
	node node_modules/.bin/babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

#
#
# Deploy
#
#

# .PHONY: deploy-backup
# deploy-backup: deploy-mount
# 	rsync --progress --recursive --times --delete \
# 		--exclude $(TMP)/ \
# 		$(DEPLOY_MOUNT)/ $(BACKUP_DIR)

# .PHONY: deploy-rsync
# deploy-rsync: | deploy-mount deploy-rsync-act deploy-unmount

# .PHONY: deploy-rsync-test
# deploy-rsync-test: | deploy-mount deploy-rsync-noact deploy-unmount

# TODO
.PHONY: deploy-mount
deploy-mount:
	@if [ -z "$$CRYPTOMEDIC_UPLOAD_USER" ]; then \
		echo "Missing CRYPTOMEDIC_UPLOAD_USER" >&2; \
		exit 255; \
	fi

	@if [ -z "$$CRYPTOMEDIC_UPLOAD_PASSWORD" ]; then \
		echo "Missing CRYPTOMEDIC_UPLOAD_PASSWORD" >&2; \
		exit 255; \
	fi

	@if [ -z "$$CRYPTOMEDIC_DB_UPGRADE" ]; then \
    	echo "Missing CRYPTOMEDIC_DB_UPGRADE" >&2; \
    	exit 255; \
	fi
	@echo "Deploy config ok"

	@mkdir -p $(DEPLOY_MOUNT)
	if [ ! -r $(DEPLOY_MOUNT_TEST_FILE) ]; then \
		SSHPASS="$$CRYPTOMEDIC_UPLOAD_PASSWORD" sshpass -e \
			sshfs -f -o uid=$(shell id -u) \
				$(CRYPTOMEDIC_UPLOAD_USER)@$(DEPLOY_HOST):/home/$(CRYPTOMEDIC_UPLOAD_USER) $(DEPLOY_MOUNT) & \
	fi \

# TODO
.PHONY: deploy-unmount
deploy-unmount:
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then \
		fusermount -u $(DEPLOY_MOUNT); \
	fi

# .PHONY: deploy-rsync-act
# deploy-rsync-act: setup-structure \
# 		$(TMP)/.dependencies \
# 		$(TMP)/.built \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)

# .PHONY: deploy-rsync-noact
# deploy-rsync-noact: setup-structure \
# 		$(TMP)/.dependencies \
# 		$(TMP)/.built \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--dry-run \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)
