'use strict';

const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const normalizeUcastnik = require('./normalizeUcastnik');

const broadcastUcastnik = async id => {
  const found = await Ucastnik.findById(id).lean();
  const { roky, ucasti } = normalizeUcastnik(found);

  return { broadcast: Actions.BROADCAST_UCASTNIK, data: { id, roky, ...ucasti } };
};

module.exports = broadcastUcastnik;
