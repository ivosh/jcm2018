'use strict';

const { CODE_OK } = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updateUbytovani = require('./updateUbytovani');
const validateUbytovani = require('./validateUbytovani');

const saveUbytovani = async ({ request }) => {
  const { id, rok } = request;

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }
  const { rocniky } = responseRocniky.response;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await validateUbytovani({ ...request, rocniky }));
  if (code !== CODE_OK) {
    return { code, status };
  }

  updateUbytovani({ ...request, ucast });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Ubytovani in future.
  return { broadcast, code: CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = saveUbytovani;
