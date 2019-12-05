
VAPI := v1.3
DBNAME := cryptomedic
# From docker-compose.yml
DBUSER := username
DBPASS := password
DBROOTPASS := password
# From config.php
DBUPDATEPWD := secret
DB_BASE := conf/database/base.sql

# --user ?
define run_in_docker
	$(DOCKERCOMPOSE) exec -T $(1) /bin/bash -c $(2)
endef

DOCKERCOMPOSE := HOST_UID=$(shell id -u) HOST_GID=$(shell id -g) docker-compose

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

clean: fix-rights stop
	rm -fr node_modules
	rm -fr www/api/$(VAPI)/vendor
	rm -fr vendor

	rm -fr "target/"
	find . -name *.log -delete
	rm -fr "www/build/"
	rm -fr "www/api/$(VAPI)/storage/logs/"
	rm -fr "www/api/$(VAPI)/bootstrap/cache/"
	rm -fr live/
	rm -f "www/static/index.html"
	rm -f "www/release_version.js"
	rm -f "www/release_version.txt"

init: target/structure-exists

start: target/structure-exists \
		target/docker-is-running \
		dependencies \
		build \
		data-reset

	@echo "Open browser:"
	@echo " cryptomedic: http://localhost:5555/"
	@echo " "
	@echo "DevTools:"
	@echo " phpmyadmin:  http://localhost:5550/"
	@echo " mailhog:     http://localhost:5551/"

t:
	$(DOCKERCOMPOSE) up --build server

target/docker-is-running:
	@$(call run_in_docker,"server","true") 2>/dev/null \
		|| $(DOCKERCOMPOSE) up --force-recreate -d
	$(call run_in_docker,"server","mkdir -p \
		/tmp/laravel/framework \
		/tmp/laravel/framework/cache \
		/tmp/laravel/framework/sessions \
		/tmp/laravel/framework/views \
		/tmp/laravel/app \
		/tmp/laravel/app/public \
		/tmp/laravel/logs \
		&& chmod -R 777 /tmp/laravel/")
	mkdir -p target
	touch target/docker-is-running

stop:
	$(DOCKERCOMPOSE) down || true
	rm target/docker-is-running

#
#
# Tests
#
#

lint:
	npm run stylelint

test: test-api test-unit test-e2e test-style

test-api: target/docker-is-running www/api/$(VAPI)/vendor/.dependencies
	$(DOCKERCOMPOSE) exec -T server /app/bin/dev-phpunit.sh

test-api-commit: target/docker-is-running www/api/$(VAPI)/vendor/.dependencies
	$(DOCKERCOMPOSE) exec -T -e COMMIT=1 server /app/bin/dev-phpunit.sh

test-unit: target/docker-is-running
	npm run --silent test-unit

test-e2e: target/e2e/.tested
target/e2e/.tested: target/docker-is-running
	npm run --silent test-e2e
	touch target/e2e/.tested

test-style: target/e2e/.tested
	npm run --silent test-style

style-update-references:
	rsync --progress --recursive --delete \
		--include "*_reference.png" --include "*_reference_*.png" --exclude "*" \
		target/e2e/browsers/firefox/ tests/style/references

#
# Deploy command
#
deploy: target/docker-is-running
	bin/cryptomedic-deploy-patch.sh commit

deploy-test: target/docker-is-running
	bin/cryptomedic-deploy-patch.sh

#
# Other commands
# 
logs:
	$(DOCKERCOMPOSE) logs -f -t

fix-rights: target/docker-is-running
	$(call run_in_docker,"server","\
		chmod a+rwX -R www/api/$(VAPI)/bootstrap/cache/ || true; \
		chmod a+rwX -R www/api/$(VAPI)/vendor || true; \
		chmod a+rwX -R www/api/$(VAPI)/storage/ || true; \
		chmod a+rwX -R live || true; \
		chmod a+rwX -R target || true; \
		find /tmp/laravel -type d -exec chmod a+rwx \"{}\" \";\" ; \
		find /tmp/laravel -type f -exec chmod a+rw \"{}\" \";\" ; \
	")

#
#
# Install > Structure
#
#
target/structure-exists:
	mkdir -p    target
	mkdir -p    live
	mkdir -p    www/api/$(VAPI)/bootstrap/cache
	mkdir -p    www/api/$(VAPI)/storage/logs/
	touch       www/api/$(VAPI)/storage/logs/laravel.log
	chmod a+rwX www/api/$(VAPI)/bootstrap/cache
	chmod 666   www/api/$(VAPI)/storage/logs/laravel.log
	touch 		target/structure-exists

#
#
# Install > dependencies
#
#
dependencies: dependencies.node \
	dependencies.composer.api 

dependencies.node: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
	npm install
	touch node_modules/.dependencies

dependencies.composer.api: www/api/$(VAPI)/vendor/.dependencies
www/api/$(VAPI)/vendor/.dependencies: www/api/$(VAPI)/composer.json www/api/$(VAPI)/composer.lock
	$(call run_in_docker,"server","\
		cd www/api/$(VAPI) \
		&& composer install \
		&& chmod -R a+rwX vendor \
	")
	touch www/api/$(VAPI)/vendor/.dependencies


#
#
# Build
#
#
build: www/static/index.html

www/static/index.html: dependencies.node package.json package-lock.json www/app.js
	npm run build


#
#
# data
#
#
database-backup:
	$(call run_in_docker,"mysql", "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)") > $(DB_BASE)

data-reset: target/docker-is-running
	# database
	$(call run_in_docker,"mysql"," \
		mysql -u root -p$(DBROOTPASS) --database=mysql -e \" \
			USE mysql; \
			DROP SCHEMA IF EXISTS $(DBNAME); \
			CREATE SCHEMA $(DBNAME); \
			USE $(DBNAMe); \
			GRANT ALL PRIVILEGES ON $(DBNAME)   TO $(DBUSER); \
			GRANT ALL PRIVILEGES ON $(DBNAME).* TO $(DBUSER); \
			SET PASSWORD FOR $(DBUSER) = PASSWORD('$(DBPASS)'); \
	\" ")

	# Mysql 5.7, 7.0:
	# ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
	# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

	cat "conf/database/base.sql" \
		| $(DOCKERCOMPOSE) exec -T mysql mysql -u root -p$(DBROOTPASS) --database="$(DBNAME)"

	wget -O - --quiet --content-on-error "http://localhost:5555/maintenance/patch_db.php?pwd=$(DBUPDATEPWD)"

	# live folder
	rsync -a --delete live-for-test/ live/
