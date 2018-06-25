'use strict';

const jwt = require('jsonwebtoken');
const Actions = require('../../common/common');
const config = require('../config');
const db = require('../db');
const logger = require('../logger');
const deleteVykon = require('./Ucastnik/Vykon/deleteVykon');
const findAllRocniky = require('./Rocnik/findAllRocniky');
const findAllStopky = require('./Stopky/findAllStopky');
const findAllUcastnici = require('./Ucastnik/findAllUcastnici');
const savePlatby = require('./Ucastnik/Platby/savePlatby');
const savePrihlaska = require('./Ucastnik/Prihlaska/savePrihlaska');
const saveStopky = require('./Stopky/saveStopky');
const saveUbytovani = require('./Ucastnik/Ubytovani/saveUbytovani');
const saveUdaje = require('./Ucastnik/Udaje/saveUdaje');
const saveVykon = require('./Ucastnik/Vykon/saveVykon');
const signIn = require('./User/signIn');
const signOut = require('./User/signOut');

const processAuthentication = ({ token, connection }) => {
  try {
    jwt.verify(token, config.jwt.secret);
    connection.onAuth(true);
    return { code: Actions.CODE_OK };
  } catch (err) {
    connection.onAuth(false);
    logger.warn(`Failed to verify authentication token: ${token}`);
    logger.debug(err);
    return {
      code: Actions.CODE_TOKEN_INVALID,
      status: `Špatný ověřovací token. Zkus se přihlásit znovu. Detaily: ${err}`
    };
  }
};

const processRequest = async ({ action = '', request, requestId, token, connection }) => {
  if (!db.isConnected()) {
    return {
      code: Actions.CODE_DB_DISCONNECTED,
      status: 'Není připojeno k databázi'
    };
  }

  const actions = {
    [Actions.DELETE_VYKON]: { authRequired: true, action: async req => deleteVykon(req) },
    [Actions.FIND_ALL_ROCNIKY]: { authRequired: true, action: async req => findAllRocniky(req) },
    [Actions.FIND_ALL_STOPKY]: { authRequired: true, action: async req => findAllStopky(req) },
    [Actions.FIND_ALL_UCASTNICI]: {
      authRequired: true,
      action: async req => findAllUcastnici(req)
    },
    [Actions.SAVE_PLATBY]: { authRequired: true, action: async req => savePlatby(req) },
    [Actions.SAVE_PRIHLASKA]: { authRequired: true, action: async req => savePrihlaska(req) },
    [Actions.SAVE_STOPKY]: { authRequired: true, action: async req => saveStopky(req) },
    [Actions.SAVE_UBYTOVANI]: { authRequired: true, action: async req => saveUbytovani(req) },
    [Actions.SAVE_UDAJE]: { authRequired: true, action: async req => saveUdaje(req) },
    [Actions.SAVE_VYKON]: { authRequired: true, action: async req => saveVykon(req) },
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
    `Dispatching request ${requestId} to action ${
      processMessageAction.action
    }, authentication required: ${processMessageAction.authRequired}`
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
  logger.debug(`Response for request ${requestId} sent.`);
  logger.silly(`Responded: ${json}`);
};

const processMessage = async (connection, message) => {
  logger.debug('Received request.');
  logger.silly(`Received: ${message.utf8Data}`);

  try {
    const { action, request, token, requestId } = JSON.parse(message.utf8Data);
    try {
      const { broadcast, code, status, response } = await processRequest({
        action,
        request,
        requestId,
        token,
        connection
      });
      sendResponse({ connection, code, status, response, requestId });
      return { broadcast, debugMessage: `Message for ${requestId} broadcasted.` };
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

  return {};
};

module.exports = processMessage;
