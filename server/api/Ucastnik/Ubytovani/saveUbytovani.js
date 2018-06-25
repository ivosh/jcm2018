'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const broadcastUcastnik = require('../broadcastUcastnik');
const createUcast = require('../createUcast');
const updateUbytovani = require('./updateUbytovani');
const validateUbytovani = require('./validateUbytovani');

const saveUbytovani = async ({ request }) => {
  const { id, rok, ubytovani } = request;

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== Actions.CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }
  const { rocniky } = responseRocniky.response;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await validateUbytovani({ rok, ubytovani, rocniky }));
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await updateUbytovani({ ucast, ubytovani }));
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Ubytovani in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = saveUbytovani;
