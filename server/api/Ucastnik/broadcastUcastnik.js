'use strict';

const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const normalizeUcastnik = require('./normalizeUcastnik');

const broadcastUcastnik = async id => {
  const found = await Ucastnik.findById(id).lean();
  const ucastnik = normalizeUcastnik(found);
  ucastnik.id = id;

  return { broadcast: Actions.BROADCAST_UCASTNIK, data: ucastnik };
};

module.exports = broadcastUcastnik;
