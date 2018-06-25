'use strict';

const Actions = require('../../../../common/common');

const updatePlatby = async ({ ucast, platby }) => {
  ucast.platby = platby; // eslint-disable-line no-param-reassign
  return { code: Actions.CODE_OK };
};

module.exports = updatePlatby;
