'use strict';

const logger = require('heroku-logger');
const db = require('./db');
const httpServer = require('./static_http');
const createWsServer = require('./ws_server');

const PORT = Number(process.env.PORT || 4000);
process.title = 'jcm2018-server';

db.connect();

httpServer.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}.`);
});

const originAllowed = origin => {
  // TODO: Implement same origin policy
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  return true;
};

createWsServer({ httpServer, originAllowed });
