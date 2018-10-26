'use strict';

const { CODE_OK, CODE_NONEXISTING, ubytovaniModifications } = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const findUcast = require('../Ucast/findUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updateUbytovani = require('./updateUbytovani');
const validateUbytovani = require('./validateUbytovani');

const modifyUbytovani = async ({ request }) => {
  const { den, id, modifikace, rok } = request;

  const modifyFunction = ubytovaniModifications[modifikace];
  if (!modifyFunction) {
    return { code: CODE_NONEXISTING, status: `Neexistující modifikace ubytování '${modifikace}'.` };
  }

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }
  const { rocniky } = responseRocniky.response;

  const foundUcast = await findUcast({ id, rok });
  let { code, status } = foundUcast;
  const { ucast, ucastnik } = foundUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== CODE_OK) {
    return { code, status };
  }

  const origUbytovani = ucast.ubytovani.toObject(); // convert to POJO from MongoDB sub-document
  const ubytovani = modifyFunction({ den, ubytovani: origUbytovani });
  ({ code, status } = await validateUbytovani({ rok, ubytovani, rocniky }));
  if (code !== CODE_OK) {
    return { code, status };
  }
  updateUbytovani({ ucast, ubytovani });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Ubytovani in future.
  return { broadcast, code: CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = modifyUbytovani;
