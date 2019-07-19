#!/usr/bin/env bash

if [ ! -d "$1" ]; then
    mkdir -p "$1"
fi

find "$1" -mindepth 1 ! -name '.gitkeep' -delete
