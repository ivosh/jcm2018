'use strict';

const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');

const saveUcast = async ({ request }) => {
  const { id, rok, udaje, prihlaska } = request;

  // :TODO: zkontrolovat kategorii (tzn. znovu ji vybrat oproti typu)
  // :TODO: zkontrolovat mladistveho
  // :TODO: zkontrolovat vyplnene cele narozeni pokud je vybrana kategorie vek.presne
  // :TODO: startovní číslo?

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
      existujiciUcast.udaje = udaje;
      existujiciUcast.prihlaska = prihlaska;
      await ucastnik.save();
      return { code: Actions.CODE_OK, status: 'stávající účast uložena v pořádku' };
    }

    logger.debug(`Creating new ucast ${rok} for ucastnik id ${id}`);
    ucastnik.ucasti.push({ rok, udaje, prihlaska });
    await ucastnik.save();
    return { code: Actions.CODE_OK, status: 'nová účast uložena v pořádku' };
  }

  return { code: Actions.CODE_NONEXISTING, status: `účastník s id ${id} neexistuje` };
};

module.exports = saveUcast;
