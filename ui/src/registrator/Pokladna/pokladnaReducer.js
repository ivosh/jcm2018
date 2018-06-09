import { PLATBA_TYPY } from '../../common';
import { AKTUALNI_ROK } from '../../constants';
import { getTypKategorie } from '../../entities/rocniky/rocnikyReducer';
import { getUcastiProRok } from '../../entities/ucastnici/ucastniciReducer';

// eslint-disable-next-line import/prefer-default-export
export const getPokladna = ({ kategorie, rocniky, ucastnici, rok = AKTUALNI_ROK }) => {
  const ucasti = getUcastiProRok({ rok, ucastnici });

  const populated = ucasti.map(jeden => {
    const {
      id,
      ucast: {
        prihlaska: { kategorie: kategorieId, startovnePoSleve },
        vykon,
        platby: platbyOriginal
      }
    } = jeden;
    const { typ } = kategorie[kategorieId];

    let platby = platbyOriginal;
    let zaloha;
    if (vykon) {
      if (startovnePoSleve === 0) {
        platby = [...platbyOriginal, { castka: 0, typ: PLATBA_TYPY[0] }];
      }

      const { startovne } = getTypKategorie({ rok, typ, rocniky });
      ({ zaloha } = startovne);
    }
    return { id, kategorie: kategorie[kategorieId], platby, zaloha };
  });

  const pokladna = { suma: 0, ucastniku: 0, typy: {} };
  populated.forEach(({ kategorie: { typ: typKategorie }, platby, zaloha }) => {
    if (!pokladna.typy[typKategorie]) {
      pokladna.typy[typKategorie] = { suma: 0, ucastniku: 0, typy: {} };
    }
    if (platby.length > 0) {
      pokladna.typy[typKategorie].ucastniku += 1;
      pokladna.ucastniku += 1;
    }

    platby.forEach(({ castka, typ: typPlatby }) => {
      if (!pokladna.typy[typKategorie].typy[typPlatby]) {
        pokladna.typy[typKategorie].typy[typPlatby] = { counts: {}, suma: 0 };
      }

      if (pokladna.typy[typKategorie].typy[typPlatby].counts[castka] === undefined) {
        pokladna.typy[typKategorie].typy[typPlatby].counts[castka] = 0;
      }

      pokladna.typy[typKategorie].typy[typPlatby].counts[castka] += 1;
      pokladna.typy[typKategorie].typy[typPlatby].suma += castka;
      pokladna.typy[typKategorie].suma += castka;
      pokladna.suma += castka;
    });

    if (zaloha) {
      if (!pokladna.typy[typKategorie].zaloha) {
        pokladna.typy[typKategorie].zaloha = { count: 0, suma: 0 };
      }
      pokladna.typy[typKategorie].zaloha.count += 1;
      pokladna.typy[typKategorie].zaloha.suma += zaloha;

      if (!pokladna.zaloha) {
        pokladna.zaloha = { count: 0, suma: 0 };
      }
      pokladna.zaloha.count += 1;
      pokladna.zaloha.suma += zaloha;
    }
  });

  return pokladna;
};
