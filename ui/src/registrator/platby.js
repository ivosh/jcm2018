import moment from 'moment';
import { AKTUALNI_ROK, DEN_ZAVODU } from '../constants';
import { getTypKategorie } from '../entities/rocniky/rocnikyReducer';

export const provedenePlatby = platby => {
  const result = platby.map(({ datum, ...platba }) => ({
    datum: moment.utc(datum).format('D. M. YYYY'),
    ...platba
  }));
  const suma = result.reduce((sum, platba) => sum + platba.castka, 0);

  return { platby: result, suma };
};

// Přihláška can contain either kategorie(id) or typ. Consider both.
export const predepsaneStartovne = ({ kategorie, prihlaska, rocniky, rok = AKTUALNI_ROK }) => {
  let typ = null;
  if (prihlaska) {
    ({ typ } = prihlaska);
    if (!typ && prihlaska.kategorie) {
      ({ typ } = kategorie[prihlaska.kategorie]);
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
  } else if (DEN_ZAVODU) {
    polozky.push({ castka: startovne.naMiste, duvod: 'na místě' });
  } else {
    polozky.push({ castka: startovne.predem, duvod: 'předem' });
  }
  if (startovne.zaloha) {
    polozky.push({ castka: startovne.zaloha, duvod: 'záloha' });
  }

  const suma = polozky.reduce((sum, polozka) => sum + polozka.castka, 0);
  return { polozky, suma };
};
