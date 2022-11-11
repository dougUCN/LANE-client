#!/bin/bash

echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd $HOME/LANE-client
pwd

echo "Check for any dependency updates"
NPM_DEPENDENCIES_UPDATED=($(git diff --name-only HEAD HEAD~1 | grep "^package.*json$"))
if [[ "$NPM_DEPENDENCIES_UPDATED" != "" ]]; then
    echo "Reinstalling depdenencies"
    rm -rf node_modules
    npm ci
else
    echo "No new dependencies found"
fi

echo "Generate typescript from Railway endpoint"
npm run generate:staging

echo "Create .env.local file with Railway endpoint URLs"
printf 'VITE_GRAPHQL_HTTP_ENDPOINT="https://lane-staging.up.railway.app/graphql/"\nVITE_GRAPHQL_WS_ENDPOINT="ws://lane-staging.up.railway.app/graphql/"' > '.env.local'

echo "Build app"
npm run build

echo "Run new PM2 action"
cp ./aws/ecosystem.config.js ecosystem.config.js
pm2 start ecosystem.config.js