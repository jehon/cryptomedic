
export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)
TMP := $(ROOT)/tmp

GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
NPM_BIN=$(shell npm bin)

# Default target
.PHONY: dev
dev: clear clean test lint ok

.PHONY: full
full: clear clean stop start-with-rebuild test lint ok

.PHONY: ok
ok:
	@echo "ok"
	date

.PHONY: pull-request
pull-request: update-dependencies-api-bare update-dependencies-api test

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
NM_BIN := $(shell npm bin)/


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
	@echo "--------------- Supervisor ---------------"
	sudo /usr/bin/supervisorctl status
	@echo "------------------------------------------"
	@echo "Docker:           $(shell docker --version 2>&1 )"
	@echo "MySQL:            $(shell mysql --version 2>&1 )"
	@echo "MySQL Server:     $(shell mysql --silent --database mysql --raw --skip-column-names -e "SELECT VERSION();" 2>&1)"
	@echo "MySQL user:       $(shell mysql --silent --database mysql --raw --skip-column-names -e "SELECT CURRENT_USER; " 2>&1)"
	@echo "PHP:              $(shell php -r 'echo PHP_VERSION;' 2>&1 )"
	@echo "NodeJS:           $(shell node --version 2>&1 )"
	@echo "Cypress:          $(shell $(NM_BIN)/cypress --version --component package 2>&1 )"
	@echo "Chrome:           $(shell google-chrome --version 2>&1 )"
	@echo "Supported:        $(shell npx -y browserslist 2>&1 )"
	@echo "---"
	ls -l /var/run/mysqld/mysqld.sock || true
	@echo "---"
	ls -ld /usr/data
	@echo "---"
	ls -l /usr/data/
	@echo "---"
	cat /setup/log/mysql_error.l0og
	@echo "---"
	pgrep mysql

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
start: dependencies
	jh-run-and-capture cr-data-reset

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/"

#
#
# Tests
#
#

.PHONY: lint
lint: lint-es lint-css lint-html

.PHONY: lint-es
lint-es: $(TMP)/.dependencies-node
	$(NPM_BIN)/eslint

.PHONY: lint-css
lint-css: $(TMP)/.dependencies-node
	$(NPM_BIN)/stylelint app/**/*.css

.PHONY: lint-html
lint-html: $(TMP)/.dependencies-node
	$(NPM_BIN)/htmlhint app/**/*.html tests/**/*.html www/api/*/public/**/*.html --format=compact

.PHONY: test # In Jenkinfile, each step is separated:
test: $(TMP)/.dependencies $(TMP)/.built test-api test-api-bare test-unit test-e2e test-styles

.PHONY: test-api
test-api: $(TMP)/.dependencies-api
	jh-run-and-capture cr-data-reset
	cr-phpunit laravel

.PHONY: update-references-api
update-references-api: $(TMP)/.dependencies-api
	jh-run-and-capture cr-data-reset
	COMMIT=1 cr-phpunit

test-api-bare: $(TMP)/.dependencies-api
	jh-run-and-capture cr-data-reset
	cr-phpunit bare

.PHONY: test-unit
test-unit: $(TMP)/.dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

# TODO: reenable coverage
	mkdir -p $(TMP)/js
	NOCOV=1 npm run test-unit-continuously-withcov -- --single-run
# node tests/report.js

.PHONY: test-e2e
test-e2e: test-e2e-desktop test-e2e-mobile

# TODO
.PHONY: test-e2e-desktop
test-e2e-desktop: $(TMP)/.tested-e2e-desktop
$(TMP)/.tested-e2e-desktop: $(TMP)/.built $(TMP)/.dependencies $(shell find cypress/ -name "*.js")
	cr-cypress "desktop"

	@mkdir -p "$(dir $@)"
	@touch "$@"

# TODO
.PHONY: test-e2e-mobile
test-e2e-mobile: $(TMP)/.tested-e2e-mobile
$(TMP)/.tested-e2e-mobile: $(TMP)/.built $(TMP)/.dependencies $(shell find cypress/ -name "*.js")
	cr-cypress "mobile"

	@mkdir -p "$(dir $@)"
	@touch "$@"

# TODO
cypress-open:
	$(shell npm bin)/cypress open

# TODO
.PHONY: test-styles
test-styles: $(TMP)/styles/styles-problems-list.js
$(TMP)/styles/styles-problems-list.js: tests/styles/* tests/styles/references/* $(TMP)/.tested-e2e-desktop $(TMP)/.tested-e2e-mobile
	@rm -fr "$(dir $@)"
	@mkdir -p "$(dir $@)"
	@mkdir -p "$(dir $@)/run/mobile"
	@mkdir -p "$(dir $@)/run/desktop"

	rsync -r tests/styles/ "$(dir $@)/"
	find $(TMP)/e2e/mobile/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/mobile/" ";"
	find $(TMP)/e2e/desktop/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/desktop/" ";"

	@echo "Compare"
	npm run --silent test-styles
	@echo "Report is at http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tmp/style.html"
	du -ksh "$(dir $@)"

# TODO
.PHONY: update-references-style
update-references-style:
	npm run --silent test-styles -- --update

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
$(TMP)/.dependencies: $(TMP)/.dependencies-node $(TMP)/.dependencies-api $(TMP)/.dependencies-api-bare
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
# 	cd $(dir $@) && /composer.phar install
# 	touch "$@"

.PHONY: dependencies-api
dependencies-api: $(TMP)/.dependencies-api
$(TMP)/.dependencies-api: $(TMP)/.dependencies-api-bare \
		www/api/$(VAPI)/composer.json \
		www/api/$(VAPI)/composer.lock

	cr-ensure-folder-empty www/api/v1.3/bootstrap/cache
	cd "www/api/$(VAPI)" && /composer.phar update

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: dependencies-api-bare
dependencies-api-bare: $(TMP)/.dependencies-api-bare
$(TMP)/.dependencies-api-bare: \
		www/api/$(VAPI)/public/composer.json \
		www/api/$(VAPI)/public/composer.lock

	cd "www/api/$(VAPI)/public" && /composer.phar update

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: update-dependencies-api
update-dependencies-api: $(TMP)/.dependencies-api-bare
	mkdir -m 777 -p www/api/v1.3/bootstrap/cache
	cd "www/api/$(VAPI)" && /composer.phar update

.PHONY: update-dependencies-api-bare
update-dependencies-api-bare:
	cd "www/api/$(VAPI)/public" && /composer.phar update

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

	$(NM_BIN)webpack

www/built/browsers.json: .browserslistrc $(TMP)/.dependencies-node
	npx -y browserslist --json > "$@"

update-references-browsers:
	npx -y browserslist --update-db

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

# Dependencies are used in the build !
$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

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
