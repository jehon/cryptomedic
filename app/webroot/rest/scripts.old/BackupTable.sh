#!/bin/bash

DEBUG="--no-delete-after --server-response"

#HOST="http://www.cryptomedic.org/ssrest/"
HOST="http://localhost/ssrest/"
BACKUP="patients"
COOKIES=cookies.txt

echo "."

echo "Authentifying"
wget --keep-session-cookies --save-cookies=$COOKIES --delete-after $DEBUG "$HOST/Authorizations/login?_domain=restamd&login=backup&password=ec661ff0868c95"
echo "."

echo "Getting content"
wget --load-cookies=$COOKIES --mirror $DEBUG "$HOST/Backup/$BACKUP"
echo "."

echo "Removing cookies"
rm "$COOKIES"

echo "done"
