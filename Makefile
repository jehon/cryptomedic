
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

DOCKERCOMPOSE := HOST_UID=$(shell id -u) HOST_GID=$(shell id -g) docker-compose

SSH_KNOWN_HOSTS := ~/.ssh/known_hosts

DEPLOY_MOUNT := target/remote
BACKUP_DIR ?= target/backup-online
DEPLOY_TEST_DIR ?= target/deploy-test-dir
CJS2ESM_DIR := app/cjs2esm
NM_BIN := node_modules/.bin/

define ensure_folder_empty
	rm -fr "$1"
	mkdir -p "$1"
endef

define run_in_docker
	$(DOCKERCOMPOSE) exec --user $(shell id -u) -T $(1) /bin/bash -c $(2)
endef

# See https://coderwall.com/p/cezf6g/define-your-own-function-in-a-makefile
# 1: folder where to look
# 2: base file to have files newer than, to limit the length of the output
define recursive-dependencies
	$(shell \
		if [ -r "$(2)" ]; then \
			find "$(1)" -name tests_data -prune -o -name tmp -prune -o -newer "$(2)"; \
		else \
			echo "$(1)";\
		fi \
	)
endef


all: start

clean: deploy-unmount stop
	rm -fr node_modules
	rm -fr www/maintenance/vendor
	rm -fr www/api/$(VAPI)/vendor
	rm -fr vendor

	rm -fr "target/"
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

setup-computer: deploy-host-key-check
	mkdir -p ~/.ssh/
	@if grep $(DEPLOY_HOST) $(SSH_KNOWN_HOSTS) >/dev/null; then \
		echo "Removing old key"; \
		sed -i "/$(DEPLOY_HOST).*/d" $(SSH_KNOWN_HOSTS) ; \
	fi
	echo "Installing the key"
	cat ovh.key >> $(SSH_KNOWN_HOSTS)

deploy-host-key-do-update:
	ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) > ovh.key

deploy-host-key-check: 
	@REMOTE="$(shell ssh-keyscan -t ssh-rsa $(DEPLOY_HOST) 2>/dev/null )"; \
	STORED="$(shell cat ovh.key)"; \
	if [ "$$REMOTE" != "$$STORED" ]; then \
		echo "Key is updated on remote host"; \
		exit 1; \
	else  \
		echo "Key is still the same, good!"; \
	fi

.PHONY: start
start: setup-structure \
		docker-started \
		dependencies \
		build \
		data-reset

	@echo "Open browser: http://localhost:5557/"
	
	# let the time to all services to be up and running
	sleep 5s

.PHONY: docker-started
docker-started:
	$(DOCKERCOMPOSE) build server
	$(DOCKERCOMPOSE) up -d

.PHONY: stop
stop:
	$(DOCKERCOMPOSE) down || true

#
#
# Tests
#
#

.PHONY: lint
lint:
	npm run eslint
	npm run stylelint

.PHONY: test
test: docker-started dependencies build test-api test-unit test-e2e test-style
	git status

.PHONY: test-api
test-api: docker-started dependencies-api data-reset
	$(call run_in_docker,"server","/app/bin/dev-phpunit.sh")

.PHONY: test-api-commit
test-api-commit: docker-started dependencies-api data-reset
	$(call run_in_docker,"server","/app/bin/dev-phpunit.sh COMMIT")

.PHONY: test-unit
test-unit: dependencies-node $(CJS2ESM_DIR)/axios.js $(CJS2ESM_DIR)/axios-mock-adapter.js
	npm run test-unit-continuously -- --single-run
    
# @NBR_TESTS=$$(cat target/js/junit/TESTS.xml | grep "<testCase" | wc -l); \
# NORM_TESTS=$$( cat tests/unitjs/nbr.txt ); \
# if [ "$$NBR_TESTS" = "$$NORM_TESTS" ]; then \
# 	echo "V Correct number of tests"; \
# else \
# 	echo "X Incorrect number of tests (expected $$NORM_TESTS - received $$NBR_TESTS)" >&2 ; \
# 	exit 1; \
# fi

.PHONY: test-e2e
test-e2e: target/e2e/.tested
target/e2e/.tested: start data-reset www/build/index.html tests/e2e/**
	npm run --silent test-e2e
	touch target/e2e/.tested

.PHONY: test-style
test-style: target/style.json
target/style.json: target/e2e/**
	npm run --silent test-style
	echo "Report is at http://localhost:5557/target/style.html"

style-update-references:
	rsync --progress --recursive --delete \
		--include "*_reference.png" --include "*_reference_*.png" --exclude "*" \
		target/e2e/browsers/firefox/ tests/style/references

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
	$(DOCKERCOMPOSE) logs -f -t

#
#
# Install > Structure
#
#
.PHONY: setup-structure
setup-structure: target/structure-exists
target/structure-exists:
	mkdir -p    target/
	mkdir -p    live/
	mkdir -p    www/api/$(VAPI)/bootstrap/cache/
	mkdir -p    www/api/$(VAPI)/app/public
	mkdir -p    www/api/$(VAPI)/storage/framework/cache
	mkdir -p    www/api/$(VAPI)/storage/framework/sessions
	mkdir -p    www/api/$(VAPI)/storage/framework/views
	mkdir -p    www/api/$(VAPI)/storage/logs/
	touch       www/api/$(VAPI)/storage/logs/laravel.log
	touch       target/structure-exists

#
#
# Install > dependencies
#
#
.PHONY: depencencies
dependencies: dependencies-node dependencies-api depencencies-maintenance

.PHONY: dependencies-node
dependencies-node: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
	npm install
	touch package-lock.json
	touch node_modules/.dependencies

.PHONY: depencencies-api
dependencies-api: www/api/$(VAPI)/vendor/.dependencies
www/api/$(VAPI)/vendor/.dependencies: www/api/$(VAPI)/composer.json www/api/$(VAPI)/composer.lock target/structure-exists docker-started
	$(call run_in_docker,"server","\
		cd www/api/$(VAPI) \
		&& composer install \
	")
	touch www/api/$(VAPI)/vendor/.dependencies

.PHONY: depencencies-maintenance
depencencies-maintenance: www/maintenance/vendor/.dependencies
www/maintenance/vendor/.dependencies: www/maintenance/composer.json www/maintenance/composer.lock docker-started
	$(call run_in_docker,"server","\
		cd www/maintenance/ \
		&& composer install \
	")
	touch www/maintenance/vendor/.dependencies

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
		$(CJS2ESM_DIR)/axios.js
	$(NM_BIN)webpack

$(CJS2ESM_DIR)/axios.js: node_modules/axios/dist/axios.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?

$(CJS2ESM_DIR)/axios-mock-adapter.js: node_modules/axios-mock-adapter/dist/axios-mock-adapter.js
	$(NM_BIN)babel --out-file="$@" --plugins=transform-commonjs --source-maps inline $?
	sed -i 's/from "axios";/from ".\/axios.js";/' $@

#
#
# data
#
#
.PHONY: database-backup
database-backup:
	$(call run_in_docker,"mysql", "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)") > $(DB_BASE)

.PHONY: data-reset
data-reset: docker-started
# Remove all trace of previous sessions
	$(call run_in_docker,"server","find /tmp/laravel -type f -delete")

# Live folder
	rsync -a --delete live-for-test/ live/

# Reset database
	$(call run_in_docker,"mysql"," \
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

	wget -O - --quiet --content-on-error "http://localhost:5555/maintenance/patch_db.php?pwd=$(DBUPDATEPWD)"

#
#
# Deploy
#
#
define deploy-check-config
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
endef

.PHONY: deploy-mount
deploy-mount: $(DEPLOY_MOUNT)/Makefile
$(DEPLOY_MOUNT)/Makefile:
	$(call deploy-check-config)
	@mkdir -p $(DEPLOY_MOUNT)
	SSHPASS="$$CRYPTOMEDIC_UPLOAD_PASSWORD" sshpass -e \
		sshfs -f -o uid=$(shell id -u) \
			$(CRYPTOMEDIC_UPLOAD_USER)@$(DEPLOY_HOST):/home/$(CRYPTOMEDIC_UPLOAD_USER) $(DEPLOY_MOUNT) \
			&

deploy-unmount:
	if [ -r $(DEPLOY_MOUNT)/favicon.ico ]; then \
		fusermount -u $(DEPLOY_MOUNT); \
	fi

deploy-backup: deploy-mount
	rsync --progress --recursive --times --delete \
		--exclude target/ \
		$(DEPLOY_MOUNT)/ $(BACKUP_DIR)

deploy-rsync:	deploy-host-key-test \
		setup-structure \
		dependencies \
		build \
		$(DEPLOY_MOUNT)/Makefile

	rsync --recursive --itemize-changes --checksum \
		--dry-run \
		--filter='dir-merge /deploy-filter' \
		--delete --delete-excluded \
		. $(DEPLOY_MOUNT)

# deploy-backup-compare-with-online: $(BACKUP_DIR)/Makefile
# 	rsync --dry-run -r -i --omit-dir-times --ignore-times \
# 		--exclude node_modules \
# 		--exclude .git \
# 		--exclude target \
# 		$(DEPLOY_MOUNT) $(BACKUP_DIR)
