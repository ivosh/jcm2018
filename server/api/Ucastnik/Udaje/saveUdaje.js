'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updateUdaje = require('./updateUdaje');
const validateUdaje = require('./validateUdaje');

const saveUdaje = async ({ request }) => {
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

  ({ code, status } = await validateUdaje());
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  updateUdaje({ ...request, ucast });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Udaje in future.
  return {
    broadcast,
    code: Actions.CODE_OK,
    status: 'uloženo v pořádku',
    response: { id: ucastnik.id }
  };
};

module.exports = saveUdaje;
