#!/bin/bash

if [ "$1" ]; then
  echo Using $1
  DATETIME=$(date +%Y-%m-%d_%H-%M-%S)
  artillery run $1 --output reports/$1.$DATETIME.json
  artillery report reports/$1.$DATETIME.json
else
  echo "Usage: run.sh config.yml"
fi