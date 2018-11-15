#!/bin/bash

PROJECT=playground-2018-11
VERSION=$(node -p "require('./package.json').version")
NAME=$(node -p "require('./package.json').name")

echo "Pushing docker image $NAME:v$VERSION to $PROJECT"
docker push gcr.io/$PROJECT/$NAME:v$VERSION
