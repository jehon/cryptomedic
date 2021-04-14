
TMP=$(shell realpath "tmp/")

#
# Parameters
#
export CRYPTOMEDIC_PORT ?= 5080
export VAPI := v1.3

BACKUP_DIR ?= tmp/backup-online
DEPLOY_HOST := ftp.cluster003.ovh.net
DEPLOY_MOUNT := tmp/remote
DEPLOY_MOUNT_TEST_FILE := $(DEPLOY_MOUNT)/favicon.ico
DEPLOY_TEST_DIR ?= tmp/deploy-test-dir
SSH_KNOWN_HOSTS := ~/.ssh/known_hosts

#
# Dev env fixed
#
export DBNAME := cryptomedic
# From docker-compose.yml
export DBPASS := password
export DBROOTPASS := password
export DBUSER := username
# From config.php
export DBUPDATEPWD := secret

#
# Fixed
#
CJS2ESM_DIR := app/cjs2esm
NM_BIN := $(shell npm bin)/
STYLES_RUN_SCREENSHOTS=$(TMP)/styles/run

export ROOT = $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
export PATH := $(ROOT)/bin:$(PATH)

define itself
	$(MAKE) $(FLAGS) $(MAKEOVERRIDES) "$1"
endef

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
	@echo "SHELL:            $(SHELL)"
	@echo "CRYPTOMEDIC_PORT: $(CRYPTOMEDIC_PORT)"
	@echo "IN_DOCKER:        $(IN_DOCKER)"
	@echo "PATH:             $(PATH)"
	@echo "TMP:              $(TMP)"
	@echo "Who am i:         $(shell whoami)"
	@echo "Who am i:         $(shell id)"
	@echo "Supported:        $(shell npx browserslist)"

dump-docker-compose:
	docker-compose config

dump-in-docker:
	cr-in-docker dev "make dump"

all: start

clear:
	clear

clean: deploy-unmount
# TODO: in dev ?
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then echo "Remote mounted - stopping"; exit 1; fi
	find . -type d \( -name "vendor" -or -name "node_modules" \) -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "tmp" -prune -exec "rm" "-fr" "{}" ";" || true
	find . -name "*.log" -delete

	rm -fr live/
	rm -fr www/build
	rm -fr app/cjs2esm
	rm -fr www/api/*/bootstrap/cache
	rm -fr www/api/*/storage
	rm -fr tests/cypress/screenshots
	rm -fr tests/cypress/videos

	@echo "!! Removed dependencies, so husky (commit) will not work anymore. Please make dependencies-node to enable it again"

# Kill all ports
.PHONY: clean-ports
clean-ports:
	pkill chromedriver || true
	jh-kill-by-port.sh 9515 || true

setup-computer:
# TODO -> deploy from dev
# Test the remote key
	@REMOTE="$(shell ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) 2>/dev/null )"; \
	STORED="$(shell cat conf/ovh.key)"; \
	if [ "$$REMOTE" != "$$STORED" ]; then \
		echo "Key is updated on remote host"; \
		exit 1; \
	else  \
		echo "Key is still the same, good!"; \
	fi

	mkdir -p ~/.ssh/
	@if grep $(DEPLOY_HOST) $(SSH_KNOWN_HOSTS) >/dev/null; then \
		echo "Removing old key"; \
		sed -i "/$(DEPLOY_HOST).*/d" $(SSH_KNOWN_HOSTS) ; \
	fi
	@echo "Installing the key"
	cat conf/ovh.key >> $(SSH_KNOWN_HOSTS)

update-config-host-key:
# TODO -> deploy from dev
	ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) > conf/ovh.key

.PHONY: start
start:
	cr-ensure-started
	cr-fix-permissions '.'
	cr-data-reset

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tests/index.html"

.PHONY: stop
stop: deploy-unmount
	docker-compose down || true
	cr-kill-others $(CRYPTOMEDIC_PORT)

.PHONY: chmod
chmod:
	cr-fix-permissions || true

.PHONY: full
full: test lint
	@jh-git-status.sh

#
#
# Tests
#
#

.PHONY: lint
lint: dependencies-node
# TODO -> from dev
	npm run eslint
	npm run stylelint

.PHONY: test # In Jenkinfile, each step is separated:
test: dependencies build test-api test-api-bare test-unit test-e2e test-styles

.PHONY: test-api
test-api: dependencies-api
	cr-data-reset
	cr-phpunit laravel

.PHONY: update-references-api
update-references-api: dependencies-api
	cr-data-reset
	cr-phpunit COMMIT

test-api-bare: dependencies-api
	cr-data-reset
	cr-phpunit bare

.PHONY: test-unit
test-unit: dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js
# TODO -> from dev
	npm run test-unit-continuously-withcov -- --single-run
	node tests/report.js

.PHONY: test-e2e
test-e2e:
# TODO -> from dev
	rm -fr $(TMP)/e2e
	rm -fr $(STYLES_RUN_SCREENSHOTS)

# TODO -> no call itself
	$(call itself,test-e2e-nightwatch)
	$(call itself,test-e2e-cypress)

test-e2e-nightwatch: tmp/e2e/.tested-nightwatch
tmp/e2e/.tested-nightwatch: www/build/index.html $(call recursive-dependencies,tests/e2e,$(TMP)/e2e/.tested-nightwatch) $(STYLES_RUN_SCREENSHOTS)
# TODO -> from dev
	cr-data-reset
	rm -fr tmp/e2e/browsers
	find "$(STYLES_RUN_SCREENSHOTS)" -type f -not -name '*.spec*' -delete
	npm run --silent test-e2e
	@echo "Nightwatch screenshots"
	rsync -r \
		--include "*_reference.png" --include "*_reference_*.png" --exclude "*" \
		"$(TMP)/e2e/browsers/firefox/" "$(TMP)/styles/run"
	touch "$@"

test-e2e-cypress: tmp/e2e/.tested-cypress
tmp/e2e/.tested-cypress: www/build/index.html $(call recursive-dependencies,tests/e2e,$(TMP)/e2e/.tested-cypress) $(STYLES_RUN_SCREENSHOTS)
# TODO -> from dev
	cr-data-reset
	rm -fr tests/cypress/screenshots
	find "$(STYLES_RUN_SCREENSHOTS)" -type f -name '*.spec*' -delete
	CYPRESS_BASE_URL="http://localhost:$(CRYPTOMEDIC_PORT)" npm run --silent "cypress:run"
	@echo "Cypress screenshots"
	find tests/cypress/screenshots/ -type f | while read -r F ; do \
		cp "$$F" "$(STYLES_RUN_SCREENSHOTS)/$$(basename $$F)"; \
	done
	touch "$@"

.PHONY: test-styles
test-styles: tmp/styles.json
tmp/styles.json: tests/styles/* tests/styles/references/* tmp/e2e/.tested-cypress tmp/e2e/.tested-nightwatch $(STYLES_RUN_SCREENSHOTS)
# TODO -> from dev
# @mkdir -p "$(TMP)/styles"
# @rm -fr "$(TMP)/styles/run"
# @mkdir -p "$(TMP)/styles/run"

	@echo "Compare"
	npm run --silent test-styles
	@echo "Report is at http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tmp/style.html"

$(STYLES_RUN_SCREENSHOTS):
	mkdir -p "$@"

.PHONY: update-references-style
update-references-style:
	rsync -i -rt --delete \
		--ignore-times \
		"$(STYLES_RUN_SCREENSHOTS)/" "tests/styles/references/"

#
# Deploy command
#
.PHONY: deploy
deploy:
# TODO -> from dev + rewrite
	bin/cryptomedic-deploy-patch.sh commit

.PHONY: deploy-test
deploy-test:
# TODO -> from dev + rewrite
	bin/cryptomedic-deploy-patch.sh

#
# Other commands
#
.PHONY: logs
logs:
	docker-compose logs -f --tail=10 | sed 's/\\n/\n/g'

#
#
# Install > dependencies
#
#
.PHONY: depencencies
dependencies: dependencies-node dependencies-api depencencies-api-bare

.PHONY: dependencies-node
dependencies-node: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
# TODO -> from dev
	npm install
	touch package-lock.json
	touch node_modules/.dependencies

.PHONY: depencencies-api
dependencies-api: www/api/$(VAPI)/vendor/.dependencies
www/api/$(VAPI)/vendor/.dependencies: www/api/$(VAPI)/public/vendor/.dependencies \
		www/api/$(VAPI)/composer.json \
		www/api/$(VAPI)/composer.lock

	mkdir -m 777 -p www/api/v1.3/bootstrap/cache

	cr-dependencies-php "www/api/$(VAPI)"

.PHONY: depencencies-api-bare
dependencies-api-bare: www/api/$(VAPI)/public/vendor/.dependencies
www/api/$(VAPI)/public/vendor/.dependencies: \
		www/api/$(VAPI)/public/composer.json \
		www/api/$(VAPI)/public/composer.lock

	cr-dependencies-php "www/api/$(VAPI)/public"

.PHONY: update-dependencies-api
update-dependencies-api:
	cr-dependencies-php "www/api/$(VAPI)" "update"

.PHONY: update-dependencies-api-bare
update-dependencies-api-bare:
	cr-dependencies-php "www/api/$(VAPI)/public" "update"

#
#
# Build
#
#

package-lock.json: package.json
# TODO -> from dev
	npm install

.PHONY: build
build: www/build/index.html www/build/browsers.json
www/build/index.html: node_modules/.dependencies webpack.config.js \
		package.json package-lock.json \
		$(call recursive-dependencies,app/,www/build/index.html) \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/platform.js

# TODO -> from dev
	$(NM_BIN)webpack

www/build/browsers.json: .browserslistrc
	npx browserslist --json > "$@"

update-references-browsers:
	npx browserslist --update

$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

#
#
# data
#
#
.PHONY: database-backup
database-backup:
	cr-in-docker mysql "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)" > $(DB_BASE)

.PHONY: data-reset
data-reset: dependencies-api-bare chmod
	cr-data-reset

#
#
# Deploy
#
#

# .PHONY: deploy-backup
# deploy-backup: deploy-mount
# 	rsync --progress --recursive --times --delete \
# 		--exclude tmp/ \
# 		$(DEPLOY_MOUNT)/ $(BACKUP_DIR)

# .PHONY: deploy-rsync
# deploy-rsync: | deploy-mount deploy-rsync-act deploy-unmount

# .PHONY: deploy-rsync-test
# deploy-rsync-test: | deploy-mount deploy-rsync-noact deploy-unmount

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

.PHONY: deploy-unmount
deploy-unmount:
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then \
		fusermount -u $(DEPLOY_MOUNT); \
	fi

# .PHONY: deploy-rsync-act
# deploy-rsync-act: setup-structure \
# 		dependencies \
# 		build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)

# .PHONY: deploy-rsync-noact
# deploy-rsync-noact: setup-structure \
# 		dependencies \
# 		build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--dry-run \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)
