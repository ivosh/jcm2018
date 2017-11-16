const env = process.env.NODE_ENV || 'development';

const config = {
  db: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying reconnect.
    reconnectInterval: 2 * 1000, // Reconnect every two seconds.
    poolSize: 10 // Maintain up to 10 database connections.
  }
};

if (env === 'production') {
  config.db.uri = process.env.DB;
} else if (env === 'test') {
  config.db.uri = 'mongodb://localhost/jcm2018-test';
} else {
  config.db.uri = 'mongodb://localhost/jcm2018-dev';
}

module.exports = config;
