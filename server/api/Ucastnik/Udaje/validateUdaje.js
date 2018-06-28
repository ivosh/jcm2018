'use strict';

const Actions = require('../../../../common/common');

const validateUdaje = async ({ udaje }) =>
  udaje
    ? { code: Actions.CODE_OK }
    : { code: Actions.CODE_NONEXISTING, status: 'Údaje nejsou vyplněny.' };

module.exports = validateUdaje;
