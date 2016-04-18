#!/usr/bin/env ruby

require 'aws-sdk'
require 'date'
require 'fileutils'
require 'yaml'

credentials = Aws::SharedCredentials.new(profile_name: 'fredagsmoro')

s3 = Aws::S3::Resource.new(region: 'eu-west-1', credentials: credentials)

config = YAML::load(File.open(File.dirname(File.expand_path(__FILE__)) + '/dropbox.yml'))

path = config[:path]

system("../../scripts/resize.sh #{path}")

date = DateTime.now
datepath = "#{'%04d' % date.year}/#{'%02d' % date.mon}/#{'%02d' % date.mday}"

Dir.foreach(path) do |item|
  itempath = path + "/" + item
  next unless File.file?(itempath)
  next unless (File.size(itempath) > 100)

  obj = s3.bucket('fredagsmoro').object("#{datepath}/#{item}")
  obj.upload_file(itempath)

  FileUtils.remove_file(itempath)
end
