module.exports = {
  server: {
    command: 'cross-env PORT=5000 npm run start',
    debug: false,
    launchTimeout: 60000,
    port: 5000,
    protocol: 'http'
  }
};
