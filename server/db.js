'use strict';

const logger = require('heroku-logger');
const mongoose = require('mongoose');
const config = require('./config');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

class DB {
  async connect() {
    const { uri, ...configOptions } = config.db;
    this.options = { ...configOptions, useMongoClient: true };

    const connection = await mongoose.connect(uri, this.options);
    connection.on('error', this.onError);
  }

  onError(err) {
    /* If first connect fails because mongod is down, try again later.
         This is only needed for the first connect, not for runtime reconnects.
         See: https://github.com/Automattic/mongoose/issues/5169 */
    if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      logger.error(`Failed to connect to the DB: ${err}`);

      // Wait for a bit, then try to connect again.
      setTimeout(() => {
        logger.debug('Retrying first connect to the DB...');
        const connection = mongoose.connect(config.db.uri, this.options).catch(() => {});
        // Why the empty catch?
        // Well, errors thrown by connect() will also be passed to .on('error'),
        // so we can handle them there, no need to log anything in the catch here.
        // But we still need this empty catch to avoid unhandled promise rejections.

        connection.on('error', this.onError);
      }, 5 * 1000);
    } else {
      // Some other error occurred. Log it.
      logger.error(`DB problem: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isConnected() {
    // States: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    return mongoose.connection && mongoose.connection.readyState === 1;
  }

  async dropDatabase() {
    if (!this.isConnected()) {
      await this.connect();
    }
    await mongoose.connection.db.dropDatabase();
  }

  // eslint-disable-next-line class-methods-use-this
  async disconnect() {
    await mongoose.disconnect();
  }
}

const db = new DB();

module.exports = db;
