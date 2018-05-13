import moment from 'moment';
import { convertDuration } from '../../../Util';

const zeroDuration = moment.duration(0).toJSON();

export const initialState = {
  base: null, // a Date when running
  delta: zeroDuration, // a duration when not running
  mezicasy: [], // Mezicas = { cas, korekce }
  running: false
};

const sortByCas = mezicasy =>
  mezicasy.sort(
    (a, b) => moment.duration(a.cas).asMilliseconds() - moment.duration(b.cas).asMilliseconds()
  );

const stopkyProTypReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STOPKY_START':
      if (!state.running) {
        const base = new Date(
          action.now.getTime() - moment.duration(state.delta).valueOf()
        ).toJSON();
        return { ...state, running: true, base, delta: zeroDuration };
      }
      return state;
    case 'STOPKY_STOP': {
      if (state.running) {
        const delta = moment
          .duration(action.now.getTime() - new Date(state.base).getTime())
          .toJSON();
        return { ...state, running: false, base: null, delta };
      }
      return state;
    }
    case 'STOPKY_MEZICAS':
      if (state.running) {
        const cas = moment.duration(action.now.getTime() - new Date(state.base).getTime()).toJSON();
        const mezicasy = (state.mezicasy || []).slice();
        mezicasy.push({ cas });
        sortByCas(mezicasy);
        return { ...state, mezicasy };
      }
      return state;
    case 'STOPKY_CHANGE': {
      if (state.running) {
        return { ...state, base: new Date(new Date(state.base).getTime() - action.step).toJSON() };
      }
      if (action.step >= 0) {
        return {
          ...state,
          delta: moment
            .duration(state.delta)
            .add(action.step)
            .toJSON()
        };
      }

      const delta = moment.duration(state.delta).subtract(-action.step);
      if (delta >= 0) {
        return { ...state, delta: delta.toJSON() };
      }
      return state;
    }
    default:
      return state;
  }
};

export default stopkyProTypReducer;

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

  const ucastisVykonem = ucasti.filter(ucast => {
    if (ucast.vykon) {
      const jednaKategorie = kategorie[ucast.vykon.kategorie];
      return jednaKategorie.typ === stopky.typ;
    }
    return false;
  });

  ucastisVykonem.forEach(ucast => {
    mezicasy.push({ id: ucast.id, cas: ucast.vykon.cas, startCislo: ucast.vykon.startCislo });
  });

  return sortByCas(mezicasy);
};
