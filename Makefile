
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


all: start

clean-hard: | clean stop
	rm -fr node_modules
	rm -fr www/api/$(VAPI)/vendor
	rm -fr vendor
	git status --ignored

clean: | docker-compose-is-running fix-rights
	find . -name *.log -delete
	rm -fr "target/"
	rm -fr "www/build/"
	rm -fr "www/api/$(VAPI)/storage/logs/"
	rm -fr "www/api/$(VAPI)/bootstrap/cache/"
	rm -fr live/
	rm -f "www/static/index.html"
	rm -f "www/release_version.js"
	rm -f "www/release_version.txt"
	$(call run_in_docker,"server","find /tmp/laravel -type f -delete") || true

start: | docker-compose-is-running \
		install.structure \
		dependencies \
		build \
		data.reset

	@echo "Open browser:"
	@echo " cryptomedic: http://localhost:5555/"
	@echo " "
	@echo "DevTools:"
	@echo " phpmyadmin:  http://localhost:5550/"
	@echo " mailhog:     http://localhost:5551/"

test: start
	# TODO: split in subcommands ?
	npm run --silent test-api
	npm run --silent test-unit
	npm run --silent test-e2e

stop:
	docker-compose down || true

#
# Deploy command
#
deploy: docker-compose-is-running
	bin/cryptomedic-deploy-patch.sh commit

deploy-test: docker-compose-is-running
	bin/cryptomedic-deploy-patch.sh

#
# Other commands
# 
docker-compose-is-running:
	@$(call run_in_docker,"server","true") || docker-compose up --force-recreate -d

build: www/static/index.html

data.reset: live-folder-test database-reset

database-backup:
	$(call run_in_docker,"mysql", "mysqldump -u root -p$(DBROOTPASS) $(DBNAME)") > $(DB_BASE)

logs:
	docker-compose logs -f -t

fix-rights:
	$(call run_in_docker,"server","\
		chmod a+rwX -R www/api/$(VAPI)/bootstrap/cache/ || true; \
		chmod a+rwX -R live || true \
	")


#
#
# Install
#
#

#
#
# Install > Structure
#
#
install.structure: \
		target/.exists \
		live/.exists \
		www/api/$(VAPI)/bootstrap/cache/.exists \
		www/api/$(VAPI)/storage/logs/laravel.log \
		docker.server.tmp

target/.exists:
	mkdir -p target/
	touch target/.exists

live/.exists:
	mkdir -p live
	touch live/.exists

www/api/$(VAPI)/bootstrap/cache/.exists:
	mkdir -p www/api/$(VAPI)/bootstrap/cache
	chmod a+rwX www/api/$(VAPI)/bootstrap/cache
	touch www/api/$(VAPI)/bootstrap/cache/.exists

www/api/v1.3/storage/logs/laravel.log:
	mkdir -p www/api/v1.3/storage/logs/
	touch www/api/v1.3/storage/logs/laravel.log

docker.server.tmp:
	$(call run_in_docker,"server","mkdir -p \
		/tmp/laravel/framework \
		/tmp/laravel/framework/cache \
		/tmp/laravel/framework/sessions \
		/tmp/laravel/framework/views \
		/tmp/laravel/app \
		/tmp/laravel/app/public \
		/tmp/laravel/logs \
		&& chmod -R 777 /tmp/laravel/")

#
#
# Install->dependencies
#
#
dependencies: dependencies.node \
	dependencies.composer.root \
	dependencies.composer.api 

dependencies.node: node_modules/.dependencies
node_modules/.dependencies: package.json package-lock.json
	npm install
	touch node_modules/.dependencies

dependencies.composer.root: vendor/.dependencies
vendor/.dependencies: # composer.json composer.lock
	# $(call run_in_docker,"server","\
	# 	composer install \
	# 	&& chmod -R a+rwX vendor \
	# ")
	mkdir -p vendor
	touch vendor/.dependencies

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
www/static/index.html: dependencies.node package.json package-lock.json www/app.js
	npm run build


#
#
# data-reset
#
#

live-folder-test: live/.installed
live/.installed: live/.exists fix-rights $(call recursive-dependencies,live/,$@)
	rsync -a --delete live-for-test/ live/
	touch live/.installed

database-reset: 
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
		| docker-compose exec -T mysql mysql -u root -p$(DBROOTPASS) --database="$(DBNAME)"

	wget -O - --quiet --content-on-error "http://localhost:5555/maintenance/patch_db.php?pwd=$(DBUPDATEPWD)"
