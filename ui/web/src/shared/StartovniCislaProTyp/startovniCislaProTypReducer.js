import moment from 'moment';
import { AKTUALNI_ROK } from '../../constants';
import { getTypKategorie } from '../../entities/rocniky/rocnikyReducer';

export const getStartovniCislaProTyp = ({
  odstartovani,
  rok = AKTUALNI_ROK,
  typ,
  kategorie,
  ucastnici,
}) => {
  const results = [];

  ucastnici.allIds.forEach((id) => {
    const ucastnik = ucastnici.byIds[id];
    if (ucastnik[rok]) {
      const { prihlaska, vykon } = ucastnik[rok];

      if (odstartovani && vykon && vykon.startCislo) {
        const { cas, dokonceno, kategorie: kategorieId, startCislo } = vykon;
        if (typ === kategorie[kategorieId].typ) {
          const result = { id, dokonceno, startCislo };
          if (cas) {
            result.cas = moment.duration(cas);
          }
          results.push(result);
        }
      } else if (!odstartovani && prihlaska && prihlaska.startCislo) {
        const { kategorie: kategorieId, startCislo } = prihlaska;
        if (typ === kategorie[kategorieId].typ) {
          results.push({ id, startCislo });
        }
      }
    }
  });

  return results.sort((a, b) => a.startCislo - b.startCislo);
};

// Looks for startCislo and also id (so that it won't mark itself).
export const isStartCisloTaken = ({
  id,
  odstartovani,
  rok = AKTUALNI_ROK,
  startCislo,
  typ,
  kategorie,
  ucastnici,
}) =>
  !!getStartovniCislaProTyp({ odstartovani, rok, typ, kategorie, ucastnici }).find(
    (startovniCislo) => startovniCislo.startCislo === startCislo && startovniCislo.id !== id
  );

const findStartCislo = (startovniCisla, startCislo) =>
  startovniCisla.find((element) => element.startCislo === startCislo);

const populateRange = (start, end) => {
  if (end >= start) {
    return Array(end - start + 1)
      .fill(1)
      .map((val, index) => start + index);
  }
  return Array(start - end + 1)
    .fill(1)
    .map((val, index) => start - index);
};

export const getStartovniCislaProTypVsechna = ({
  odstartovani,
  rok = AKTUALNI_ROK,
  typ,
  kategorie,
  rocniky,
  ucastnici,
}) => {
  const typKategorie = getTypKategorie({ rok, typ, rocniky });
  const { startCisla: povolenaStartovniCisla } = typKategorie;
  if (!povolenaStartovniCisla) {
    return [];
  }

  const startovniCisla = getStartovniCislaProTyp({ odstartovani, rok, typ, kategorie, ucastnici });
  const results = [];
  povolenaStartovniCisla.rozsahy.forEach((rozsah) => {
    let range = [];

    const parsed = rozsah.match(/(\d+)-(\d+)/);
    if (parsed) {
      range = populateRange(parseInt(parsed[1], 10), parseInt(parsed[2], 10));
    } else {
      range = [parseInt(rozsah, 10)];
    }
    const result = range.map(
      (cislo) => findStartCislo(startovniCisla, cislo) || { startCislo: cislo }
    );
    results.push(...result);
  });

  return results;
};
