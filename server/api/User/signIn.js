'use strict';

const jwt = require('jsonwebtoken');
const { CODE_OK, CODE_PASSWORD_INCORRECT } = require('../../../common/common');
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
  if (code !== CODE_OK) {
    logger.debug(`User ${username} failed to authenticate: ${code}`);
    return {
      code: CODE_PASSWORD_INCORRECT,
      status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
    };
  }

  connection.onAuth({ authenticated: true, username });
  return {
    code: CODE_OK,
    status: undefined,
    response: {
      username,
      token: generateToken({
        username,
        nonce,
        secret: config.jwt.secret,
        expireTime: config.jwt.expireTime,
      }),
    },
  };
};

module.exports = signIn;
