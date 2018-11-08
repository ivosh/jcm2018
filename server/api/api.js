'use strict';

const jwt = require('jsonwebtoken');
const {
  API_DELETE_VYKON,
  API_FIND_ALL_ROCNIKY,
  API_FIND_ALL_STOPKY,
  API_FIND_ALL_UCASTNICI,
  API_MODIFY_STOPKY,
  API_MODIFY_UBYTOVANI,
  API_SAVE_PLATBY,
  API_SAVE_PRIHLASKA,
  API_SAVE_STOPKY,
  API_SAVE_UBYTOVANI,
  API_SAVE_UCAST,
  API_SAVE_UDAJE,
  API_SAVE_VYKON,
  API_SIGN_IN,
  API_SIGN_OUT,
  CODE_DB_DISCONNECTED,
  CODE_OK,
  CODE_TOKEN_INVALID,
  CODE_UNFULFILLED_REQUEST,
  CODE_UNPARSEABLE_MESSAGE,
  CODE_UNRECOGNIZED_ACTION
} = require('../../common/common');
const config = require('../config');
const db = require('../db');
const logger = require('../logger');
const deleteVykon = require('./Ucastnik/Vykon/deleteVykon');
const findAllRocniky = require('./Rocnik/findAllRocniky');
const findAllStopky = require('./Stopky/findAllStopky');
const findAllUcastnici = require('./Ucastnik/findAllUcastnici');
const modifyStopky = require('./Stopky/modifyStopky');
const modifyUbytovani = require('./Ucastnik/Ubytovani/modifyUbytovani');
const savePlatby = require('./Ucastnik/Platby/savePlatby');
const savePrihlaska = require('./Ucastnik/Prihlaska/savePrihlaska');
const saveStopky = require('./Stopky/saveStopky');
const saveUbytovani = require('./Ucastnik/Ubytovani/saveUbytovani');
const saveUcast = require('./Ucastnik/Ucast/saveUcast');
const saveUdaje = require('./Ucastnik/Udaje/saveUdaje');
const saveVykon = require('./Ucastnik/Vykon/saveVykon');
const signIn = require('./User/signIn');
const signOut = require('./User/signOut');

const processAuthentication = ({ token, connection }) => {
  try {
    jwt.verify(token, config.jwt.secret);
    connection.onAuth(true);
    return { code: CODE_OK };
  } catch (err) {
    connection.onAuth(false);
    logger.warn(`Failed to verify authentication token: ${token}`);
    logger.debug(err);
    return {
      code: CODE_TOKEN_INVALID,
      status: `Špatný ověřovací token. Zkus se přihlásit znovu. Detaily: ${err}`
    };
  }
};

const processRequest = async ({ action = '', request, requestId, token, connection }) => {
  if (!db.isConnected()) {
    return {
      code: CODE_DB_DISCONNECTED,
      status: 'Není připojeno k databázi'
    };
  }

  const actions = {
    [API_DELETE_VYKON]: { authRequired: true, action: async req => deleteVykon(req) },
    [API_FIND_ALL_ROCNIKY]: {
      authRequired: true,
      action: async req => findAllRocniky(req)
    },
    [API_FIND_ALL_STOPKY]: { authRequired: true, action: async req => findAllStopky(req) },
    [API_FIND_ALL_UCASTNICI]: {
      authRequired: true,
      action: async req => findAllUcastnici(req)
    },
    [API_MODIFY_STOPKY]: { authRequired: true, action: async req => modifyStopky(req) },
    [API_MODIFY_UBYTOVANI]: { authRequired: true, action: async req => modifyUbytovani(req) },
    [API_SAVE_PLATBY]: { authRequired: true, action: async req => savePlatby(req) },
    [API_SAVE_PRIHLASKA]: { authRequired: true, action: async req => savePrihlaska(req) },
    [API_SAVE_STOPKY]: { authRequired: true, action: async req => saveStopky(req) },
    [API_SAVE_UBYTOVANI]: { authRequired: true, action: async req => saveUbytovani(req) },
    [API_SAVE_UCAST]: { authRequired: true, action: async req => saveUcast(req) },
    [API_SAVE_UDAJE]: { authRequired: true, action: async req => saveUdaje(req) },
    [API_SAVE_VYKON]: { authRequired: true, action: async req => saveVykon(req) },
    [API_SIGN_IN]: { authRequired: false, action: async req => signIn(req) },
    [API_SIGN_OUT]: { authRequired: false, action: async req => signOut(req) },
    default: {
      authRequired: false,
      action: () => ({
        code: CODE_UNRECOGNIZED_ACTION,
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
    if (result.code !== CODE_OK) {
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
        code: CODE_UNFULFILLED_REQUEST,
        status: err.message,
        requestId
      });
    }
  } catch (err) {
    logger.warn(`Cannot parse '${message.utf8Data}' as JSON.`);
    sendResponse({
      connection,
      code: CODE_UNPARSEABLE_MESSAGE,
      requestId: null
    });
  }

  return {};
};

module.exports = processMessage;
