'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updateVykon = require('./updateVykon');
const validateVykon = require('./validateVykon');

const saveVykon = async ({ request }) => {
  const { id, rok, vykon } = request;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await validateVykon());
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  updateVykon({ ...request, ucast });

  ucast.vykon = vykon;
  await ucastnik.save();

  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Vykon in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = saveVykon;
