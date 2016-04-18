# Fredagsmoro

[![Build Status](https://travis-ci.org/chrissearle/fredagsmoro_react.svg?branch=master)](https://travis-ci.org/chrissearle/fredagsmoro_react)
[![codecov.io](https://codecov.io/github/chrissearle/fredagsmoro_react/coverage.svg?branch=master)](https://codecov.io/github/chrissearle/fredagsmoro_react?branch=master)

A collection of random images from the net - collected by Karl Øgaard (previously Ragnar Bergvik) and sent out each Friday to amuse their colleagues.

## Live Site

[http://fredagsmoro.chrissearle.org](http://fredagsmoro.chrissearle.org)

## Installation

### Prerequisites

* npm
* a fairly recent ruby
* a valid fredagsmoro config in ~/.aws/credentials

### Installation

Run:

    npm install

### Setup

You will need

* To have the correct dropbox folder shared (for receiving new images)
* Copy scripts/dropbox_sample.yml to scripts/dropbox.yml and set the fully specified path to the dropbox folder
* For docker packaging - a running local docker daemon
* For docker deployment - access to docker.home.chrissearle.org repository

### npm commands

#### Updating scripts

* `npm run content:dropbox` - move files from Dropbox onto S3
* `npm run content:data` - rebuild the data file from the data on S3
* `npm run content:datapush` - push data file to S3
* `npm run docker:build` - create the image (also runs webpack)
* `npm run docker:deploy` - deploy the image
* `npm run doit` - git pull, grab files, make all updates, commit & push, build image and deploy

#### Testing

* `npm run lint` - eslint the code
* `npm test` - run the mocha tests
* `npm run test:watch` - run the tests using a file watcher
* `npm run test:coverage` - run the tests instrumented for coverage
* `npm run coverage:report` - generate an lcov report in ./coverage
* `npm run coverage:codecov` - send the report to codecov. Will only work from the travis-ci builds

**Both test and lint should run green before committing since they will both cause a travis-ci fail otherwise**

### Local running

* `npm start` will start webpack-dev-server on port 8080
