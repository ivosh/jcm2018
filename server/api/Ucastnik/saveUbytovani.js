'use strict';

const Actions = require('../../../common/common');
const logger = require('../../logger');
const findAllRocniky = require('../Rocnik/findAllRocniky');
const broadcastUcastnik = require('./broadcastUcastnik');
const createUcast = require('./createUcast');

const saveUbytovani = async ({ request }) => {
  const { id, rok, ubytovani } = request;

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== Actions.CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }

  const { rocniky } = responseRocniky.response;
  const rocnik = rocniky[rok];

  if (!rocnik) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: `Ročník JCM pro rok ${rok} není vypsán.`
    };
  }

  const notFound = ubytovani.filter(ubytko => !rocnik.ubytovani[ubytko.den]);
  if (notFound.length > 0) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: `Nelze se přihlásit na ubytování v den: ${notFound[0].den}. Není vypsáno.`
    };
  }

  const { code, status, ucastnik } = await createUcast({ id, rok });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
  ucast.ubytovani = ubytovani;
  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Ubytovani in future.
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = saveUbytovani;
