#!/bin/sh

git pull
npm install
npm run content:dropbox
npm run content:data
npm run content:datapush
git add .
git commit -m "New Week"
git push
npm run docker:build
npm run docker:deploy
