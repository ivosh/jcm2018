'use strict';

/* Get emails for distribution from the DB.
   Usage:
       LOG_LEVEL=debug NODE_ENV={development,test,production} \
           node ./server/getEmailsForDistribution 2020

   Send via Gmail UI, 100 Bcc per message.
*/

const fs = require('fs').promises;
const config = require('./config');
const db = require('./db');
const logger = require('./logger');
const Ucastnik = require('./model/Ucastnik/Ucastnik');

const aktualniRok = process.argv[2];
process.title = 'get-emails-for-distribution';

const main = async () => {
  if (!aktualniRok) {
    throw new Error('Schází aktuální rok.');
  }

  await db.connect();
  logger.info(`Getting emails from DB: ${config.db.uri}.`);

  try {
    const result = await Ucastnik.getEmailsForDistribution(aktualniRok);

    const emails = result
      .map(({ email }) => email)
      .filter((email, index, array) => array.indexOf(email) === index);
    const sorted = emails.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    await fs.writeFile('emails.txt', sorted.join(',\r\n'));

    logger.info('Completed.');
  } finally {
    await db.disconnect();
  }
};

main()
  .then()
  .catch((err) => logger.error(err));
