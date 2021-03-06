'use strict';

const Actions = require('../../../common/common');
const Kategorie = require('../../model/Kategorie/Kategorie');
const Rocnik = require('../../model/Rocnik/Rocnik');

const normalizeKategorie = (kategorie) => {
  const normalized = {};

  kategorie.forEach((element) => {
    const { __v, _id, ...kategorieBezRoku } = element;
    const id = _id;
    normalized[id] = { id, ...kategorieBezRoku };
  });

  return normalized;
};

const normalizeKategorieProTyp = (kategorieList) => {
  let normalized = {};

  const zkratka = { muž: 1, žena: 1, bez: 1 };
  kategorieList.forEach((element) => {
    const { _id, __v, pohlavi, ...kategorieBezPohlavi } = element;
    const kategorie = { id: _id, pohlavi, ...kategorieBezPohlavi };
    if (pohlavi) {
      if (!normalized[pohlavi]) {
        normalized[pohlavi] = [];
      }
      kategorie.zkratka = `${zkratka[pohlavi]}${pohlavi.substring(0, 1).toUpperCase()}`;
      zkratka[pohlavi] += 1;
      normalized[pohlavi].push(kategorie);
    } else {
      kategorie.zkratka = kategorie.typ.substring(0, 1).toUpperCase();
      normalized = kategorie;
    }
  });

  return normalized;
};

const normalizeTypyKategorii = (typyKategorii) => {
  const normalized = {};

  typyKategorii.forEach((element) => {
    const { kategorie, typ, ...typBezKategorii } = element;
    const typKategorie = { ...normalizeKategorieProTyp(kategorie), ...typBezKategorii };
    normalized[typ] = typKategorie;
  });

  return normalized;
};

const normalizeRocniky = (rocniky) => {
  const normalized = {};

  rocniky.forEach((element) => {
    const { rok, __v, _id, kategorie, ...rocnikBezRoku } = element;
    const rocnik = {
      id: _id,
      kategorie: normalizeTypyKategorii(kategorie),
      ...rocnikBezRoku,
    };

    normalized[rok] = rocnik;
  });

  return normalized;
};

const findAllRocniky = async () => {
  const kategorie = await Kategorie.find().lean();
  const rocniky = await Rocnik.find().populate('kategorie.kategorie').lean();

  return {
    code: Actions.CODE_OK,
    status: undefined,
    response: { kategorie: normalizeKategorie(kategorie), rocniky: normalizeRocniky(rocniky) },
  };
};

module.exports = findAllRocniky;
