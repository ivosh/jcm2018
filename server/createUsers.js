'use strict';

/* Creates users in the DB.
   Usage:
       LOG_LEVEL=debug node ./server/createUsers.js users.txt
*/

const fs = require('fs');
const readline = require('readline');
const logger = require('heroku-logger');
const db = require('./db');
const User = require('./model/User/User');

const file = process.argv[2] || '<no file specified>';
process.title = 'create-users';

const readLines = rl => {
  const lines = [];

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    rl.on('line', line => lines.push(line));
    rl.on('close', () => resolve(lines));
  });
};

const main = async () => {
  await db.connect();
  logger.info(`Creating users from ${file}.`);

  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  });

  try {
    await User.remove({});

    const lines = await readLines(rl);

    await Promise.all(
      lines.map(async line => {
        const [username, password] = line.split(' ');
        const user = new User({ username, password });
        await user.save();

        logger.debug(`User ${username} saved.`);
      })
    );

    logger.info('Completed.');
  } catch (err) {
    throw err;
  } finally {
    await db.disconnect();
  }
};

main()
  .then()
  .catch(err => logger.error(err));
