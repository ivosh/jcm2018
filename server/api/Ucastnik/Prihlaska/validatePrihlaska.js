'use strict';

const util = require('util');
const {
  CODE_DUPLICIT_KOD,
  CODE_DUPLICIT_START_CISLO,
  CODE_KATEGORIE_INVALID,
  CODE_NONEXISTING,
  CODE_OK,
  findKategorie,
} = require('../../../../common/common');
const Ucastnik = require('../../../model/Ucastnik/Ucastnik');

const deepPrint = (obj) => util.inspect(obj, { depth: null });

const findUcastiProStartCislo = async ({ rok, startCislo, typ }) => {
  const ucastnici = await Ucastnik.find({
    'ucasti.rok': rok,
    ucasti: {
      $elemMatch: { rok, prihlaska: { $exists: true }, 'prihlaska.startCislo': startCislo },
    },
  }).populate({
    path: 'ucasti.prihlaska.kategorie',
  });

  return ucastnici.filter((ucastnik) => {
    const ucast = ucastnik.ucasti.find((jednaUcast) => jednaUcast.rok === rok);
    return (ucast && ucast.prihlaska.kategorie.typ === typ) || false;
  });
};

const findUcastiProKod = async ({ rok, kod }) => {
  const ucastnici = await Ucastnik.find({
    'ucasti.rok': rok,
    ucasti: {
      $elemMatch: { rok, prihlaska: { $exists: true }, 'prihlaska.kod': kod },
    },
  });

  return ucastnici.filter((ucastnik) =>
    ucastnik.ucasti.find((jednaUcast) => jednaUcast.rok === rok)
  );
};

// const { kategorie, rocniky } = await findAllRocniky();
const validatePrihlaska = async ({ id, rok, ucast, prihlaska, kategorie, rocniky, ...request }) => {
  // :TODO: zkontrolovat mladistveho
  // :TODO: zkontrolovat vyplnene cele narozeni pokud je vybrana kategorie vek.presne

  if (!prihlaska) {
    return { code: CODE_NONEXISTING, status: 'Přihláška není vyplněna.' };
  }

  if (!kategorie[prihlaska.kategorie]) {
    return {
      code: CODE_NONEXISTING,
      status: `Kategorie id '${prihlaska.kategorie}' neexistuje.`,
    };
  }

  const udaje = request.udaje || ucast.udaje;
  const { typ } = kategorie[prihlaska.kategorie];
  const found = findKategorie(rocniky, {
    rok,
    typ,
    pohlavi: udaje.pohlavi,
    narozeni: udaje.narozeni,
    mladistvyPotvrzen: prihlaska.mladistvyPotvrzen,
  });
  if (found.code !== CODE_OK) {
    return {
      code: found.code,
      status: found.status,
    };
  }

  if (!found.kategorie.id.equals(prihlaska.kategorie)) {
    return {
      code: CODE_KATEGORIE_INVALID,
      status: `Chybně vybraná kategorie id ${prihlaska.kategorie} oproti správné ${
        found.kategorie.id
      }. Detaily: ${deepPrint(kategorie[prihlaska.kategorie])} vs. ${deepPrint(found.kategorie)}`,
    };
  }

  if (prihlaska.startCislo) {
    const kandidati = await findUcastiProStartCislo({
      rok,
      startCislo: prihlaska.startCislo,
      typ,
    });
    if (kandidati.length > 1 || (kandidati.length === 1 && kandidati[0].id !== id)) {
      const { jmeno, prijmeni } = kandidati[0].ucasti[0].udaje;
      return {
        code: CODE_DUPLICIT_START_CISLO,
        status: `Startovní číslo ${prihlaska.startCislo} je již obsazené v kategorii ${typ} účastníkem: ${prijmeni} ${jmeno}`,
      };
    }
  }

  if (prihlaska.kod) {
    const kandidati = await findUcastiProKod({ rok, kod: prihlaska.kod });
    if (kandidati.length > 1 || (kandidati.length === 1 && kandidati[0].id !== id)) {
      const { jmeno, prijmeni } = kandidati[0].ucasti[0].udaje;
      return {
        code: CODE_DUPLICIT_KOD,
        status: `Kód přihlášky ${prihlaska.kod} je již obsazen účastníkem: ${prijmeni} ${jmeno}`,
      };
    }
  }

  return { code: CODE_OK };
};

module.exports = validatePrihlaska;
