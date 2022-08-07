
TMP=$(shell realpath "tmp/")
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
export CRYPTOMEDIC_PORT ?= 5080
export VAPI := v1.3

BACKUP_DIR ?= tmp/backup-online
DEPLOY_HOST := ftp.cluster003.ovh.net
DEPLOY_MOUNT := tmp/remote
DEPLOY_MOUNT_TEST_FILE := $(DEPLOY_MOUNT)/.ovhconfig
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
	@echo "CRYPTOMEDIC_PORT: $(CRYPTOMEDIC_PORT)"
	@echo "Chrome:           $(shell google-chrome --version)"
	@echo "NodeJS:           $(shell node --version)"
	@echo "Bash:             $(shell bash --version)"
	@echo "Docker:           $(shell docker --version)"
	@echo "Docker compose:   $(shell docker compose version)"
	@echo "DISPLAY:          $(DISPLAY)"
	@echo "IN_DOCKER:        $(IN_DOCKER)"
	@echo "SHELL:            $(SHELL)"
	@echo "PATH:             $(PATH)"
	@echo "Who am i:         $(shell whoami)"
	@echo "Id:               $(shell id)"
	@echo "Supported:        $(shell npx -y browserslist)"
# docker compose config

dump-dockers:
	@echo "[server] Php version"
	@cr-docker-compose exec -T "server" php -v

	@echo "[mysql] mysqld version"
	@cr-docker-compose exec -T "mysql" mysql --user=root --password=root --database=mysql -e "SELECT VERSION();"

	@echo "[mysql] mysql version"
	@cr-docker-compose exec -T "mysql" mysql --version

	@echo "[cypress] version"
	@cr-docker-compose run "cypress" version --component package

clear:
	@if [ -z "$$NO_CLEAR" ]; then clear; fi
	@echo "**"
	@echo "**"
	@echo "** Tests starting at $$(date) **"
	@echo "**"
	@echo "**"

clean: deploy-unmount chmod
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
	jh-kill-by-port 9515 || true

# TODO
.PHONY: start-with-rebuild
docker-rebuild:
	docker compose down
	docker system prune -f
	docker compose build --pull --no-cache

# TODO
.PHONY: start
start:
	cr-ensure-started
	cr-fix-permissions

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/"

# TODO
.PHONY: stop
stop: deploy-unmount chmod
	docker compose down || true
	cr-kill-others $(CRYPTOMEDIC_PORT)

# TODO
.PHONY: chmod
chmod:
	cr-fix-permissions

#
#
# Tests
#
#

# TODO
.PHONY: lint
lint: lint-es lint-css lint-html

# TODO
.PHONY: lint-es
lint-es: tmp/.dependencies-node
	$(NPM_BIN)/eslint

# TODO
.PHONY: lint-css
lint-css: tmp/.dependencies-node
	$(NPM_BIN)/stylelint app/**/*.css

# TODO
.PHONY: lint-html
lint-html: tmp/.dependencies-node
	$(NPM_BIN)/htmlhint app/**/*.html tests/**/*.html www/api/*/public/**/*.html --format=compact

# TODO
.PHONY: test # In Jenkinfile, each step is separated:
test: tmp/.dependencies tmp/.build test-api test-api-bare test-unit test-e2e test-styles

# TODO
.PHONY: test-api
test-api: tmp/.dependencies-api
	cr-ensure-started
	cr-capture-output cr-data-reset
	cr-phpunit laravel

# TODO
.PHONY: update-references-api
update-references-api: tmp/.dependencies-api
	cr-capture-output cr-data-reset
	COMMIT=1 cr-phpunit

# TODO
test-api-bare: tmp/.dependencies-api
	cr-ensure-started
	cr-capture-output cr-data-reset
	cr-phpunit bare

.PHONY: test-unit
test-unit: tmp/.dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js

# TODO: reenable coverage
# TODO(user): run as user
	mkdir -p tmp/js && chown user tmp/js && su user bash -c "NOCOV=1 npm run test-unit-continuously-withcov -- --single-run"
# node tests/report.js

# TODO
.PHONY: test-e2e
test-e2e: test-e2e-desktop test-e2e-mobile
# 	cr-fix-permissions tmp/e2e
# 	@rm -fr tmp/e2e

# TODO
.PHONY: test-e2e-desktop
test-e2e-desktop: tmp/.tested-e2e-desktop
tmp/.tested-e2e-desktop: tmp/.build $(shell find cypress/ -name "*.js") tmp/.dependencies
	cr-fix-permissions tmp/e2e
	cr-cypress "desktop"

	@mkdir -p "$(dir $@)"
	@touch "$@"
	cr-fix-permissions tmp/e2e

# TODO
.PHONY: test-e2e-mobile
test-e2e-mobile: tmp/.tested-e2e-mobile
tmp/.tested-e2e-mobile: tmp/.build $(shell find cypress/ -name "*.js") tmp/.dependencies
	cr-fix-permissions tmp/e2e
	cr-cypress "mobile"

	@mkdir -p "$(dir $@)"
	@touch "$@"
	cr-fix-permissions tmp/e2e

# TODO
cypress-open: chmod
	$(shell npm bin)/cypress open

#
# Display does not work through WSL
#
# echo "DISPLAY: $(DISPLAY)"
# $(cypress) open -e DISPLAY

# cr-docker-compose run -e CYPRESS_BASE_URL="http://server:80" \
# 	-e DISPLAY=$(DISPLAY) -v /tmp/.X11-unix:/tmp/.X11-unix \
# 	cypress \
# 	open

# TODO
.PHONY: test-styles
test-styles: tmp/styles/styles-problems-list.js
tmp/styles/styles-problems-list.js: tests/styles/* tests/styles/references/* tmp/.tested-e2e-desktop tmp/.tested-e2e-mobile
	@rm -fr "$(dir $@)"
	@mkdir -p "$(dir $@)"
	@mkdir -p "$(dir $@)/run/mobile"
	@mkdir -p "$(dir $@)/run/desktop"

	rsync -r tests/styles/ "$(dir $@)/"
	find tmp/e2e/mobile/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/mobile/" ";"
	find tmp/e2e/desktop/screenshots/ -type "f" -exec "cp" "{}" "$(dir $@)/run/desktop/" ";"

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

# TODO
.PHONY: logs
logs:
	docker compose logs -f --tail=10 | sed 's/\\n/\n/g'

#
#
# Install > dependencies
#
#

# TODO
.PHONY: dependencies
dependencies: tmp/.dependencies
tmp/.dependencies: tmp/.dependencies-node tmp/.dependencies-api tmp/.dependencies-api-bare
	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: dependencies-node
dependencies-node: tmp/.dependencies-node
tmp/.dependencies-node: package.json package-lock.json
	npm install
	touch package-lock.json

	@mkdir -p "$(dir $@)"
	@touch "$@"

# %/composer.lock: %/composer.json
# 	cd $(dir $@) && cr-capture-output /composer.phar install
# 	touch "$@"

.PHONY: dependencies-api
dependencies-api: tmp/.dependencies-api
tmp/.dependencies-api: tmp/.dependencies-api-bare \
		www/api/$(VAPI)/composer.json \
		www/api/$(VAPI)/composer.lock

	cr-ensure-folder-empty www/api/v1.3/bootstrap/cache
	cd "www/api/$(VAPI)" && /composer.phar update

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: dependencies-api-bare
dependencies-api-bare: tmp/.dependencies-api-bare
tmp/.dependencies-api-bare: \
		www/api/$(VAPI)/public/composer.json \
		www/api/$(VAPI)/public/composer.lock

	cd "www/api/$(VAPI)/public" && /composer.phar update

	@mkdir -p "$(dir $@)"
	@touch "$@"

.PHONY: update-dependencies-api
update-dependencies-api: tmp/.dependencies-api-bare
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

	$(NM_BIN)webpack

www/build/browsers.json: .browserslistrc tmp/.dependencies-node
	npx -y browserslist --json > "$@"

# TODO
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
# data
#
#
# TODO
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
# 		tmp/.dependencies \
# 		tmp/.build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)

# .PHONY: deploy-rsync-noact
# deploy-rsync-noact: setup-structure \
# 		tmp/.dependencies \
# 		tmp/.build \
# 		deploy-mount

# 	rsync --recursive --itemize-changes --times \
# 		--dry-run \
# 		--filter='dir-merge /deploy-filter' \
# 		--delete --delete-excluded \
# 		. $(DEPLOY_MOUNT)
