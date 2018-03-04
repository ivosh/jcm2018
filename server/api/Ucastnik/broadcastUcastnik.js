'use strict';

const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const normalizeUcastnik = require('./normalizeUcastnik');

const broadcastUcastnik = async id => {
  const found = await Ucastnik.findById(id).lean();
  const ucastnik = normalizeUcastnik(found);

  return { broadcast: 'broadcastUcastnik', data: ucastnik };
};

module.exports = broadcastUcastnik;
