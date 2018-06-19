'use strict';

const util = require('util');
const Actions = require('../../../common/common');
const logger = require('../../logger');
const Ucastnik = require('../../model/Ucastnik/Ucastnik');
const findAllRocniky = require('../Rocnik/findAllRocniky');
const broadcastUcastnik = require('./broadcastUcastnik');
const createUcast = require('./createUcast');

const deepPrint = obj => util.inspect(obj, { depth: null });

const findUcasti = async ({ rok, startCislo, typ }) => {
  const ucastnici = await Ucastnik.find(
    { 'ucasti.rok': rok, 'ucasti.prihlaska.startCislo': startCislo },
    { ucasti: { $elemMatch: { rok } } }
  ).populate({
    path: 'ucasti.prihlaska.kategorie'
  });

  return ucastnici.filter(ucastnik => ucastnik.ucasti[0].prihlaska.kategorie.typ === typ);
};

const savePrihlaska = async ({ request }) => {
  const { id, rok, prihlaska } = request;

  // :TODO: zkontrolovat mladistveho
  // :TODO: zkontrolovat vyplnene cele narozeni pokud je vybrana kategorie vek.presne

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

  if (prihlaska.startCislo) {
    const kandidati = await findUcasti({
      rok,
      startCislo: prihlaska.startCislo,
      typ
    });
    if (kandidati.length > 1 || (kandidati.length === 1 && kandidati[0].id !== id)) {
      const { jmeno, prijmeni } = kandidati[0].ucasti[0].udaje;
      return {
        code: Actions.CODE_DUPLICIT_START_CISLO,
        status: `Startovní číslo ${
          prihlaska.startCislo
        } je již obsazené v kategorii ${typ} účastníkem: ${prijmeni} ${jmeno}`
      };
    }
  }

  ucast.prihlaska = prihlaska;
  await ucastnik.save();
  const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Prihlaska in future
  return { broadcast, code: Actions.CODE_OK, status: 'uloženo v pořádku' };
};

module.exports = savePrihlaska;
