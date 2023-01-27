#!/bin/bash
##
## This script is for updating all libraries to the latest automatically.
##

declare depList
depList=$(cat package.json | jq '.dependencies' | jq 'keys')
depList=$(echo $depList | sed -E 's/[,"]//g' | sed -E 's/\[//g' | sed -E 's/\]//g')
yarn add $depList

depList=$(cat package.json | jq '.devDependencies' | jq 'keys')
depList=$(echo $depList | sed -E 's/[,"]//g' | sed -E 's/\[//g' | sed -E 's/\]//g')
yarn -D add $depList
