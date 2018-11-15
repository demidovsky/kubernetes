#!/bin/bash

PROJECT=playground-2018-11
VERSION=$(node -p "require('./package.json').version")
NAME=$(node -p "require('./package.json').name")

# Changing version in package.json invalidates corresponding Docker cache layer.
# Therefore, `npm install` is run again - even when dependencies are actually unchanged.
# So we will use package.json with "removed" version instead.

cp package.json docker.package.json
cp package-lock.json docker.package-lock.json

sed -i -- "s/\"version\": \"${VERSION}\"/\"version\": \"0.0.0\"/" docker.package.json
sed -i -- '3s/.*/  "version": "0.0.0",/' docker.package-lock.json

echo "Building docker image $NAME:v$VERSION"
docker build . --tag=gcr.io/$PROJECT/$NAME:v$VERSION

# remove temporary files
rm docker.package*
