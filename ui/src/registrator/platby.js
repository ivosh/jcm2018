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

export const predepsaneStartovne = ({
  jePrihlaskou,
  kategorie,
  platby,
  prihlaska,
  rocniky,
  rok = AKTUALNI_ROK
}) => {
  // Přihláška can contain either kategorie(id) or typ. Consider both.
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
  } else {
    /* Předem lze pouze v těchto případech:
       - zaplaceno alespoň tolik jako startovné předem
         a alespoň jedna platba provedena před datem konání
       - nebo nejsou žádné platby, datum přihlášení je před datem konání
         a je nastaven příznak "jePrihlaskou" */
    const datumKonani = rocniky.byRoky[rok].datum;
    const datumPrihlaseni = prihlaska.datum;

    if (platby && platby.length > 0) {
      const zaplaceno = platby.reduce((celkem, platba) => celkem + platba.castka, 0);
      const vcasnaData = platby.filter(
        platba => new Date(platba.datum).getTime() < new Date(datumKonani).getTime()
      );
      if (zaplaceno >= startovne.predem && vcasnaData.length > 0) {
        polozky.push({ castka: startovne.predem, duvod: 'předem' });
      } else {
        polozky.push({ castka: startovne.naMiste, duvod: 'na místě' });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (jePrihlaskou && new Date(datumPrihlaseni).getTime() < new Date(datumKonani).getTime()) {
        polozky.push({ castka: startovne.predem, duvod: 'předem' });
      } else {
        polozky.push({ castka: startovne.naMiste, duvod: 'na místě' });
      }
    }
  }
  if (startovne.zaloha) {
    polozky.push({ castka: startovne.zaloha, duvod: 'záloha' });
  }

  const suma = polozky.reduce((sum, polozka) => sum + polozka.castka, 0);
  return { polozky, suma };
};
