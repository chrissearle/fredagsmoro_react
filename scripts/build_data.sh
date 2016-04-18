#!/bin/sh

cd scripts/s3

bundle exec ./build_image_s3.rb > ././../build/site/data.json

cd ../..
