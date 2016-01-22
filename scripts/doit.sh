#!/bin/sh

git pull
npm run content:dropbox
npm run content:data
git add .
git commit -m "New Week"
git push
npm run docker:build
npm run docker:deploy
