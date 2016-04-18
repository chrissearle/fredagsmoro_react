#!/usr/bin/env ruby

require 'aws-sdk'

credentials = Aws::SharedCredentials.new(profile_name: 'fredagsmoro')

s3 = Aws::S3::Client.new(region: 'eu-west-1', credentials: credentials)


data = []

years = s3.list_objects(bucket: 'fredagsmoro', :delimiter => '/')
 
years.common_prefixes.each do |year_prefix|
  year = year_prefix.prefix

  year_items = {
    name: year.split('/')[0],
    tree: []
  }

  months = s3.list_objects(bucket: 'fredagsmoro', :delimiter => '/', :prefix => year)
  
  months.common_prefixes.each do |month_prefix|
    month = month_prefix.prefix

    month_items = {
      name: month.split('/')[1],
      tree: []
    }

    days = s3.list_objects(bucket: 'fredagsmoro', :delimiter => '/', :prefix => month)

    days.common_prefixes.each do |day_prefix|
      day = day_prefix.prefix

      day_items = {
        name: day.split('/')[2],
        tree: []
      }
      
      items = s3.list_objects(bucket: 'fredagsmoro', :delimiter => '/', :prefix => day)

      items.contents.each do |object|
        day_items[:tree].push({
          src: '/' + object.key
          })
      end
      
      month_items[:tree].push(day_items)
    end
    
    year_items[:tree].push(month_items)
  end
  
  data.push(year_items)
end
 
puts JSON.generate(data)
