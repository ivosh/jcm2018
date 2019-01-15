'use strict';

const {
  CODE_OK,
  CODE_NONEXISTING,
  CODE_NOT_ALLOWED,
  UCASTI_NA_POHAR
} = require('../../../../common/common');
const logger = require('../../../logger');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');
const broadcastUcastnik = require('../broadcastUcastnik');

/* Počet nepředaných pohárů = (počet dokončených účastí v typu kategorie maraton) / 5
                              - počet předaných pohárů. */
const poharPredan = async ({ request }) => {
  const { id } = request;

  let ucastnik;
  try {
    ucastnik = await Ucastnik.findById(id).populate('ucasti.prihlaska.kategorie');
  } catch (err) {
    logger.debug(`Účastník id ${id} not found.`);
    return { code: CODE_NONEXISTING, status: `Účastník s id ${id} neexistuje. Detaily: ${err}` };
  }

  if (!ucastnik) {
    return { code: CODE_NONEXISTING, status: `Účastník s id ${id} neexistuje.` };
  }
  logger.debug(`Účastník id ${id} found.`);
  logger.silly(`Účastník id ${id} found: ${ucastnik}`);

  const ucasti = ucastnik.ucasti.filter(
    ucast =>
      ucast.prihlaska.kategorie.typ === 'maraton' && ucast.vykon && ucast.vykon.dokonceno === true
  );
  logger.silly(`Nalezeny dokončené účasti v typu kategorie maraton: ${ucasti}.`);

  const narok = Math.floor(ucasti.length / UCASTI_NA_POHAR || 0);
  const predano = (ucastnik.pohar && ucastnik.pohar.predano) || 0;
  if (predano < narok) {
    logger.silly(
      `Účastník s id ${id} má celkem ${
        ucasti.length
      } dokončených účastí v typu kategorie maraton (tedy nárok ${narok}) a jen ${predano} pohárů předaných.`
    );
    logger.debug(`Předán pohár účastníkovi s id ${id}.`);
    if (ucastnik.pohar) {
      ucastnik.pohar.predano += 1;
    } else {
      ucastnik.pohar = { predano: 1 };
    }
    await ucastnik.save();
    const broadcast = await broadcastUcastnik(id); // :TODO: could broadcast only Pohar in future.
    return { broadcast, code: CODE_OK, status: 'uloženo v pořádku' };
  }

  logger.silly(
    `Účastník s id ${id} má celkem ${
      ucasti.length
    } dokončených účastí v typu kategorie maraton (tedy nárok ${narok}) a už ${predano} pohárů předaných.`
  );
  return {
    code: CODE_NOT_ALLOWED,
    status: `Účastník má celkem ${
      ucasti.length
    } dokončených účastí v kategorii maraton (tedy nárok ${narok}) a už ${predano} pohárů předaných.`
  };
};

module.exports = poharPredan;
