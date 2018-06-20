'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

/* Use native ES6 promises. */
mongoose.Promise = global.Promise;

/* Enable for debugging. */
// mongoose.set('debug', true);

class DB {
  async connect() {
    const { uri, ...options } = config.db;
    this.options = options;

    await this.reconnect();
  }

  async reconnect() {
    try {
      await mongoose.connect(
        config.db.uri,
        this.options
      );
      logger.info('Connected to the DB');
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    /* If first connect fails because mongod is down, try again later.
       This is only needed for the first connect, not for runtime reconnects.
       See: https://github.com/Automattic/mongoose/issues/5169 */
    if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      logger.error(`Failed to connect to the DB: ${err}`);

      // Wait for a bit, then try to connect again.
      setTimeout(async () => {
        logger.debug('Retrying first connect to the DB...');
        await this.reconnect();
      }, config.db.reconnectInterval);
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

  // eslint-disable-next-line class-methods-use-this
  async dropDatabase() {
    await mongoose.connection.db.dropDatabase();
  }

  // eslint-disable-next-line class-methods-use-this
  async disconnect() {
    await mongoose.disconnect();
  }
}

const db = new DB();

module.exports = db;
