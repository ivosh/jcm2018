const env = process.env.NODE_ENV || 'development';

const config = {
  api: {
    readOnly: process.env.API_READ_ONLY === '1'
  },
  auth: {
    saltRounds: 10,
    lockTime: 2 * 60 * 60 * 1000, // 2 hours
    maxAttempts: 5
  },
  db: {
    serverSelectionTimeoutMS: 2 * 1000, // Connect or retry timeout [milliseconds]
    poolSize: 10 // Maintain up to 10 database connections.
  },
  email: {
    transport: 'mock'
  },
  jwt: {
    expireTime: 8 * 60 * 60, // 8 hours
    secret: 'jwt_secret'
  }
};

if (env === 'production') {
  config.db.uri = process.env.DB;
  config.email.transport = 'gmail';
  config.email.gmail = {
    clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    user: process.env.GOOGLE_MAIL_USER,
    refreshToken: process.env.GOOGLE_OAUTH2_REFRESH_TOKEN
  };
  config.jwt.secret = process.env.JWT_SECRET;
} else if (env === 'test') {
  config.db.uri = 'mongodb://localhost/jcm2020-test';
} else {
  config.db.uri = 'mongodb://localhost/jcm2020-dev';
}

module.exports = config;
