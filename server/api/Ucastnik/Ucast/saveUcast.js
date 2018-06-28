'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updateUdaje = require('../Udaje/updateUdaje');
const updatePrihlaska = require('../Prihlaska/updatePrihlaska');
const updateVykon = require('../Vykon/updateVykon');
const updatePlatby = require('../Platby/updatePlatby');
const updateUbytovani = require('../Ubytovani/updateUbytovani');
const validateUdaje = require('../Udaje/validateUdaje');
const validatePrihlaska = require('../Prihlaska/validatePrihlaska');
const validateVykon = require('../Vykon/validateVykon');
const validatePlatby = require('../Platby/validatePlatby');
const validateUbytovani = require('../Ubytovani/validateUbytovani');

const validates = [
  validateUdaje,
  validatePrihlaska,
  validateVykon,
  validatePlatby,
  validateUbytovani
];
const updates = [updateUdaje, updatePrihlaska, updateVykon, updatePlatby, updateUbytovani];

const saveUcast = async ({ request }) => {
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
    `saveUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  const callback = async (func, result) =>
    result.code === Actions.CODE_OK ? func({ ...request, ucast, kategorie, rocniky }) : result;

  code = Actions.CODE_OK;
  // TODO: This should be eventually rewritten with async iteration: for await (const x of xy).
  // eslint-disable-next-line no-restricted-syntax
  for (const validate of validates) {
    // eslint-disable-next-line no-await-in-loop
    ({ code, status } = await callback(validate, { code, status }));
  }
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  // TODO: This should be eventually rewritten with async iteration: for await (const x of xy).
  // eslint-disable-next-line no-restricted-syntax
  for (const update of updates) {
    // eslint-disable-next-line no-await-in-loop
    ({ code, status } = await callback(update, { code, status }));
  }
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id);
  return {
    broadcast,
    code: Actions.CODE_OK,
    status: 'uloženo v pořádku',
    response: { id: ucastnik.id }
  };
};

module.exports = saveUcast;
