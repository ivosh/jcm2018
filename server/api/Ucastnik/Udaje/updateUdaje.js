'use strict';

const Actions = require('../../../../common/common');

const updateUdaje = async ({ ucast, udaje }) => {
  ucast.udaje = udaje; // eslint-disable-line no-param-reassign
  return { code: Actions.CODE_OK };
};

module.exports = updateUdaje;
