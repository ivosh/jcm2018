'use strict';

const logger = require('heroku-logger');
const jwt = require('jsonwebtoken');
const Actions = require('../../common/common');
const config = require('../config');
const db = require('../db');
const createUcast = require('./Ucastnik/createUcast');
const findAllRocniky = require('./Rocnik/findAllRocniky');
const findAllUcastnici = require('./Ucastnik/findAllUcastnici');
const signIn = require('./User/signIn');
const signOut = require('./User/signOut');

const processAuthentication = ({ token, connection }) => {
  try {
    jwt.verify(token, config.jwt.secret);
    connection.authenticated = true; // eslint-disable-line no-param-reassign
    return { code: Actions.CODE_OK };
  } catch (err) {
    connection.authenticated = false; // eslint-disable-line no-param-reassign
    logger.warn(`Failed to verify authentication token: ${token}`);
    logger.debug(err);
    return {
      code: Actions.TOKEN_INVALID,
      status: `Špatný ověřovací token. Zkus se přihlásit znovu. Detaily: ${err}`
    };
  }
};

const processRequest = async ({ action = '', request, token, connection }) => {
  if (!db.isConnected()) {
    return {
      code: Actions.CODE_DB_DISCONNECTED,
      status: 'Není připojeno k databázi'
    };
  }

  const actions = {
    [Actions.CREATE_UCAST]: { authRequired: true, action: async req => createUcast(req) },
    [Actions.FIND_ALL_ROCNIKY]: { authRequired: true, action: async req => findAllRocniky(req) },
    [Actions.FIND_ALL_UCASTNICI]: {
      authRequired: true,
      action: async req => findAllUcastnici(req)
    },
    [Actions.SIGN_IN]: { authRequired: false, action: async req => signIn(req) },
    [Actions.SIGN_OUT]: { authRequired: false, action: async req => signOut(req) },
    default: {
      authRequired: false,
      action: () => ({
        code: Actions.CODE_UNRECOGNIZED_ACTION,
        status: `neznámá akce: ${action}`
      })
    }
  };

  const processMessageAction = actions[action] || actions.default;
  logger.debug(
    `Dispatching to action ${processMessageAction.action}, authorization required: ${
      processMessageAction.authRequired
    }`
  );

  if (processMessageAction.authRequired) {
    const result = processAuthentication({ token, connection });
    if (result.code !== Actions.CODE_OK) {
      return result;
    }
  }

  return processMessageAction.action({ request, connection });
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
    const { action, request, token, requestId } = JSON.parse(message.utf8Data);
    try {
      const { code, status, response } = await processRequest({
        action,
        request,
        token,
        connection
      });
      sendResponse({ connection, code, status, response, requestId });
    } catch (err) {
      logger.warn(`Failed to process the API request: ${err}`);
      logger.debug(err);
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
