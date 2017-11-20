'use strict';

const logger = require('heroku-logger');
const Actions = require('../../common/common');
const db = require('../db');
const createUcast = require('./Ucastnik/createUcast');
const findAllUcastnici = require('./Ucastnik/findAllUcastnici');

const processRequest = async ({ action, request }) => {
  if (!db.isConnected()) {
    return {
      code: Actions.CODE_DB_DISCONNECTED,
      status: 'Není připojeno k databázi'
    };
  }

  const actions = {
    [Actions.CREATE_UCAST]: async req => createUcast(req),
    [Actions.FIND_ALL_UCASTNICI]: async req => findAllUcastnici(req),
    default: () => ({
      code: Actions.CODE_UNRECOGNIZED_ACTION,
      status: `neznámá akce '${action || ''}'`
    })
  };

  const processMessageAction = actions[action] || actions.default;
  logger.debug(`Dispatching to function ${processMessageAction}`);
  return processMessageAction(request);
};

const sendResponse = ({ connection, code, status, response, requestId }) => {
  const data = { code, status, response, requestId };
  const json = JSON.stringify(data);
  connection.sendUTF(json);
  logger.debug(`Responded: ${json}`);
};

const processMessage = async (connection, message) => {
  logger.debug(`Received: ${message.utf8Data}`);

  try {
    const { action, request, requestId } = JSON.parse(message.utf8Data);
    try {
      const { code, status, response } = await processRequest({ action, request });
      sendResponse({ connection, code, status, response, requestId });
    } catch (err) {
      logger.warn(`Failed to process the API request: ${err}`);
      sendResponse({
        connection,
        code: Actions.CODE_UNFULFILLED_REQUEST,
        status: err.message,
        requestId
      });
    }
  } catch (err) {
    logger.warn(`Cannot parse '${message.utf8Data}' as JSON.`);
    sendResponse({
      connection,
      code: Actions.CODE_UNPARSEABLE_MESSAGE,
      requestId: null
    });
  }
};

module.exports = processMessage;
