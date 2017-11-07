'use strict';

const Actions = require('../../common');
const Ucastnik = require('../model/Ucastnik/Ucastnik');

const findAllUcastnici = async () => {
  const ucastnici = await Ucastnik.find();
  return { code: Actions.CODE_OK, response: ucastnici };
};

module.exports = { findAllUcastnici };
