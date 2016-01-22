# Fredagsmoro

[![Build Status](https://travis-ci.org/chrissearle/fredagsmoro_react.svg?branch=master)](https://travis-ci.org/chrissearle/fredagsmoro_react)

A collection of random images from the net - collected by Karl Øgaard (previously Ragnar Bergvik) and sent out each Friday to amuse their colleagues.

## Live Site

[http://fredagsmoro.chrissearle.org](http://fredagsmoro.chrissearle.org)

## Installation

### Prerequisites

* npm
* a fairly recent ruby

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

* npm run content:dropbox - move files from Dropbox into the site
* npm run content:data - rebuild the data file
* npm run content:resize - make sure no image is too large across the whole site. Not required for a new week - run just for that week as part of content:dropbox
* npm run docker:build - create the image (also runs webpack)
* npm run docker:deploy - deploy the image
* npm run doit - git pull, grab files, make all updates, commit & push, build image and deploy

npm test (there's also an npm run test:watch) should run green before committing.

### Local running

webpack-dev-server will start the app on port 8080
