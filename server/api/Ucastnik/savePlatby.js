'use strict';

const Actions = require('../../../common/common');
const logger = require('../../logger');
const broadcastUcastnik = require('./broadcastUcastnik');
const createUcast = require('./createUcast');

const savePlatby = async ({ request }) => {
  const { id, rok, platby } = request;

  const { code, status, ucastnik } = await createUcast({ id, rok });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
  ucast.platby = platby;
  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Platby in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePlatby;
