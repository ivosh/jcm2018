'use strict';

const Actions = require('../../../common/common');

const signOut = async () => ({
  code: Actions.CODE_OK,
  status: undefined
});

module.exports = signOut;
