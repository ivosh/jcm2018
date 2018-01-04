'use strict';

const jwt = require('jsonwebtoken');
const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const config = require('../../config');
const User = require('../../model/User/User');

const EXPIRE_TIME = 8 * 60 * 24; // 8 hours

const generateToken = (username, nonce) => {
  const payload = { username, nonce };
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: EXPIRE_TIME
  });
};

/* Include client-generated nonce in JWT.
   The client is supposed to validate it there.
   https://auth0.com/docs/api-auth/tutorials/nonce */
const signIn = async ({ username, password, nonce }) => {
  const { code } = await User.authenticate(username, password);
  if (code !== Actions.CODE_OK) {
    logger.debug(`User ${username} failed to authenticate: ${code}`);
    return {
      code: Actions.CODE_PASSWORD_INCORRECT,
      status: 'Špatné jméno či heslo. Uživatel může být též zamčený.'
    };
  }

  return {
    code: Actions.CODE_OK,
    status: undefined,
    response: { username, token: generateToken(username, nonce) }
  };
};

// :TODO: another function for re-authentication (should validate the token and pass it back)

module.exports = signIn;
