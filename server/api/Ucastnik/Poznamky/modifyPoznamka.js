'use strict';

const { CODE_OK, CODE_NONEXISTING } = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updatePoznamky = require('./updatePoznamky');
const validatePoznamky = require('./validatePoznamky');

const modifyPoznamka = async ({ request }) => {
  const { id, rok, index, poznamka } = request;

  const createdUcast = await createUcast({ id, rok });
  let { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== CODE_OK) {
    return { code, status };
  }

  const poznamky = ucast.poznamky.toObject(); // convert to POJO from MongoDB sub-document
  if (index >= poznamky.length) {
    return { code: CODE_NONEXISTING, status: `Poznámka číslo ${index} (+1) neexistuje.` };
  }

  poznamky[index] = poznamka;
  poznamky.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

  ({ code, status } = await validatePoznamky({ poznamky }));
  if (code !== CODE_OK) {
    return { code, status };
  }

  updatePoznamky({ ucast, poznamky });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Poznamky in future.
  return { broadcast, code: CODE_OK, status: 'uloženo v pořádku', response: { poznamky } };
};

module.exports = modifyPoznamka;
