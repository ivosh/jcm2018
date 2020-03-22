'use strict';

/* Creates users in the DB.
   Usage:
       LOG_LEVEL=debug NODE_ENV={development,test,production} node ./server/createUsers.js users.txt
*/

const fs = require('fs');
const readline = require('readline');
const config = require('./config');
const db = require('./db');
const logger = require('./logger');
const User = require('./model/User/User');

const file = process.argv[2] || '<no file specified>';
process.title = 'create-users';

const readLines = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
    terminal: false,
  });

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const lines = [];
    rl.on('line', (line) => lines.push(line));
    rl.on('close', () => resolve(lines));
  });
};

const main = async () => {
  await db.connect();
  logger.info(`Creating users from ${file} in DB: ${config.db.uri}.`);

  try {
    try {
      await User.collection.drop();
    } catch (err) {
      if (err.codeName && err.codeName === 'NamespaceNotFound') {
        // Ignore, this is expected (collection did not exist previously).
      } else {
        throw err;
      }
    }

    const lines = await readLines();

    await Promise.all(
      lines.map(async (line) => {
        const [username, password, email] = line.split(' ');
        const user = new User({ username, password, email });
        await user.save();

        logger.debug(`User ${username} saved.`);
      })
    );

    logger.info('Completed.');
  } finally {
    await db.disconnect();
  }
};

main()
  .then()
  .catch((err) => logger.error(err));
