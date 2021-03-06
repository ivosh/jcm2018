const winston = require('winston');

const formatDevelopmentParams = (info) => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(11);

  return `${ts} [${level}] ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
};

const formatProductionParams = (info) => {
  const { level, message, ...args } = info;

  return `[${level}] ${message} ${Object.keys(args).length ? JSON.stringify(args, '', '') : ''}`;
};

const formats = {
  development: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(formatDevelopmentParams)
  ),
  production: winston.format.combine(winston.format.printf(formatProductionParams)),
  test: winston.format.combine(winston.format.printf(formatProductionParams)),
};

const env = process.env.NODE_ENV || 'development';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: formats[env],
  transports: [new winston.transports.Console()],
});

module.exports = logger;
