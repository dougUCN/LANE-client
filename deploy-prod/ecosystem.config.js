module.exports = {
  apps: [
    {
      name: "LANE-client",
      script: "npm",
      args: "run staging",
      watch: "dist",
      instances: 2,
      env: {
        NODE_ENV: "production",
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
