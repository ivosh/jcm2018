'use strict';

const jwt = require('jsonwebtoken');
const Actions = require('../../../common/common');
const config = require('../../config');
const logger = require('../../logger');
const User = require('../../model/User/User');

const generateToken = ({ username, nonce, secret, expireTime }) => {
  const payload = { username, nonce };
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

/* Include client-generated nonce in JWT.
   The client validates it once received from the server.
   https://auth0.com/docs/api-auth/tutorials/nonce */
const signIn = async ({ request, connection }) => {
  const { username, password, nonce } = request;

  const { code } = await User.authenticate(username, password);
  if (code !== Actions.CODE_OK) {
    logger.debug(`User ${username} failed to authenticate: ${code}`);
    return {
      code: Actions.CODE_PASSWORD_INCORRECT,
      status: 'Špatné jméno či heslo. Uživatel může být též zamčený.'
    };
  }

  connection.authenticated = true; // eslint-disable-line no-param-reassign
  return {
    code: Actions.CODE_OK,
    status: undefined,
    response: {
      username,
      token: generateToken({
        username,
        nonce,
        secret: config.jwt.secret,
        expireTime: config.jwt.expireTime
      })
    }
  };
};

module.exports = signIn;
