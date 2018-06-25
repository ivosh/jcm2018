'use strict';

const Actions = require('../../../../common/common');

const updateUbytovani = async ({ ucast, ubytovani }) => {
  ucast.ubytovani = ubytovani; // eslint-disable-line no-param-reassign
  return { code: Actions.CODE_OK };
};

module.exports = updateUbytovani;
