#!/usr/bin/env bash

# /etc/apache2/envvars
# export APACHE_RUN_USER=www-data
# export APACHE_RUN_GROUP=www-data

echo "Should run as: $HOST_UID : $HOST_GID"

GN=$( cat /etc/group | grep ":HOST_GID:" | cut -d ":" -f 1 )
if [ -z "$GN" ]; then
	GN="hostgroup"
	echo "Creating group $GN"
	groupadd $GN -g $HOST_GID
fi

if ! id -u $HOST_UID >/dev/null 2>/dev/null ; then
	UN="hostuser"
	echo "Creating user $UN"
	adduser --system --uid $HOST_UID --gid $HOST_GID $UN
else
	UN="$(id -un $HOST_UID)"
fi

echo "Going with user $UN and group $GN"

EV=/etc/apache2/envvars

sed -E \
	-e  "s/APACHE_RUN_USER=.*$/APACHE_RUN_USER=${UN}/" \
	-e "s/APACHE_RUN_GROUP=.*$/APACHE_RUN_GROUP=${GN}/" \
	-i "$EV"

apachectl -D FOREGROUND
