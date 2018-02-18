import moment from 'moment';
import { AKTUALNI_ROK } from '../../constants';
import { getTypKategorie } from '../../entities/rocniky/rocnikyReducer';

const findStartCislo = (startujici, startCislo) =>
  startujici.find(element => element.startCislo === startCislo);

export const getStartujiciProTyp = ({
  prihlasky,
  rok = AKTUALNI_ROK,
  typ,
  kategorie,
  ucastnici
}) => {
  const results = [];

  ucastnici.allIds.forEach(id => {
    const ucastnik = ucastnici.byIds[id];
    if (ucastnik[rok]) {
      const { prihlaska, vykon } = ucastnik[rok];

      if (prihlasky && prihlaska && prihlaska.startCislo) {
        const { kategorie: kategorieId, startCislo } = prihlaska;
        if (typ === kategorie[kategorieId].typ) {
          results.push({ id, startCislo });
        }
      } else if (vykon && vykon.startCislo) {
        const { cas, dokonceno, kategorie: kategorieId, startCislo } = vykon;
        if (typ === kategorie[kategorieId].typ) {
          const result = { id, dokonceno, startCislo };
          if (cas) {
            result.cas = moment.duration(cas);
          }
          results.push(result);
        }
      }
    }
  });

  return results.sort((a, b) => a.startCislo - b.startCislo);
};

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

export const getStartCislaProTyp = ({
  prihlasky,
  rok = AKTUALNI_ROK,
  typ,
  kategorie,
  rocniky,
  ucastnici
}) => {
  const typKategorie = getTypKategorie({ rok, typ, rocniky });
  if (!typKategorie) {
    return []; // Initial render() when fetchRocniky has not yet even started.
  }
  const { startCisla } = typKategorie;
  if (!startCisla) {
    return [];
  }

  const startujici = getStartujiciProTyp({ prihlasky, rok, typ, kategorie, ucastnici });
  const results = [];
  startCisla.rozsahy.forEach(rozsah => {
    let range = [];

    const parsed = rozsah.match(/(\d+)-(\d+)/);
    if (parsed) {
      range = populateRange(parseInt(parsed[1], 10), parseInt(parsed[2], 10));
    } else {
      range = [parseInt(rozsah, 10)];
    }
    const result = range.map(cislo => findStartCislo(startujici, cislo) || { startCislo: cislo });
    results.push(...result);
  });

  return results;
};

export const decorareStartujici = (startujici, filter, onClick) =>
  startujici.map(jeden => (filter(jeden) ? { ...jeden, onClick: () => onClick(jeden) } : jeden));
