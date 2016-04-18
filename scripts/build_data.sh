#!/bin/sh

cd scripts/s3

bundle exec ./build_data_s3.rb > ../../build/site/data.json

cd ../..
