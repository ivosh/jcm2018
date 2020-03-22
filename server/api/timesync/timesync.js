'use strict';

const { CODE_OK } = require('../../../common/common');

const timesync = async ({ request: { clientTime } }) => ({
  code: CODE_OK,
  response: { clientTime, serverTime: new Date().toJSON() },
});

module.exports = timesync;
