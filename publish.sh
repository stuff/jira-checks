#!/usr/bin/env bash

currentVersion=`cat package.json | ./node_modules/.bin/json version`

./node_modules/.bin/webpack

printf "Release: version is %s\n" $currentVersion

cd ./build

zip -r -X -q jira-checks-$currentVersion.zip *

cd -
