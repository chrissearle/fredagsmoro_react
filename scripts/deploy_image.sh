#!/bin/sh

cd build

docker push docker.home.chrissearle.org:5000/fredagsmoro_cso:`git rev-parse --short HEAD`
docker push docker.home.chrissearle.org:5000/fredagsmoro_cso:latest

cd ..
