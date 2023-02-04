#!/bin/bash
set -e # stop if error

echo $0 $1 $2 $3
echo usage: bash dockerp.sh imagename


echo start pull $1
docker pull dockerproxy.com/library/${1}

echo pulled $1,rename now
docker tag dockerproxy.com/library/${1} ${1}

echo renamed and remove tmp img now
docker rmi dockerproxy.com/library/${1}

echo done
docker image ls 