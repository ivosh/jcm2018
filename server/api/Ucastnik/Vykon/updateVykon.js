'use strict';

const Actions = require('../../../../common/common');

const updateVykon = async ({ ucast, vykon }) => {
  ucast.vykon = vykon; // eslint-disable-line no-param-reassign
  return { code: Actions.CODE_OK };
};

module.exports = updateVykon;
