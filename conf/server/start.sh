#!/usr/bin/env bash

# /etc/apache2/envvars
# export APACHE_RUN_USER=www-data
# export APACHE_RUN_GROUP=www-data

EV=/etc/apache2/envvars

echo "Should run as: $HOST_UID : $HOST_GID"

# Will exit ok if already exists
groupadd -f hostgroup -g $HOST_GID

if ! id -u $HOST_UID ; then
	adduser --system --uid $HOST_UID --gid $HOST_GID hostuser
fi

UN="$(id -un $HOST_UID)"
GN="hostgroup"

sed -E \
	-e  "s/APACHE_RUN_USER=.*$/APACHE_RUN_USER=${UN}/" \
	-e "s/APACHE_RUN_GROUP=.*$/APACHE_RUN_GROUP=${GN}/" \
	-i "$EV"

cat "$EV"

apachectl -D FOREGROUND
