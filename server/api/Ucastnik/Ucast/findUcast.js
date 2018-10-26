'use strict';

const { CODE_OK, CODE_NONEXISTING } = require('../../../../common/common');
const logger = require('../../../logger');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');

/* Finds an existing účast for an existing účastník. Returns {code, ucast, ucastnik}.
   Note: ucast and ucastnik are MongoDB objects. */
const findUcast = async ({ id, rok }) => {
  let ucastnik = null;
  try {
    ucastnik = await Ucastnik.findById(id);
  } catch (err) {
    logger.debug(`Účastník id ${id} not found.`);
    return { code: CODE_NONEXISTING, status: `Účastník s id ${id} neexistuje. Detaily: ${err}` };
  }

  if (!ucastnik) {
    return { code: CODE_NONEXISTING, status: `Účastník s id ${id} neexistuje.` };
  }
  logger.debug(`Účastník id ${id} found.`);
  logger.silly(`Účastník id ${id} found: ${ucastnik}`);

  const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
  if (ucast) {
    logger.debug(`Nalezena účast pro rok ${rok} účastníka ${ucastnik.id}.`);
    return {
      code: CODE_OK,
      status: `Nalezena existující účast pro rok ${rok}.`,
      ucast,
      ucastnik
    };
  }

  logger.debug(`Účast roku ${rok} pro účastníka id ${id} not found.`);
  return {
    code: CODE_NONEXISTING,
    status: `Účast roku ${rok} pro účastníka s id ${id} neexistuje.`,
    ucastnik
  };
};

module.exports = findUcast;
