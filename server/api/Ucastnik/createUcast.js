'use strict';

const logger = require('heroku-logger');
const Actions = require('../../../common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

const createUcast = async ({ id, rok, udaje, prihlaska }) => {
  if (id === undefined) {
    logger.debug('Creating brand new ucastnik');
    const ucastnik = new Ucastnik();
    ucastnik.ucasti.push({ rok, udaje, prihlaska });
    const ucastnikSaved = await ucastnik.save();
    return {
      code: Actions.CODE_OK,
      status: 'nový účastník uložen v pořádku',
      response: { id: ucastnikSaved.id }
    };
  }

  const ucastnik = await Ucastnik.findById(id);
  if (ucastnik) {
    logger.debug(`Ucastnik id ${id} found: ${ucastnik}`);
    const existujiciUcast = ucastnik.ucasti.find(ucast => ucast.rok === rok);
    if (existujiciUcast) {
      return { code: Actions.CODE_EXISTING_UCAST, status: `účast pro rok ${rok} již existuje` };
    }

    logger.debug(`Creating new ucast ${rok} for ucastnik id ${id}`);
    ucastnik.ucasti.push({ rok, udaje, prihlaska });
    await ucastnik.save();
    return { code: Actions.CODE_OK, status: 'nová účast uložena v pořádku' };
  }

  return { code: Actions.CODE_NONEXISTING, status: `účastník s id ${id} neexistuje` };
};

module.exports = createUcast;
