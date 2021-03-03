
VAPI := v1.3
DBNAME := cryptomedic
# From docker-compose.yml
DBUSER := username
DBPASS := password
DBROOTPASS := password
# From config.php
DBUPDATEPWD := secret
DB_BASE := conf/database/base.sql

DEPLOY_HOST := ftp.cluster003.ovh.net

CRYPTOMEDIC_PORT ?= 5080

DOCKERCOMPOSE := CRYPTOMEDIC_PORT=$(CRYPTOMEDIC_PORT) HOST_UID=$(shell id -u) HOST_GID=$(shell id -g) docker-compose

SSH_KNOWN_HOSTS := ~/.ssh/known_hosts

DEPLOY_MOUNT := tmp/remote
DEPLOY_MOUNT_TEST_FILE := $(DEPLOY_MOUNT)/favicon.ico
BACKUP_DIR ?= tmp/backup-online
DEPLOY_TEST_DIR ?= tmp/deploy-test-dir
CJS2ESM_DIR := app/cjs2esm
NM_BIN := node_modules/.bin/

define itself
	$(MAKE) $(FLAGS) $(MAKEOVERRIDES) "$1"
endef

define ensure_folder_empty
	rm -fr "$1"
	mkdir -p "$1"
endef

define run_in_docker
	@if [ "$(IN_DOCKER)" = "$(1)" ]; then \
		echo "- Running natively $(1) - $(2)"; \
		/bin/bash -c $(2); \
	else \
		echo "- Running in docker $(1) - $(2)"; \
		$(DOCKERCOMPOSE) exec --user $(shell id -u) -T "$(1)" /bin/bash -c $(2); \
	fi
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
	@echo "Who am i:         $(shell whoami)"
	@echo "Who am i(uid):    $(shell id -u)"
	@echo "Who am i(gid):    $(shell id -g)"
	@echo "DOCKERCOMPOSE:    $(DOCKERCOMPOSE)"
	$(DOCKERCOMPOSE) config

dump-in-docker: docker-started
	$(call run_in_docker,dev,"make dump")

all: start

clear:
	clear

clean: deploy-unmount stop
	if [ -r $(DEPLOY_MOUNT_TEST_FILE) ]; then echo "Remote mounted - stopping"; exit 1; fi
	rm -fr node_modules
	rm -fr www/maintenance/vendor
	rm -fr www/api/$(VAPI)/vendor
	rm -fr www/api/$(VAPI)/public/vendor
	rm -fr vendor

	rm -fr "tmp/"
	find . -name "*.log" -delete
	rm -fr www/build
	rm -fr app/cjs2esm

	$(call ensure_folder_empty,www/api/$(VAPI)/bootstrap/cache/)
	$(call ensure_folder_empty,www/api/$(VAPI)/app/public)
	$(call ensure_folder_empty,www/api/$(VAPI)/storage/framework/cache)
	$(call ensure_folder_empty,www/api/$(VAPI)/storage/framework/cache/data)
	$(call ensure_folder_empty,www/api/$(VAPI)/storage/framework/sessions)
	$(call ensure_folder_empty,www/api/$(VAPI)/storage/framework/views)
	$(call ensure_folder_empty,www/api/$(VAPI)/storage/logs/)
	$(call ensure_folder_empty,live/)

setup: setup-structure

setup-computer:
# Test the remote key
	@REMOTE="$(shell ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) 2>/dev/null )"; \
	STORED="$(shell cat ovh.key)"; \
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
	cat ovh.key >> $(SSH_KNOWN_HOSTS)

update-config-host-key:
	ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) > ovh.key

.PHONY: start
start: setup-structure \
		docker-started \
		dependencies \
		build

	$(call itself,data-reset)

	@echo "Open browser: http://localhost:$(CRYPTOMEDIC_PORT)/"
	@echo "Test page: http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tests/index.html"

.PHONY: docker-started
docker-started:
	@if ! nc -w 1 -z localhost $(CRYPTOMEDIC_PORT) ; then \
		$(DOCKERCOMPOSE) up --build -d; \
	fi

.PHONY: stop
stop: deploy-unmount
	$(DOCKERCOMPOSE) down || true

.PHONY: full
full: test lint
	@echo "** Status **"
	@git status -s
	@echo "** Stash list **"
	@git stash list
#
#
# Tests
#
#

.PHONY: lint
lint: dependencies-node
	npm run eslint
	npm run stylelint

.PHONY: test # In Jenkinfile, each step is separated:
test: docker-started dependencies build test-api test-api-bare test-unit test-e2e test-style

.PHONY: test-api
test-api: docker-started dependencies-api
	$(call itself,data-reset)
	$(call run_in_docker,server,"/app/bin/dev-phpunit.sh laravel")

.PHONY: update-references-api
update-references-api: docker-started dependencies-api
	$(call itself,data-reset)
	$(call run_in_docker,server,"/app/bin/dev-phpunit.sh COMMIT")

test-api-bare: dependencies-api
	$(call itself,data-reset)
	$(call run_in_docker,server,"/app/bin/dev-phpunit.sh bare")

.PHONY: test-unit
test-unit: dependencies-node \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/axios-mock-adapter.js \
		$(CJS2ESM_DIR)/platform.js
	npm run test-unit-continuously-withcov -- --single-run
	node tests/report.js

.PHONY: test-e2e
test-e2e:
	rm -f tmp/e2e/.tested
	$(call itself,tmp/e2e/.tested)

tmp/e2e/.tested: www/build/index.html $(call recursive-dependencies,tests/e2e,tmp/e2e/.tested)
	$(call itself,data-reset)
	rm -fr tmp/e2e
	npm run --silent test-e2e
	touch $@

.PHONY: test-style
test-style: tmp/styles.json
tmp/styles.json: tmp/e2e/.tested
	npm run --silent test-style
	@echo "Report is at http://localhost:$(CRYPTOMEDIC_PORT)/xappx/tmp/style.html"

.PHONY: update-references-style
update-references-style:
	# TODO: this does not allow new references
	@jq -r 'keys[]' tmp/styles.json | while IFS='' read -r F; do \
		echo "updating $$F"; \
		cp "tmp/e2e/browsers/firefox/$$F" "tests/style/references/$$F"; \
	done

# rsync --progress --recursive --delete \
# 	--include "*_reference.png" --include "*_reference_*.png" --exclude "*" \
# 	tmp/e2e/browsers/firefox/ tests/style/references

#
# Deploy command
#
.PHONY: deploy
deploy: docker-started
	bin/cryptomedic-deploy-patch.sh commit

.PHONY: deploy-test
deploy-test: docker-started
	bin/cryptomedic-deploy-patch.sh

#
# Other commands
#
.PHONY: logs
logs:
	$(DOCKERCOMPOSE) logs -f --tail=10 | sed 's/\\n/\n/g'

#
#
# Install > Structure
#
#
.PHONY: setup-structure
setup-structure: tmp/structure-exists
tmp/structure-exists:
	mkdir -p    tmp/
	mkdir -p    live/
	mkdir -p    www/api/$(VAPI)/bootstrap/cache/
	mkdir -p    www/api/$(VAPI)/app/public
	mkdir -p    www/api/$(VAPI)/storage/framework/cache
	mkdir -p    www/api/$(VAPI)/storage/framework/sessions
	mkdir -p    www/api/$(VAPI)/storage/framework/views
	mkdir -p    www/api/$(VAPI)/storage/logs/
	touch       www/api/$(VAPI)/storage/logs/laravel.log
	touch       tmp/structure-exists

#
#
# Install > dependencies
#
#
.PHONY: depencencies
dependencies: dependencies-node dependencies-api

.PHONY: dependencies-node
dependencies-node: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
	npm install
	touch package-lock.json
	touch node_modules/.dependencies

.PHONY: depencencies-api
dependencies-api: www/api/$(VAPI)/vendor/.dependencies
www/api/$(VAPI)/vendor/.dependencies: www/api/$(VAPI)/composer.json www/api/$(VAPI)/composer.lock tmp/structure-exists docker-started dependencies-api-bare
	$(call run_in_docker,dev,"cd www/api/$(VAPI) && composer install")
	touch www/api/$(VAPI)/vendor/.dependencies

.PHONY: depencencies-api-bare
dependencies-api-bare: www/api/$(VAPI)/public/vendor/.dependencies
www/api/$(VAPI)/public/vendor/.dependencies: www/api/$(VAPI)/public/composer.json www/api/$(VAPI)/public/composer.lock tmp/structure-exists docker-started
	$(call run_in_docker,dev,"cd www/api/$(VAPI)/public/ && composer install")
	touch www/api/$(VAPI)/public/vendor/.dependencies

.PHONY: update-dependencies-api
update-dependencies-api:
	$(call run_in_docker,dev,"cd www/api/$(VAPI) && composer update")
	touch www/api/$(VAPI)/vendor/.dependencies

.PHONY: update-dependencies-api-bare
update-dependencies-api-bare:
	$(call run_in_docker,dev,"cd www/api/$(VAPI)/public/ && composer update")
	touch www/api/$(VAPI)/public/vendor/.dependencies

#
#
# Build
#
#

package-lock.json: package.json
	npm install

.PHONY: build
build: www/build/index.html
www/build/index.html: node_modules/.dependencies webpack.config.js \
		package.json package-lock.json \
		$(call recursive-dependencies,app/,www/build/index.html) \
		$(CJS2ESM_DIR)/axios.js \
		$(CJS2ESM_DIR)/platform.js
	$(NM_BIN)webpack

$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

$(CJS2ESM_DIR)/platform.js: node_modules/platform/platform.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

#
#
# data
#
#
.PHONY: database-backup
database-backup:
	$(call run_in_docker,mysql, "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)") > $(DB_BASE)

.PHONY: data-reset
data-reset: docker-started dependencies-api-bare
# Live folder
	@echo "*** $@: reset files..."
	rsync -a --delete live-for-test/ live/
	@echo "*** $@: reset files - done"

# Reset database
	@echo "*** $@: reset the database..."
	$(call run_in_docker,mysql, "while ! mysql -u root -p$(DBROOTPASS) --database=mysql -e 'Show tables;' >/dev/null; do sleep 1; done")
	$(call run_in_docker,mysql," \
		mysql -u root -p$(DBROOTPASS) --database=mysql -e \" \
			USE mysql; \
			DROP SCHEMA IF EXISTS $(DBNAME); \
			CREATE SCHEMA $(DBNAME); \
			USE $(DBNAME); \
			GRANT ALL PRIVILEGES ON $(DBNAME)   TO $(DBUSER); \
			GRANT ALL PRIVILEGES ON $(DBNAME).* TO $(DBUSER); \
			SET PASSWORD FOR $(DBUSER) = PASSWORD('$(DBPASS)'); \
	\" ")

# Mysql 5.7, 7.0:
# 	ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
# 	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

	cat "conf/database/base.sql" \
		| $(DOCKERCOMPOSE) exec -T mysql mysql -u root -p$(DBROOTPASS) --database="$(DBNAME)"

	bin/cryptomedic-refresh-structure.sh
	@echo "*** $@: reset the database - done"

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
