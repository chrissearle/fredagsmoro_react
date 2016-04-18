#!/usr/bin/env ruby

require 'aws-sdk'

credentials = Aws::SharedCredentials.new(profile_name: 'fredagsmoro')

s3 = Aws::S3::Resource.new(region: 'eu-west-1', credentials: credentials)

obj = s3.bucket('fredagsmoro').object("data.json")
obj.upload_file(../../build/site/data.json)
