'use strict';

const logger = require('heroku-logger');
const db = require('./db');
const staticHttpServer = require('./staticHttpServer');
const createWsServer = require('./createWsServer');

const PORT = Number(process.env.PORT || 4000);
process.title = 'jcm2018-server';

db.connect();

staticHttpServer.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}.`);
});

const originAllowed = origin => {
  // TODO: Implement same origin policy
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  return true;
};

createWsServer({ staticHttpServer, originAllowed });
