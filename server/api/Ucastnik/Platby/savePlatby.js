'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updatePlatby = require('./updatePlatby');
const validatePlatby = require('./validatePlatby');

const savePlatby = async ({ request }) => {
  const { id, rok } = request;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await validatePlatby());
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  updatePlatby({ ...request, ucast });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Platby in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePlatby;
