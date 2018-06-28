'use strict';

const Actions = require('../../../../common/common');
const logger = require('../../../logger');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');

/* Creates účast and účastník if necessary. Returns {code, ucastnik: Ucastnik instance}. */
const createUcast = async ({ id, rok }) => {
  let ucastnik = null;

  if (!id) {
    ucastnik = new Ucastnik();
    logger.debug('Účastník created.');
  } else {
    try {
      ucastnik = await Ucastnik.findById(id);
    } catch (err) {
      logger.debug(`Účastník id ${id} not found.`);
      return {
        code: Actions.CODE_NONEXISTING,
        status: `Účastník s id ${id} neexistuje. Detaily: ${err}`
      };
    }
    if (!ucastnik) {
      return { code: Actions.CODE_NONEXISTING, status: `Účastník s id ${id} neexistuje.` };
    }

    logger.debug(`Účastník id ${id} found.`);
    logger.silly(`Účastník id ${id} found: ${ucastnik}`);
  }

  const existujiciUcast = ucastnik.ucasti.find(ucast => ucast.rok === rok);
  if (existujiciUcast) {
    logger.debug(`Nalezena účast pro rok ${rok} účastníka ${ucastnik.id}.`);
    return {
      code: Actions.CODE_OK,
      status: `Nalezena existující účast pro rok ${rok}.`,
      ucast: existujiciUcast,
      ucastnik
    };
  }
  logger.debug(`Vytvářím novou účast pro rok ${rok} účastníka ${ucastnik.id}.`);
  ucastnik.ucasti.push({ rok });
  const novaUcast = ucastnik.ucasti.find(ucast => ucast.rok === rok);
  return {
    code: Actions.CODE_OK,
    status: `Vytvořena účast pro rok ${rok}.`,
    ucast: novaUcast,
    ucastnik
  };
};

module.exports = createUcast;
