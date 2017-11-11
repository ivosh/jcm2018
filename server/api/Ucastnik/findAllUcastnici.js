'use strict';

const Actions = require('../../../common');
const Ucastnik = require('../../model/Ucastnik');

const findAllUcastnici = async () => {
  const ucastnici = await Ucastnik.find();
  return { code: Actions.CODE_OK, status: undefined, response: ucastnici };
};

module.exports = findAllUcastnici;
