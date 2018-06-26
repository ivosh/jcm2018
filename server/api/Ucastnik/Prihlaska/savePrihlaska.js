'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updatePrihlaska = require('./updatePrihlaska');
const validatePrihlaska = require('./validatePrihlaska');

const savePrihlaska = async ({ request }) => {
  const { id, rok } = request;

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== Actions.CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }
  const { kategorie, rocniky } = responseRocniky.response;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `savePrihlaska(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await validatePrihlaska({ ...request, ucast, kategorie, rocniky }));
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  ({ code, status } = await updatePrihlaska({ ...request, ucast, kategorie, rocniky }));
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Prihlaska in future
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePrihlaska;
