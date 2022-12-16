#!/bin/bash

echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd $HOME/LANE/LANE-client
pwd

git pull

echo "Installing dependencies"
npm ci

echo "Generate typescript from local files"
npm run generate:local

echo "Create .env.local file with production endpoint URLs"
printf 'VITE_GRAPHQL_HTTP_ENDPOINT="http://nedm-macpro.lanl.gov/graphql/"\nVITE_GRAPHQL_WS_ENDPOINT="ws://nedm-macpro.lanl.gov/graphql/"' > '.env.local'

echo "Build app"
npm run build

echo "Run new PM2 action"
cp ./deploy-prod/ecosystem.config.js ecosystem.config.js
pm2 start ecosystem.config.js -i 2
