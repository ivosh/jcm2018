'use strict';

const Actions = require('../../../common/common');

const signOut = async ({ connection }) => {
  connection.authenticated = false; // eslint-disable-line no-param-reassign

  return {
    code: Actions.CODE_OK,
    status: undefined
  };
};

module.exports = signOut;
