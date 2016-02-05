#!/bin/sh

webpack

cd build

docker build -t docker.home.chrissearle.org:5000/fredagsmoro_cso:`git rev-parse --short HEAD` .
docker tag docker.home.chrissearle.org:5000/fredagsmoro_cso:`git rev-parse --short HEAD` docker.home.chrissearle.org:5000/fredagsmoro_cso:latest

cd ..
