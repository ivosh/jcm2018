'use strict';

const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

const findAllUcastnici = async () => {
  const found = await Ucastnik.find().lean();
  const ucastnici = found.map(ucastnik => {
    const { _id, ...withoutId } = ucastnik;
    return { id: _id, ...withoutId };
  });

  return { code: Actions.CODE_OK, status: undefined, response: ucastnici };
};

module.exports = findAllUcastnici;
