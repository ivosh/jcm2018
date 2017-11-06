const env = process.env.NODE_ENV || 'development';

const config = {};
config.db_uri = env === 'production' ? process.env.DB : 'mongodb://localhost/jcm2018';

module.exports = config;
