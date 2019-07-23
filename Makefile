
VAPI := v1.3
DBNAME := cryptomedic
# From docker-compose.yml
DBUSER := username
DBPASS := password
DBROOTPASS := password
# From config.php
DBUPDATEPWD := secret
DB_BASE := conf/database/base.sql

define run_in_docker
	docker-compose exec -T $(1) /bin/bash -c $(2)
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


all: install-dev
	@echo "ok, ready to dev! open http://localhost:5555/ to browse !"

clean-hard: clean stop-docker-compose fix-rights
	rm -fr node_modules
	rm -fr www/api/$(VAPI)/vendor
	bin/ensure_empty_folder.sh www/api/$(VAPI)/bootstrap/cache/

clean: docker-compose-is-running structure.dev database-reset fix-rights
	bin/ensure_empty_folder.sh target
	rm -f "www/static/index.html"
	bin/ensure_empty_folder.sh www/build/
	find . -name *.log -delete
	rm -f www/api/$(VAPI)/storage/logs/laravel.log
	touch www/api/$(VAPI)/storage/logs/laravel.log
	chmod a+rw www/api/$(VAPI)/storage/logs/laravel.log
	bin/ensure_empty_folder.sh live/
	chmod a+rwX live/
	$(call run_in_docker,"server","find /tmp/laravel -type f -delete")

install: docker-compose-is-running structure.prod \
		node.dependencies \
		api.dependencies

install-dev: structure.dev install live-folder-test database-reset

build: www/static/index.html

reset-dev: live-folder-test database-reset

test: docker-compose-is-running install-dev reset-dev build
	# TODO test-api must run in docker-...
	# TODO: split in subcommands ?
	npm run --silent test-api
	npm run --silent test-unit
	npm run --silent test-e2e

start-docker-compose: docker-compose-is-running

stop-docker-compose:
	docker-compose down || true

deploy: docker-compose-is-running
	# TODO: deploy to server
	bin/cryptomedic-deploy-patch.sh

fix-rights:
	# TODO: complete this
	$(call run_in_docker,"server","\
		chmod a+rwX -R www/api/$(VAPI)/bootstrap/cache/ \
		&& chmod a+rwX -R live \
	")

#
#
# Tests
#
#
docker-compose-is-running:
	@$(call run_in_docker,"server","true") || docker-compose up -d

#
#
# Data
#
#
live-folder-test: live/.installed
live/.installed: live/.created fix-rights $(call recursive-dependencies,live/,$@)
	rsync -a --delete live-for-test/ live/
	# chmod a+rwX -R live
	touch live/.installed

database-reset: database-load database-upgrade
	# TODO everything

database-load:  # must be idempotent -> how ?
	# export DBROOTPASS=password
	# export DBROOTUSER=root

	$(call run_in_docker,"mysql"," \
		mysql -u root -p$(DBROOTPASS) --database=mysql -e \" \
			DROP SCHEMA IF EXISTS $(DBNAME); \
			CREATE SCHEMA $(DBNAME); \
			USE $(DBNAME); \
			GRANT ALL PRIVILEGES ON $(DBNAME)   TO $(DBUSER); \
			GRANT ALL PRIVILEGES ON $(DBNAME).* TO $(DBUSER); \
			SET PASSWORD FOR $(DBUSER) = PASSWORD('$(DBPASS)'); \
	\" ")

	# Mysql 5.7, 7.0:
	# ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
	# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

	cat "conf/database/base.sql" \
		| docker-compose exec -T mysql mysql -u root -p$(DBROOTPASS) --database="$(DBNAME)"

	curl --silent "http://localhost:5555/maintenance/patch_db.php?pwd=$(DBUPDATEPWD)"

	# myqsl --database="$DBNAME" < "conf/database/base.sql"

database-upgrade:
	# TODO Do it by http
	# database-patch-dev: # TODO
database-backup:
	$(call run_in_docker,"mysql", "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)") > $(DB_BASE)

#
#
# Structure
#
#
www/static/index.html: node.dependencies package.json package-lock.json www/app.js
	npm run build

node.dependencies: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
	npm install
	touch node_modules/.dependencies

api.dependencies: www/api/$(VAPI)/vendor/.dependencies
www/api/$(VAPI)/vendor/.dependencies: www/api/$(VAPI)/composer.json www/api/$(VAPI)/composer.lock
	$(call run_in_docker,"server","\
		cd www/api/$(VAPI) \
		&& composer install \
		&& chmod -R a+rwX vendor \
	")
	touch www/api/$(VAPI)/vendor/.dependencies

structure.dev: \
		structure.prod \
		target/.tmp.exists

structure.prod: \
		target/.exists \
		www/api/$(VAPI)/storage/logs/laravel.log \
		live/.created

target/.exists:
	mkdir -p target/
	# chmod a+rwX target
	touch target/.exists

target/.tmp.exists:
	$(call run_in_docker,"server","mkdir -p \
		/tmp/laravel/framework \
		/tmp/laravel/framework/cache \
		/tmp/laravel/framework/sessions \
		/tmp/laravel/framework/views \
		/tmp/laravel/app \
		/tmp/laravel/app/public \
		/tmp/laravel/logs \
		&& chmod -R 777 /tmp/laravel/")
	touch target/.tmp.exists

www/api/v1.3/storage/logs/laravel.log:
	mkdir -p www/api/v1.3/storage/logs/
	touch www/api/v1.3/storage/logs/laravel.log
	# chmod a+rw www/api/v1.3/storage/logs/laravel.log

live: live/.created
live/.created:
	mkdir -p live
	touch live/.created
