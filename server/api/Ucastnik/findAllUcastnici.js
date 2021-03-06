'use strict';

const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const normalizeUcastnik = require('./normalizeUcastnik');

const normalizeUcastnici = (ucastnici) => {
  const normalized = {};

  ucastnici.forEach((ucastnik) => {
    const { ucasti, ...rest } = normalizeUcastnik(ucastnik);
    normalized[ucastnik._id] = { ...rest, ...ucasti };
  });

  return normalized;
};

const findAllUcastnici = async () => {
  const found = await Ucastnik.find().lean();
  const ucastnici = normalizeUcastnici(found);

  return { code: Actions.CODE_OK, status: undefined, response: ucastnici };
};

module.exports = findAllUcastnici;
