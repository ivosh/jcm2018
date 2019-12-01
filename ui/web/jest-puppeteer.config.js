module.exports = {
  launch: {
    headless: process.env.CI === 'true'
  },
  server: [
    {
      command:
        'cross-env NODE_ENV=test PORT=5001 ../../node_modules/node/bin/node ../../server/server.js',
      debug: true,
      launchTimeout: 60000,
      port: 5001,
      protocol: 'http'
    },
    {
      command: 'cross-env PORT=5002 npm run start',
      debug: true,
      launchTimeout: 60000,
      port: 5002,
      protocol: 'http'
    }
  ]
};
