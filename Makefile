
VAPI := "1.3"


define pipe_to_docker
	docker-compose exec -T $(1) /bin/bash -c $(2)
endef

all:
	@echo "ok, makefile is there"

ci:
	@echo "ok, makefile is there, and we are in the CI pass"

clean-hard: clean
	rm -fr node_modules
	$(call pipe_to_docker,"server", "\
		rm -fr /app/www/api/$(VAPI)/vendor \
		&& bin/ensure_empty_folder.sh /app/www/api/$(VAPI)/bootstrap/cache/")

clean: docker-compose-is-running target/.structure.dev
	$(call pipe_to_docker,"server","bin/ensure_empty_folder.sh /app/target")
	rm -fv "www/static/index.html"
	rm -fv "www/build/*"
	$(call pipe_to_docker,"server","\
		find . -name *.log -delete \
		&& find /tmp/laravel -type f -delete \
		&& rm -fr /app/www/api/$(VAPI)/storage/logs/")

install: target/.structure.prod
	
build: target/.structure.prod

test: docker-compose-is-running target/.structure.dev

deploy:

#
#
# Tests
#
#
docker-compose-is-running:
	@$(call pipe_to_docker,"server","true")
	@echo "Docker-compose is running"

#
#
# Structure
#
#


target/.structure.dev: \
		target/.structure.prod \
		target/.tmp.exists

	touch target/.structure.dev

target/.structure.prod: \
		target/.exists \
		www/api/v1.3/storage/logs/laravel.log

	touch target/.structure.prod

target/.exists:
	mkdir -p target/
	touch target/.exists

target/.tmp.exists:
	$(call pipe_to_docker,"server","mkdir -p \
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
	$(call pipe_to_docker,"server","\
		mkdir -p /app/www/api/v1.3/storage/logs/ \
		&& touch /app/www/api/v1.3/storage/logs/laravel.log \
		&& chmod a+rw /app/www/api/v1.3/storage/logs/laravel.log")
