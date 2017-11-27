'use strict';

const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');
const common = require('../../common/common');
const db = require('../db');
const findAllRocniky = require('../api/Rocnik/findAllRocniky');
const Kategorie = require('./Kategorie/Kategorie');
const Rocnik = require('./Rocnik/Rocnik');
const Ucastnik = require('./Ucastnik/Ucastnik');

const convertNazevTypuKategorie = nazev => {
  if (nazev === 'beh') {
    return 'maraton';
  } else if (nazev === 'kolobezka') {
    return 'koloběžka';
  } else if (nazev === 'pesi') {
    return 'pěší';
  }
  return nazev;
};

const processPohlavi = pohlavi => {
  if (pohlavi === 'muz') {
    return 'muž';
  } else if (pohlavi === 'zena') {
    return 'žena';
  }

  throw new Error(`Co to je za pohlaví? ${pohlavi}`);
};

const vytvorUbytovaniRocniku = rocnik => {
  const list = [];

  if (rocnik.ubytovaniPaSo) {
    const patecni = { den: 'pátek', poplatek: rocnik.ubytovaniPaSo[0] };
    list.push(patecni);
  }

  if (rocnik.ubytovaniSoNe) {
    const sobotni = { den: 'sobota', poplatek: rocnik.ubytovaniSoNe[0] };
    list.push(sobotni);
  }

  return list.length > 0 ? list : undefined;
};

const najdiCiUlozKategorii = async kategorie => {
  const { vek, ...query } = kategorie;
  if (vek && vek.min) {
    query['vek.min'] = vek.min;
  }
  if (vek && vek.max) {
    query['vek.max'] = vek.max;
  }
  if (vek && vek.presne) {
    query['vek.presne'] = vek.presne;
  }

  const nalezene = await Kategorie.find(query);
  if (nalezene.length > 0) {
    if (nalezene.length > 1) {
      throw new Error('Nalezl jsem více než jednu kategorii?');
    }
    return nalezene[0].id;
  }

  const ulozena = new Kategorie(kategorie);
  await ulozena.save();
  return ulozena.id;
};

const processKategorie = async (typ, xmlKategorie) => {
  const kategorie = { typ };

  if (xmlKategorie.pohlavi !== undefined) {
    kategorie.pohlavi = processPohlavi(xmlKategorie.pohlavi[0]);
  }

  if (
    xmlKategorie.minVek !== undefined ||
    xmlKategorie.maxVek !== undefined ||
    xmlKategorie.presnyVek
  ) {
    kategorie.vek = {};
  }
  if (xmlKategorie.minVek !== undefined) {
    const [min] = xmlKategorie.minVek;
    kategorie.vek.min = min;
  }
  if (xmlKategorie.maxVek !== undefined) {
    const [max] = xmlKategorie.maxVek;
    kategorie.vek.max = max;
  }
  if (xmlKategorie.presnyVek) {
    kategorie.vek.presne = true;
  }

  return najdiCiUlozKategorii(kategorie);
};

/* Process kategorieList sequentially so that Kategorie can be unique. */
const processKategorieList = async (typ, xmlKategorieList) => {
  if (xmlKategorieList && xmlKategorieList.length > 0) {
    const kategorie = [];
    // TODO: This should be eventually rewritten with async iteration: for await (const x of xy).
    // eslint-disable-next-line no-restricted-syntax
    for (const xmlKategorie of xmlKategorieList) {
      // eslint-disable-next-line no-await-in-loop
      kategorie.push(await processKategorie(typ, xmlKategorie));
    }

    return kategorie;
  }

  return [await najdiCiUlozKategorii({ typ })];
};

const processTypKategorie = async xmlTyp => {
  const nazev = convertNazevTypuKategorie(xmlTyp.typ[0]);
  const [predem] = xmlTyp.startovne[0].predem;
  const [naMiste] = xmlTyp.startovne[0].naMiste;
  const kategorie = await processKategorieList(nazev, xmlTyp.kategorie);

  const typ = { typ: nazev, kategorie, maStartCisla: false, startovne: { predem, naMiste } };

  if (xmlTyp.startCisla) {
    typ.maStartCisla = true;
    const [startCisla] = xmlTyp.startCisla;
    typ.startCisla = startCisla;
  }

  return typ;
};

const processRocnik = async xmlRocnik => {
  const [rok] = xmlRocnik.rok;
  const [datum] = xmlRocnik.datum;
  const ubytovani = vytvorUbytovaniRocniku(xmlRocnik);
  const kategorie = await Promise.all(
    xmlRocnik.typKategorie.map(async xmlTyp => processTypKategorie(xmlTyp))
  );

  const rocnik = new Rocnik({ rok, datum, ubytovani, kategorie });
  await rocnik.save();
  return rocnik.id;
};

/* Process rocniky sequentially so that Kategorie can be unique. */
const processRocniky = async rocniky => {
  // TODO: This should be eventually rewritten with async iteration: for await (const x of xy).
  // eslint-disable-next-line no-restricted-syntax
  for (const rocnik of rocniky) {
    // eslint-disable-next-line no-await-in-loop
    await processRocnik(rocnik);
  }
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const processNarozeni = narozeni => {
  if (narozeni.length === 4) {
    return { rok: narozeni };
  }

  const matcher = /(\d{4})-(\d{1,2})-(\d{1,2})$/;
  const result = matcher.exec(narozeni);

  return { rok: result[1], mesic: result[2], den: result[3] };
};

const processUdaje = udaje => {
  const ret = {
    prijmeni: udaje.prijmeni[0],
    jmeno: udaje.jmeno[0],
    narozeni: processNarozeni(udaje.narozen[0]),
    pohlavi: processPohlavi(udaje.pohlavi[0]),
    obec: udaje.mesto[0],
    stat: udaje.stat[0]
  };

  if (udaje.adresa) {
    const [adresa] = udaje.adresa;
    ret.adresa = adresa;
  }
  if (udaje.PSC) {
    const [psc] = udaje.PSC;
    ret.psc = psc;
  }
  if (udaje.klub) {
    const [klub] = udaje.klub;
    ret.klub = klub;
  }
  if (udaje.email[0]) {
    const [email] = udaje.email;
    ret.email = email;
  }
  if (udaje.telefon[0]) {
    const [telefon] = udaje.telefon;
    ret.telefon = telefon;
  }

  return ret;
};

const processPrihlaska = async (rocniky, xmlPrihlaska, xmlUcast, rok, pohlavi, narozeni) => {
  const typ = (xmlPrihlaska && xmlPrihlaska.kategorie[0]) || xmlUcast.vykon[0].kategorie[0];
  const { kategorie, code, status } = common.findKategorie(rocniky, {
    rok,
    typ: convertNazevTypuKategorie(typ),
    pohlavi,
    narozeni,
    mladistvyPotvrzen: true
  });
  if (code !== common.CODE_OK) {
    throw new Error(`${code} - ${status}`);
  }

  const datum = (xmlPrihlaska && new Date(xmlPrihlaska.datum[0])) || rocniky[rok].datum;
  return {
    datum, // ISO 8601 date-only strings are treated as UTC, not local.
    kategorie: kategorie.id
  };
};

const vytvorUbytovaniUcastnika = (prihlaska, ucast) => {
  const list = [];

  const patecni = { den: 'pátek' };
  if (prihlaska && prihlaska.ubytovaniPaSo !== undefined) {
    patecni.prihlaseno = true;
  }
  if (ucast && ucast.ubytovaniPaSo !== undefined) {
    patecni.absolvovano = true;
  }
  if (patecni.prihlaseno || patecni.absolvovano) {
    list.push(patecni);
  }

  const sobotni = { den: 'sobota' };
  if (prihlaska && prihlaska.ubytovaniSoNe) {
    sobotni.prihlaseno = true;
  }
  if (ucast && ucast.ubytovaniSoNe) {
    sobotni.absolvovano = true;
  }
  if (sobotni.prihlaseno || sobotni.absolvovano) {
    list.push(sobotni);
  }

  return list.length > 0 ? list : undefined;
};

const processZajem = async (rocniky, zajem, udaje) => {
  const rok = zajem.rok[0];
  const ucast = { rok, udaje };

  if (zajem.prihlaska || zajem.ucast) {
    ucast.prihlaska = await processPrihlaska(
      rocniky,
      zajem.prihlaska && zajem.prihlaska[0],
      zajem.ucast && zajem.ucast[0],
      rok,
      udaje.pohlavi,
      udaje.narozeni
    );
  }

  const ubytovani = vytvorUbytovaniUcastnika(
    (zajem.prihlaska && zajem.prihlaska[0]) || undefined,
    (zajem.ucast && zajem.ucast[0]) || undefined
  );
  if (ubytovani) {
    ucast.ubytovani = ubytovani;
  }

  if (zajem.poznamka) {
    const [poznamka] = zajem.poznamka;
    ucast.poznamka = poznamka;
  }

  return ucast;
};

const processZajmy = async (rocniky, zajmy, udaje) =>
  Promise.all(zajmy.map(async zajem => processZajem(rocniky, zajem, udaje)));

const processUcastnik = async (rocniky, ucastnik) => {
  const udaje = processUdaje(ucastnik.udaje[0]);
  if (ucastnik.zajem) {
    const ucastnikDB = new Ucastnik();
    ucastnikDB.ucasti = await processZajmy(rocniky, ucastnik.zajem, udaje);
    await ucastnikDB.save();
  }
};

const processUcastnici = async (rocniky, ucastnici) =>
  Promise.all(ucastnici.map(async ucastnik => processUcastnik(rocniky, ucastnik)));

const importFromXML = async fileOrData => {
  await db.dropDatabase();

  const parser = new xml2js.Parser({ mergeAttrs: true });

  let data = null;
  try {
    await util.promisify(fs.open(fileOrData, 'r'));
    data = await util.promisify(fs.readFile(fileOrData, 'utf8'));
  } catch (err) {
    data = fileOrData;
  }

  const result = await util.promisify(parser.parseString)(data);
  await processRocniky(result.jcm.rocnik);

  if (result.jcm.ucastnici) {
    const { code, status, response } = await findAllRocniky();
    if (code !== common.CODE_OK) {
      throw new Error(`${code} - ${status}`);
    }
    await processUcastnici(response, result.jcm.ucastnici[0].ucastnik);
  }
};

module.exports = importFromXML;
