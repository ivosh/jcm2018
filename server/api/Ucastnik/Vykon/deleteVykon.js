'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');

const deleteVykon = async ({ request }) => {
  const { id, rok } = request;

  const { code, status, ucast, ucastnik } = await createUcast({ id, rok });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ucast.vykon = undefined;
  await ucastnik.save();

  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Vykon in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = deleteVykon;
