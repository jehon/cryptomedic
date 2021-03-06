
TMP=$(shell realpath "tmp/")

#
# Debug options:
#   --warn-undefined-variables
#   --debug=basic
#

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

dump: dump-cypress
	@echo "CRYPTOMEDIC_PORT: $(CRYPTOMEDIC_PORT)"
	@echo "DISPLAY:          $(DISPLAY)"
	@echo "IN_DOCKER:        $(IN_DOCKER)"
	@echo "SHELL:            $(SHELL)"
	@echo "PATH:             $(PATH)"
	@echo "Who am i:         $(shell whoami)"
	@echo "Id:               $(shell id)"
	@echo "Supported:        $(shell npx browserslist)"

dump-docker-compose:
	docker-compose config

dump-cypress:
	$(cypress) info

all: start

clear:
	@clear
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: deploy-unmount chmod
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
	rm -fr tmp

	@echo "!! Removed dependencies, so husky (commit) will not work anymore. Please make dependencies-node to enable it again"

# Kill all ports
.PHONY: clean-ports
clean-ports:
	pkill chromedriver || true
	jh-kill-by-port.sh 9515 || true

.PHONY: setup-computer
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
	cr-fix-permissions

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tests/index.html"

.PHONY: stop
stop: deploy-unmount chmod
	docker-compose down || true
	cr-kill-others $(CRYPTOMEDIC_PORT)

.PHONY: chmod
chmod:
	cr-fix-permissions

.PHONY: full
full: clear test lint

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
test: dependencies tmp/.build test-api test-api-bare test-unit test-e2e test-styles

.PHONY: test-api
test-api: tmp/.dependencies-api
	cr-ensure-started
	cr-data-reset
	cr-phpunit laravel

.PHONY: update-references-api
update-references-api: tmp/.dependencies-api
	cr-data-reset
	cr-phpunit COMMIT

test-api-bare: tmp/.dependencies-api
	cr-ensure-started
	cr-data-reset
	cr-phpunit bare

.PHONY: test-unit
test-unit: tmp/.dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

	npm run test-unit-continuously-withcov -- --single-run

	node tests/report.js

.PHONY: test-e2e
test-e2e: test-e2e-desktop test-e2e-mobile
# 	cr-fix-permissions tmp/e2e
# 	@rm -fr tmp/e2e

# # TODO -> no call itself
# 	$(call itself,tmp/e2e/.tested-desktop)
# 	$(call itself,tmp/e2e/.tested-mobile)

.PHONY: test-e2e-desktop
test-e2e-desktop: tmp/.tested-e2e-desktop
tmp/.tested-e2e-desktop: tmp/.build $(shell find cypress/ -name "*.js") dependencies
	cr-fix-permissions tmp/e2e
	cr-data-reset
	cr-cypress

	@mkdir -p "$(dir $@)"
	@touch "$@"
	cr-fix-permissions tmp/e2e

.PHONY: test-e2e-mobile
test-e2e-mobile: tmp/.tested-e2e-mobile
tmp/.tested-e2e-mobile: tmp/.build $(shell find cypress/ -name "*.js") dependencies
	cr-fix-permissions tmp/e2e
	cr-data-reset
	cr-cypress "mobile"

	@mkdir -p "$(dir $@)"
	@touch "$@"
	cr-fix-permissions tmp/e2e

cypress-open: chmod
	$(shell npm bin)/cypress open

#
# Display does not work through WSL
#
# echo "DISPLAY: $(DISPLAY)"
# $(cypress) open -e DISPLAY

# docker-compose run --rm -e CYPRESS_BASE_URL="http://server:80" \
# 	-e DISPLAY=$(DISPLAY) -v /tmp/.X11-unix:/tmp/.X11-unix \
# 	cypress \
# 	open

.PHONY: test-styles
test-styles: tmp/styles.json
tmp/styles.json: tests/styles/* tests/styles/references/* tmp/.tested-e2e-desktop tmp/.tested-e2e-mobile
# TODO -> from dev

	@echo "Compare"
	npm run --silent test-styles
	@echo "Report is at http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tmp/style.html"

# Dependencies to force partial rebuild
test-styles-only-desktop: tmp/.tested-e2e-desktop
	npm run --silent test-styles -m desktop

# Dependencies to force partial rebuild
test-styles-only-mobile: tmp/.tested-e2e-mobile
	npm run --silent test-styles -m mobile

.PHONY: update-references-style
update-references-style:
	npm run --silent test-styles -- --update

#
# Deploy command
#
.PHONY: deploy
deploy:
# TODO -> from dev + rewrite
	bin/cr-deploy-patch commit

.PHONY: deploy-test
deploy-test:
# TODO -> from dev + rewrite
	bin/cr-deploy-patch

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
.PHONY: dependencies
dependencies: tmp/.dependencies-node tmp/.dependencies-api tmp/.dependencies-api-bare

.PHONY: dependencies-node
dependencies-node: tmp/.dependencies-node
tmp/.dependencies-node: package.json package-lock.json
# TODO -> from dev
	npm install
	touch package-lock.json

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: dependencies-api
dependencies-api: tmp/.dependencies-api
tmp/.dependencies-api: tmp/.dependencies-api-bare \
		www/api/$(VAPI)/composer.json \
		www/api/$(VAPI)/composer.lock

	cr-ensure-folder-empty www/api/v1.3/bootstrap/cache
	cr-dependencies-php "www/api/$(VAPI)"

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: dependencies-api-bare
dependencies-api-bare: tmp/.dependencies-api-bare
tmp/.dependencies-api-bare: \
		www/api/$(VAPI)/public/composer.json \
		www/api/$(VAPI)/public/composer.lock

	cr-dependencies-php "www/api/$(VAPI)/public"

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: update-dependencies-api
update-dependencies-api: tmp/.dependencies-bare
	mkdir -m 777 -p www/api/v1.3/bootstrap/cache
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
build: tmp/.build
tmp/.build: www/build/index.html www/build/browsers.json
	@mkdir -p "$(dir $@)"
	@touch "$@"

# We need to depend on axios-mock-adapter.js, because otherwise, this will force a rebuild
# due to the recursive-dependencies
www/build/index.html: tmp/.dependencies-node webpack.config.js  \
		package.json package-lock.json \
		$(call recursive-dependencies,app/,www/build/index.html) \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

# TODO -> from dev
	$(NM_BIN)webpack

www/build/browsers.json: .browserslistrc tmp/.dependencies-node
	npx browserslist --json > "$@"

update-references-browsers:
	npx browserslist --update

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

# Dependencies are used in the build !
$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

# Dependencies are used in the build !
$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
# TODO -> from dev
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

#
#
# data
#
#
.PHONY: data-reset
data-reset: tmp/.dependencies-api-bare chmod
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
# 		tmp/.build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)

# .PHONY: deploy-rsync-noact
# deploy-rsync-noact: setup-structure \
# 		dependencies \
# 		tmp/.build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--dry-run \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)
