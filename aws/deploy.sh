#!/bin/bash

echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd $HOME/LANE-client
pwd

echo "Update app from Git"
git pull

echo "Check for any dependency updates"
NPM_DEPENDENCIES_UPDATED=($(git diff --name-only HEAD HEAD~1 | grep "^package.*json$"))
if [[ "$NPM_DEPENDENCIES_UPDATED" != "" ]]; then
    echo "Reinstalling depdenencies"
    rm -rf node_modules
    npm ci
else
    echo "No new dependencies found"
fi

echo "Generate typescript from Heroku endpoint"
npm run generate:staging

echo "Build app"
npm run build

echo "Run new PM2 action"
#cp ./aws/ecosystem.config.js ecosystem.config.js
pm2 start ecosystem.config.js