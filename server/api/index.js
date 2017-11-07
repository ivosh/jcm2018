'use strict';

const logger = require('heroku-logger');
const Actions = require('../../common/index.js');
const UcastnikAPI = require('./Ucastnik');

const processRequest = ({ action, request }) => {
  const actions = {
    [Actions.FIND_ALL_UCASTNICI]: async req => UcastnikAPI.findAllUcastnici(req),
    default: () => ({ code: Actions.CODE_UNRECOGNIZED_ACTION, response: undefined })
  };

  const processMessageAction = actions[action] || actions.default;
  return processMessageAction(request);
};

const sendResponse = ({ connection, code, response, requestId }) => {
  const data = { code, response, requestId };
  const json = JSON.stringify(data);
  connection.sendUTF(json);
  logger.debug(`Responded: ${json}`);
};

const processMessage = (connection, message) => {
  logger.debug(`Received: ${message.utf8Data}`);

  try {
    const { action, request, requestId } = JSON.parse(message.utf8Data);
    const { code, response } = processRequest({ action, request });
    sendResponse({ connection, code, response, requestId });
  } catch (err) {
    logger.warn(`Cannot parse >${message.utf8Data}< as JSON.`);
    sendResponse({
      connection,
      code: Actions.CODE_UNPARSABLE_MESSAGE,
      response: undefined,
      requestId: null
    });
  }
};

module.exports = processMessage;
