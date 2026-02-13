module.exports = {
  apps: [
    {
      name: "backend",
      script: "src/index.js",
      cwd: "/test/Porto/Porto_Backend",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
