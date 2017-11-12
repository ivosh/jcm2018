const env = process.env.NODE_ENV || 'development';

const config = {
  db: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying reconnect.
    reconnectInterval: 2 * 1000, // Reconnect every two seconds.
    poolSize: 10 // Maintain up to 10 database connections.
  }
};
config.db.uri = env === 'production' ? process.env.DB : 'mongodb://localhost/jcm2018';

module.exports = config;
