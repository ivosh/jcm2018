'use strict';

const logger = require('heroku-logger');
const Actions = require('../../common/index.js');
const createUcast = require('./Ucastnik/createUcast');
const findAllUcastnici = require('./Ucastnik/findAllUcastnici');

const processRequest = async ({ action, request }) => {
  const actions = {
    [Actions.CREATE_UCAST]: async req => createUcast(req),
    [Actions.FIND_ALL_UCASTNICI]: async req => findAllUcastnici(req),
    default: () => ({
      code: Actions.CODE_UNRECOGNIZED_ACTION,
      status: `neznámá akce ${action}`,
      response: undefined
    })
  };

  const processMessageAction = actions[action] || actions.default;
  logger.debug(`Dispatching to function ${processMessageAction}`);
  return processMessageAction(request);
};

const sendResponse = ({ connection, code, response, requestId }) => {
  const data = { code, response, requestId };
  const json = JSON.stringify(data);
  connection.sendUTF(json);
  logger.debug(`Responded: ${json}`);
};

const processMessage = async (connection, message) => {
  logger.debug(`Received: ${message.utf8Data}`);

  try {
    const { action, request, requestId } = JSON.parse(message.utf8Data);
    const { code, response } = await processRequest({ action, request });
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
