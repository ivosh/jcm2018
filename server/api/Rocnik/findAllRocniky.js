'use strict';

const Actions = require('../../../common/common');
const Rocnik = require('../../model/Rocnik/Rocnik');

const normalizeUbytovani = ubytovani => {
  const normalized = {};

  ubytovani.forEach(element => {
    const { den, poplatek } = element;
    normalized[den] = poplatek;
  });

  return normalized;
};

const normalizeKategorie = kategorieList => {
  let normalized = {};

  kategorieList.forEach(element => {
    const { _id, __v, pohlavi, ...kategorieBezPohlavi } = element;
    const kategorie = { id: _id, pohlavi, ...kategorieBezPohlavi };
    if (pohlavi) {
      if (!normalized[pohlavi]) {
        normalized[pohlavi] = [];
      }
      normalized[pohlavi].push(kategorie);
    } else {
      normalized = kategorie;
    }
  });

  return normalized;
};

const normalizeTypyKategorii = typyKategorii => {
  const normalized = {};

  typyKategorii.forEach(element => {
    const { kategorie, typ, ...typBezKategorii } = element;
    const typKategorie = { ...normalizeKategorie(kategorie), ...typBezKategorii };
    normalized[typ] = typKategorie;
  });

  return normalized;
};

const normalizeRocniky = rocniky => {
  const normalized = {};

  rocniky.forEach(element => {
    const { rok, __v, _id, kategorie, ubytovani, ...rocnikBezRoku } = element;
    const rocnik = {
      id: _id,
      kategorie: normalizeTypyKategorii(kategorie),
      ...rocnikBezRoku
    };

    if (ubytovani.length > 0) {
      rocnik.ubytovani = normalizeUbytovani(ubytovani);
    }

    normalized[rok] = rocnik;
  });

  return normalized;
};

const findAllRocniky = async () => {
  const found = await Rocnik.find()
    .populate('kategorie.kategorie')
    .lean();
  const rocniky = normalizeRocniky(found);

  return { code: Actions.CODE_OK, status: undefined, response: rocniky };
};

module.exports = findAllRocniky;
