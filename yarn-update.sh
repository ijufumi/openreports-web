#!/bin/bash
##
## This script is for updating all libraries to the latest automatically.
##

function getListName {
  declare key=$1
  declare localDepList
  localDepList=$(cat package.json | jq $key | jq 'keys')
  localDepList=$(echo $localDepList | sed -E 's/[,"]//g' | sed -E 's/\[//g' | sed -E 's/\]//g')
  echo -n $localDepList
}

if [ -e yarn.lock ]; then
  echo "delete old lock file"
  rm -f yarn.lock
fi

depList=$(getListName '.dependencies')
yarn add $depList

depList=$(getListName '.devDependencies')
yarn -D add $depList
