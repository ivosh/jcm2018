'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const findAllRocniky = require('../../Rocnik/findAllRocniky');
const broadcastUcastnik = require('../broadcastUcastnik');
const updatePlatby = require('../Platby/updatePlatby');
const updatePoznamky = require('../Poznamky/updatePoznamky');
const updatePrihlaska = require('../Prihlaska/updatePrihlaska');
const updateUbytovani = require('../Ubytovani/updateUbytovani');
const updateUdaje = require('../Udaje/updateUdaje');
const updateVykon = require('../Vykon/updateVykon');
const validatePlatby = require('../Platby/validatePlatby');
const validatePoznamky = require('../Poznamky/validatePoznamky');
const validatePrihlaska = require('../Prihlaska/validatePrihlaska');
const validateUbytovani = require('../Ubytovani/validateUbytovani');
const validateUdaje = require('../Udaje/validateUdaje');
const validateVykon = require('../Vykon/validateVykon');
const createUcast = require('./createUcast');

const validates = [
  validateUdaje,
  validatePrihlaska,
  validateVykon,
  validatePlatby,
  validateUbytovani,
  validatePoznamky,
];
const updates = [
  updateUdaje,
  updatePrihlaska,
  updateVykon,
  updatePlatby,
  updateUbytovani,
  updatePoznamky,
];

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

  updates.forEach((update) => update({ ...request, ucast, kategorie, rocniky }));

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id);
  return {
    broadcast,
    code: Actions.CODE_OK,
    status: 'uloženo v pořádku',
    response: { id: ucastnik.id },
  };
};

module.exports = saveUcast;
