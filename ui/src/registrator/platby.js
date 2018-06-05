import moment from 'moment';
import { AKTUALNI_ROK } from '../constants';
import { getTypKategorie } from '../entities/rocniky/rocnikyReducer';

export const provedenePlatby = platby => {
  const result = platby.map(({ datum, ...platba }) => ({
    datum: moment.utc(datum).format('D. M. YYYY'),
    ...platba
  }));
  const suma = result.reduce((sum, platba) => sum + platba.castka, 0);

  return { platby: result, suma };
};

export const predepsaneStartovne = ({ kategorie, prihlaska, rocniky, rok = AKTUALNI_ROK }) => {
  // Přihláška can contain either kategorie(id) or typ. Consider both.
  let typ = null;
  if (prihlaska) {
    ({ typ } = prihlaska); // eslint-disable-line no-param-reassign
    if (!typ && prihlaska.kategorie) {
      ({ typ } = kategorie[prihlaska.kategorie]); // eslint-disable-line no-param-reassign
    }
  }
  if (!typ) {
    return { suma: 0, polozky: [] };
  }

  const typKategorieRocniku = getTypKategorie({ rok, typ, rocniky });
  const { startovne } = typKategorieRocniku;
  const polozky = [];
  if (prihlaska.startovnePoSleve >= 0) {
    polozky.push({ castka: prihlaska.startovnePoSleve, duvod: 'po slevě' });
  } else {
    /* Předem lze pouze pokud datum přihlášení je před datem konání. */
    const datumKonani = rocniky.byRoky[rok].datum;
    const datumPrihlaseni = prihlaska.datum;

    if (new Date(datumPrihlaseni).getTime() < new Date(datumKonani).getTime()) {
      polozky.push({ castka: startovne.predem, duvod: 'předem' });
    } else {
      polozky.push({ castka: startovne.naMiste, duvod: 'na místě' });
    }
  }
  if (startovne.zaloha) {
    polozky.push({ castka: startovne.zaloha, duvod: 'záloha' });
  }

  const suma = polozky.reduce((sum, polozka) => sum + polozka.castka, 0);
  return { polozky, suma };
};
