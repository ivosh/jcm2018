'use strict';

const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const findAllRocniky = require('../Rocnik/findAllRocniky');
const createUcast = require('./createUcast');

const savePrihlaska = async ({ request }) => {
  const { id, rok, prihlaska } = request;

  // :TODO: zkontrolovat mladistveho
  // :TODO: zkontrolovat vyplnene cele narozeni pokud je vybrana kategorie vek.presne
  // :TODO: startovní číslo?

  let rocniky;
  {
    const { code, status, response } = await findAllRocniky();
    if (code !== Actions.CODE_OK) {
      return { code, status };
    }
    ({ rocniky } = response);
  }

  const { code, status, ucastnik } = await createUcast({ id, rok });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);
  const found = Actions.findKategorie(rocniky, {
    rok,
    typ: prihlaska.typKategorie,
    pohlavi: ucast.udaje.pohlavi,
    narozeni: ucast.udaje.narozeni,
    mladistvyPotvrzen: prihlaska.mladistvyPotvrzen
  });
  if (found.code !== Actions.CODE_OK) {
    return {
      code: found.code,
      status: found.status
    };
  }

  delete prihlaska.typKategorie;
  prihlaska.kategorie = found.kategorie.id;

  ucast.prihlaska = prihlaska;
  await ucastnik.save();
  return { code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePrihlaska;
