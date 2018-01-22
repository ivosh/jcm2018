'use strict';

const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

/* Creates účast and účastník if necessary. Returns {code, ucastnik: Ucastnik instance}. */
const createUcast = async ({ id, rok, udaje }) => {
  let ucastnik = null;

  if (!id) {
    ucastnik = new Ucastnik();
    await ucastnik.save();
    logger.debug(`Účastník created: id ${ucastnik.id}.`);
  } else {
    ucastnik = await Ucastnik.findById(id);
    if (!ucastnik) {
      logger.debug(`Účastník id ${id} not found.`);
      return { code: Actions.CODE_NONEXISTING, status: `účastník s id ${id} neexistuje` };
    }

    logger.debug(`Účastník id ${id} found: ${ucastnik}`);
  }

  const existujiciUcast = ucastnik.ucasti.find(ucast => ucast.rok === rok);
  if (existujiciUcast) {
    logger.debug(`Nalezena účast pro rok ${rok} účastníka ${ucastnik.id}.`);
    return { code: Actions.CODE_OK, status: `Nalezena existující účast pro rok ${rok}.`, ucastnik };
  }
  logger.debug(`Vytvářím novou účast pro rok ${rok} účastníka ${ucastnik.id}.`);
  ucastnik.ucasti.push({ rok, udaje });
  await ucastnik.save();
  return { code: Actions.CODE_OK, status: `Vytvořena účast pro rok ${rok}.`, ucastnik };
};

module.exports = createUcast;
