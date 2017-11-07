'use strict';

const logger = require('heroku-logger');
const Actions = require('../../common/index.js');
const UcastnikAPI = require('./Ucastnik');

const processMessage = (connection, message) => {
  logger.debug(`Received: ${message.utf8Data}`);
  const { action, request, requestId } = JSON.parse(message.utf8Data);

  const actions = {
    [Actions.FIND_ALL_UCASTNICI]: async req => UcastnikAPI.findAllUcastnici(req),
    default: () => ({ code: Actions.CODE_UNRECOGNIZED_ACTION, response: undefined })
  };

  const processMessageAction = actions[action] || actions.default;
  const { code, response } = processMessageAction(request);

  const data = { code, response, requestId };
  const json = JSON.stringify(data);
  connection.sendUTF(json);
  logger.debug(`Responded: ${json}`);
};

module.exports = processMessage;
