module.exports = {
  apps: [
    {
      name: "LANE-client",
      script: "npm",
      args: "run staging",
      watch: "dist",
      env: {
        NODE_ENV: "development",
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
