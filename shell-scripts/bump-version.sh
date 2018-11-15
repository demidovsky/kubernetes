#!/bin/bash

old_version=$(node -p "require('./package.json').version")

# updates package.json and package-lock.json
npm version patch --no-git-tag-version

new_version=$(node -p "require('./package.json').version")

# For deploying via "$ kubectl apply"
# 
# sed -i -- "s/v${old_version}/v${new_version}/g" .kube/deployment.yaml
# rm .kube/deployment.yaml--

echo "updated from ${old_version} to ${new_version}"
