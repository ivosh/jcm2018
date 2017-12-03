'use strict';

const logger = require('heroku-logger');
const db = require('./db');
const importFromXML = require('./model/importFromXML');

const file = process.argv[2];
process.title = 'xml-import';

const main = async () => {
  await db.connect();
  await db.dropDatabase();
  logger.info(`Importing ${file}.`);
  await importFromXML({ file });
  logger.info('Import completed.');
  await db.disconnect();
};

main()
  .then()
  .catch(err => logger.error(err));
