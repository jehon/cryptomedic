#!/usr/bin/env bash

set -e

mkdir -p ~/.ssh

DEPLOY_HOST=ftp.cluster003.ovh.net
SSH_KNOWN_HOSTS=~/.ssh/known_hosts

REMOTE="$( ssh-keyscan -t ssh-rsa "$DEPLOY_HOST" 2>/dev/null )";
STORED="$( cat /setup/conf/ovh.key )";

if [ "$1" == "update" ]; then
    ssh-keyscan -t ssh-rsa "$DEPLOY_HOST" > conf/ovh.key
fi

if [ "$REMOTE" != "$STORED" ]; then \
    echo "Key is updated on remote host"; \

    mkdir -p ~/.ssh/
    if grep "$DEPLOY_HOST" $SSH_KNOWN_HOSTS >/dev/null; then \
        echo "Removing old key"; \
        sed -i "/$(DEPLOY_HOST).*/d" $SSH_KNOWN_HOSTS ; \
    fi
    echo "Installing the key"
    cat conf/ovh.key >> $SSH_KNOWN_HOSTS
else  \
    echo "Key is still the same, good!"; \
fi
