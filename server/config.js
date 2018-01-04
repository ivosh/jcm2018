const env = process.env.NODE_ENV || 'development';

const config = {
  auth: {
    saltRounds: 10,
    lockTime: 2 * 60 * 60 * 1000, // 2 hours
    maxAttempts: 5
  },
  db: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying reconnect.
    reconnectInterval: 2 * 1000, // Reconnect every two seconds.
    poolSize: 10 // Maintain up to 10 database connections.
  },
  jwt: {
    expireTime: 8 * 60 * 60, // 8 hours
    secret: 'jwt_secret'
  }
};

if (env === 'production') {
  config.db.uri = process.env.DB;
  config.jwt.secret = process.env.JWT_SECRET;
} else if (env === 'test') {
  config.db.uri = 'mongodb://localhost/jcm2018-test';
} else {
  config.db.uri = 'mongodb://localhost/jcm2018-dev';
}

module.exports = config;
