'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

const generateTestToken = () => {
  const expireTime = 2208988800; // 1. 1. 2040 (seconds since Epoch)
  const payload = { username: 'tumáš', nonce: '===nonce from client==' };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: expireTime });
};

module.exports = generateTestToken;
