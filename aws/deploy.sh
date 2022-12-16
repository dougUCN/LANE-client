URLs"
printf 'VITE_GRAPHQL_HTTP_ENDPOINT="https://lane-staging.up.railway.app/graphql/"\nVITE_GRAPHQL_WS_ENDPOINT="ws://lane-staging.up.railway.app/graphql/"' > '.env.local'

echo "Build app"
npm run build

echo "Run new PM2 action"
cp ./aws/ecosystem.config.js ecosystem.config.js
pm2 start ecosystem.config.js