'use strict';

const util = require('util');
const logger = require('heroku-logger');
const Actions = require('../../../common/common');
const findAllRocniky = require('../Rocnik/findAllRocniky');
const createUcast = require('./createUcast');

const deepPrint = obj => util.inspect(obj, false, null);

const savePrihlaska = async ({ request }) => {
  const { id, rok, prihlaska } = request;

  // :TODO: zkontrolovat mladistveho
  // :TODO: zkontrolovat vyplnene cele narozeni pokud je vybrana kategorie vek.presne
  // :TODO: startovní číslo?

  const responseRocniky = await findAllRocniky();
  if (responseRocniky.code !== Actions.CODE_OK) {
    return { code: responseRocniky.code, status: responseRocniky.status };
  }
  const { kategorie, rocniky } = responseRocniky.response;

  if (!kategorie[prihlaska.kategorie]) {
    return {
      code: Actions.CODE_NONEXISTING,
      status: `Kategorie id '${prihlaska.kategorie}' neexistuje.`
    };
  }

  const { code, status, ucastnik } = await createUcast({ id, rok });
  logger.debug(
    `createUcast(id: ${id}, rok: ${rok}): code: ${code}, id: ${ucastnik ? ucastnik.id : '?'}`
  );
  if (code !== Actions.CODE_OK) {
    return { code, status };
  }

  const ucast = ucastnik.ucasti.find(oneUcast => oneUcast.rok === rok);

  const { typ } = kategorie[prihlaska.kategorie];
  const found = Actions.findKategorie(rocniky, {
    rok,
    typ,
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

  if (!found.kategorie.id.equals(prihlaska.kategorie)) {
    return {
      code: Actions.CODE_KATEGORIE_INVALID,
      status: `Chybně vybraná kategorie id ${prihlaska.kategorie} oproti správné ${
        found.kategorie.id
      }. Detaily: ${deepPrint(kategorie[prihlaska.kategorie])} vs. ${deepPrint(found.kategorie)}`
    };
  }

  delete prihlaska.typ;
  if (!rocniky[rok].kategorie[typ].startCisla) {
    delete prihlaska.startCislo;
  }

  ucast.prihlaska = prihlaska;
  await ucastnik.save();
  return { code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePrihlaska;
