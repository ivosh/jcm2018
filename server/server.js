'use strict';

const logger = require('heroku-logger');
const common = require('../common/common');
const db = require('./db');
const httpServer = require('./staticHttpServer');
const createWsServer = require('./createWsServer');

const PORT = Number(process.env.PORT || common.PORT);
process.title = 'jcm2018-server';

db.connect();

httpServer.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}.`);
});

const requestAllowed = webSocketRequest => {
  /* webSocketRequest.origin is only advisory and Same origin policy cannot rely on it.
     Rather, we disallow http in production and employ authentication-protected API. */
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    const proto = webSocketRequest.httpRequest.headers['X-Forwarded-Proto'];
    if (proto === 'https') {
      logger.debug(`Allowing originating protocol ${proto} in production.`);
      return true;
    }
    logger.debug(`Disallowing originating protocol ${proto} in production.`);
    return false;
  }
  logger.debug('Allowing any access, not in production.');
  return true;
};

createWsServer({ httpServer, requestAllowed });
