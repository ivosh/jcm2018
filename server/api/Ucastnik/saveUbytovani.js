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

  if (ubytovani.pátek && !ubytovani.pátek.prihlaseno && !ubytovani.pátek.prespano) {
    delete ubytovani.pátek;
  }
  if (ubytovani.sobota && !ubytovani.sobota.prihlaseno && !ubytovani.sobota.prespano) {
    delete ubytovani.sobota;
  }

  if (ubytovani.pátek && !rocnik.ubytovani.pátek) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: 'Nelze se přihlásit na ubytování v pátek. Není vypsáno.'
    };
  }
  if (ubytovani.sobota && !rocnik.ubytovani.sobota) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: 'Nelze se přihlásit na ubytování v sobotu. Není vypsáno.'
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
