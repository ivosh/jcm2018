'use strict';

const { CODE_OK } = require('../../../../common/common');
const logger = require('../../../logger');
const createUcast = require('../Ucast/createUcast');
const broadcastUcastnik = require('../broadcastUcastnik');
const updatePoznamky = require('./updatePoznamky');

const deletePoznamka = async ({ request }) => {
  const { id, rok, index } = request;

  const createdUcast = await createUcast({ id, rok });
  const { code, status } = createdUcast;
  const { ucast, ucastnik } = createdUcast;
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== CODE_OK) {
    return { code, status };
  }

  const poznamky = ucast.poznamky.toObject(); // convert to POJO from MongoDB sub-document
  poznamky.splice(index, 1);

  updatePoznamky({ ucast, poznamky });

  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Poznamky in future.
  return { broadcast, code: CODE_OK, status: 'uloženo v pořádku', response: { poznamky } };
};

module.exports = deletePoznamka;
