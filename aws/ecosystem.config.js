module.exports = {
  apps: [
    {
      name: "LANE-client",
      script: "npm",
      args: "run staging",
      watch: "dist",
      env: {
        NODE_ENV: "development",
        GRAPHQL_HTTP_ENDPOINT: "https://lane-server.herokuapp.com/graphql/",
        GRAPHQL_WS_ENDPOINT: "ws://lane-server.herokuapp.com/graphql//",
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
