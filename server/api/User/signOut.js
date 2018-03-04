'use strict';

const Actions = require('../../../common/common');

const signOut = async ({ connection }) => {
  connection.onAuth(false);

  return {
    code: Actions.CODE_OK,
    status: undefined
  };
};

module.exports = signOut;
