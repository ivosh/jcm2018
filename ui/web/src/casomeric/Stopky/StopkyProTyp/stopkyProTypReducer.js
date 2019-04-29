import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import { casSortMethod } from 'ui-common/common';

export const getCudly = () => [
  { popisek: '+10', step: 10 * 60 * 60 * 1000 },
  { popisek: '+1', step: 60 * 60 * 1000 },
  { popisek: '+10', step: 10 * 60 * 1000 },
  { popisek: '+1', step: 60 * 1000 },
  { popisek: '+10', step: 10 * 1000 },
  { popisek: '+1', step: 1000 },
  { popisek: '+10', step: 100 },
  { popisek: '+1', step: 10 },
  { popisek: '-10', step: -10 * 60 * 60 * 1000 },
  { popisek: '-1', step: -60 * 60 * 1000 },
  { popisek: '-10', step: -10 * 60 * 1000 },
  { popisek: '-1', step: -60 * 1000 },
  { popisek: '-10', step: -10 * 1000 },
  { popisek: '-1', step: -1000 },
  { popisek: '-10', step: -100 },
  { popisek: '-1', step: -10 }
];

const zeroDuration = moment.duration(0).toJSON();
const initialState = {
  base: null, // a Date when running
  delta: zeroDuration, // a duration when not running
  mezicasy: [], // Mezicas = { cas, korekce }
  running: false,
  typ: null // supplied by the caller
};

export const getStopkyByTyp = ({ state, typ }) => {
  const stopky = state.entities.stopky.byTypy[typ] || initialState;
  return { ...stopky, typ };
};

const typy = { maraton: 1, půlmaraton: 1, cyklo: 1, koloběžka: 1 };

export const getRozdily = ({ state, typ }) => {
  const stopky = getStopkyByTyp({ state, typ });
  const { [typ]: _, ...ostatni } = typy;

  return Object.keys(ostatni).map(jeden => {
    const ostatniStopky = getStopkyByTyp({ state, typ: jeden });

    let rozdil = null;
    if (stopky.running === true && ostatniStopky.running === true) {
      rozdil = moment.duration(
        Math.abs(new Date(stopky.base).getTime() - new Date(ostatniStopky.base).getTime())
      );
    } else if (stopky.running === false && ostatniStopky.running === false) {
      rozdil = moment.duration(stopky.delta);
      const duration = moment.duration(ostatniStopky.delta);
      if (rozdil.asMilliseconds() >= duration.asMilliseconds()) {
        rozdil.subtract(duration);
      } else {
        duration.subtract(rozdil);
        rozdil = duration;
      }
    }

    return { name: jeden, rozdil: convertDuration(rozdil) };
  });
};

export const getMezicasy = ({ kategorie, stopky, ucasti }) => {
  const mezicasy = [];
  if (stopky.mezicasy) {
    stopky.mezicasy.forEach(mezicas => {
      mezicasy.push({ cas: mezicas.cas });
    });
  }

  const ucastisVykonem = ucasti.filter(jeden => {
    const { ucast } = jeden;
    if (ucast.vykon && ucast.vykon.dokonceno) {
      const jednaKategorie = kategorie[ucast.vykon.kategorie];
      return jednaKategorie.typ === stopky.typ;
    }
    return false;
  });

  ucastisVykonem.forEach(jeden => {
    const { id, ucast } = jeden;
    const { cas, dokonceno, startCislo } = ucast.vykon;
    mezicasy.push({ id, cas, dokonceno, startCislo });
  });

  return mezicasy.sort(casSortMethod);
};
