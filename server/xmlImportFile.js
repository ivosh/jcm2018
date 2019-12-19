'use strict';

/* Imports jcm.xml into the DB.
   Usage:
       LOG_LEVEL=debug NODE_ENV={development,test,production} node ./server/xmlImportFile jcm.xml
*/

const db = require('./db');
const logger = require('./logger');
const importFromXML = require('./model/importFromXML');

const file = process.argv[2] || '<no file specified>';
process.title = 'xml-import';

const main = async () => {
  await db.connect();
  await db.dropDatabase();
  logger.info(`Importing ${file}.`);
  try {
    await importFromXML({ file });
    logger.info('Import completed.');
  } finally {
    await db.disconnect();
  }
};

main()
  .then()
  .catch(err => logger.error(err));
