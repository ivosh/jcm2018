/* eslint-disable import/no-extraneous-dependencies */
/* This file is used only by jest tests. */
import jwt from 'jsonwebtoken';
/* eslint-enable import/no-extraneous-dependencies */

// For generating test jwt tokens.
global.crypto = { getRandomValues: (arr) => arr.fill(86) };

/* Taken from server/api/User/signIn.js. expireTime is 1. 1. 2040 (seconds since Epoch). */
const generateTestToken = ({ username, nonce, exp = 2208988800, secret = 'jwt_secret' }) => {
  const payload = { username, nonce, exp };
  return jwt.sign(payload, secret);
};

export default generateTestToken;
