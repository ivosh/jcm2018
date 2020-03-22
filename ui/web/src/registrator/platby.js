import moment from 'moment';
import { AKTUALNI_ROK } from '../constants';
import { getTypKategorie } from '../entities/rocniky/rocnikyReducer';

export const provedenePlatby = (platby) => {
  const result = platby.map(({ datum, ...platba }) => ({
    datum: moment.utc(datum).format('D. M. YYYY'),
    ...platba,
  }));
  const suma = result.reduce((sum, platba) => sum + platba.castka, 0);

  return { platby: result, suma };
};

// Přihláška can contain either kategorie(id) or typ. Consider both.
const extractTyp = ({ kategorie, prihlaska }) => {
  if (prihlaska) {
    let { typ } = prihlaska;
    if (!typ && prihlaska.kategorie) {
      ({ typ } = kategorie[prihlaska.kategorie]);
    }
    return typ;
  }
  return null;
};

/* Ptáme se po posledním datu, kdy účastník zaplatil alespoň startovné předem.
   Zálohu může případně doplatit na místě bez přirážky. */
const getDatumPosledniDostatecnePlatby = ({ platby, startovnePredem }) => {
  if (!platby || platby.length === 0) {
    return null;
  }

  let suma = 0;
  let posledniDatum = null;
  platby.forEach((platba) => {
    if (suma < startovnePredem) {
      suma += platba.castka;
    }
    if (suma >= startovnePredem && !posledniDatum) {
      posledniDatum = platba.datum;
    }
  });

  return posledniDatum;
};

export const predepsaneStartovne = ({
  kategorie,
  prihlaska,
  platby,
  rocniky,
  rok = AKTUALNI_ROK,
}) => {
  const typ = extractTyp({ kategorie, prihlaska });
  if (!typ) {
    return { suma: 0, polozky: [] };
  }

  const typKategorieRocniku = getTypKategorie({ rok, typ, rocniky });
  const { startovne } = typKategorieRocniku;
  const polozky = [];
  if (prihlaska.startovnePoSleve >= 0) {
    polozky.push({ castka: prihlaska.startovnePoSleve, duvod: 'po slevě' });
  } else {
    /* Předem lze pouze pokud datum přihlášení je před uzávěrkou přihlášek a datum platby před
       uzávěrkou plateb za přihlášky. */
    const rocnik = rocniky.byRoky[rok];
    const datumKonani = rocniky.byRoky[rok].datum;
    const datumPrihlaseni = prihlaska.datum;
    const uzaverkaPrihlasek = rocnik.uzaverka.prihlasek;
    const uzaverkaPlatebPrihlasek = rocnik.uzaverka.platebPrihlasek;
    const datumPosledniDostatecnePlatby = getDatumPosledniDostatecnePlatby({
      platby,
      startovnePredem: startovne.predem,
    });

    if (
      datumPrihlaseni &&
      new Date(datumPrihlaseni).getTime() === new Date(datumKonani).getTime()
    ) {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě' });
    } else if (
      !datumPrihlaseni ||
      new Date(datumPrihlaseni).getTime() > new Date(uzaverkaPrihlasek).getTime()
    ) {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě (pozdní přihláška)' });
    } else if (!platby || platby.length === 0) {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě (žádná platba)' });
    } else if (!datumPosledniDostatecnePlatby) {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě (nedostatečná platba)' });
    } else if (
      new Date(datumPosledniDostatecnePlatby).getTime() >
      new Date(uzaverkaPlatebPrihlasek).getTime()
    ) {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě (pozdní platba)' });
    } else {
      polozky.push({ castka: startovne.predem, duvod: 'předem' });
    }
  }
  if (startovne.zaloha) {
    polozky.push({ castka: startovne.zaloha, duvod: 'záloha' });
  }

  const suma = polozky.reduce((sum, polozka) => sum + polozka.castka, 0);
  return { polozky, suma };
};
