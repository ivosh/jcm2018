import deepFreeze from 'deep-freeze';
import moment from 'moment';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import {
  getStartCislaProTyp,
  getStartujiciProTyp,
  isStartCisloTaken
} from './startujiciProTypReducer';

const state = JSON.parse(JSON.stringify(ucastniciTestData)); // deep copy
state.entities.rocniky.byRoky[2013].kategorie.maraton.startCisla.rozsahy = ['10-15', '23', '35-36'];
state.entities.rocniky.byRoky[2018].kategorie['koloběžka'].startCisla.rozsahy = ['15-10', '16'];

state.entities.ucastnici = {
  allIds: ['id1', 'id2', 'id3'],
  byIds: {
    id1: {
      roky: [2018, 2014, 2013],
      2013: {
        prihlaska: {
          kategorie: '5a587e1a051c181132cf83b8', // maraton
          startCislo: 13
        }
      },
      2014: {
        prihlaska: {
          kategorie: '5a587e1a051c181132cf83b8', // maraton
          startCislo: 9
        }
      },
      2018: {
        prihlaska: {
          kategorie: '5a587e1b051c181132cf83d0', // koloběžka
          startCislo: 15
        },
        vykon: {
          kategorie: '5a587e1b051c181132cf83d0', // koloběžka
          startCislo: 14,
          dokonceno: false
        }
      }
    },
    id2: {
      roky: [2018, 2013],
      2013: {
        prihlaska: {
          kategorie: '5a587e1a051c181132cf83b8', // maraton
          startCislo: 10
        },
        vykon: {
          kategorie: '5a587e1a051c181132cf83b8', // maraton
          startCislo: 12,
          dokonceno: true,
          cas: 'PT2H17M23.4S'
        }
      },
      2018: {
        prihlaska: {
          kategorie: '5a587e1a051c181132cf83b1' // pěší
        },
        vykon: {
          kategorie: '5a587e1a051c181132cf83b1', // pěší
          dokonceno: false
        }
      }
    },
    id3: {
      roky: [2018],
      2018: {
        prihlaska: {
          kategorie: '5a587e1b051c181132cf83d0', // koloběžka
          startCislo: 10
        },
        vykon: {
          kategorie: '5a587e1b051c181132cf83d0', // koloběžka
          startCislo: 10
        }
      }
    }
  }
};

it('getStartujiciProTyp - přihlášky 2013', () => {
  deepFreeze(state);
  const selected = [{ id: 'id2', startCislo: 10 }, { id: 'id1', startCislo: 13 }];

  expect(
    getStartujiciProTyp({ rok: 2013, typ: 'maraton', odstartovani: false, ...state.entities })
  ).toEqual(selected);
  expect(
    isStartCisloTaken({
      id: 'id4',
      odstartovani: false,
      rok: 2013,
      typ: 'maraton',
      startCislo: 10,
      ...state.entities
    })
  ).toBe(true);
  expect(
    isStartCisloTaken({
      id: 'id2',
      odstartovani: false,
      rok: 2013,
      typ: 'maraton',
      startCislo: 10,
      ...state.entities
    })
  ).toBe(false);
  expect(
    isStartCisloTaken({
      id: 'id4',
      odstartovani: false,
      rok: 2013,
      typ: 'maraton',
      startCislo: 11,
      ...state.entities
    })
  ).toBe(false);
});

it('getStartujiciProTyp - výkony 2013', () => {
  deepFreeze(state);
  const selected = [
    { id: 'id2', startCislo: 12, dokonceno: true, cas: moment.duration('PT2H17M23.4S') }
  ];

  expect(
    getStartujiciProTyp({ rok: 2013, typ: 'maraton', odstartovani: true, ...state.entities })
  ).toEqual(selected);
  expect(
    isStartCisloTaken({
      id: 'id4',
      odstartovani: true,
      rok: 2013,
      typ: 'maraton',
      startCislo: 12,
      ...state.entities
    })
  ).toBe(true);
  expect(
    isStartCisloTaken({
      id: 'id2',
      odstartovani: true,
      rok: 2013,
      typ: 'maraton',
      startCislo: 12,
      ...state.entities
    })
  ).toBe(false);
  expect(
    isStartCisloTaken({
      id: 'id4',
      odstartovani: true,
      rok: 2013,
      typ: 'maraton',
      startCislo: 11,
      ...state.entities
    })
  ).toBe(false);
});

it('getStartujiciProTyp - přihlášky 2018', () => {
  deepFreeze(state);
  const selected = [{ id: 'id3', startCislo: 10 }, { id: 'id1', startCislo: 15 }];

  expect(getStartujiciProTyp({ rok: 2018, typ: 'koloběžka', ...state.entities })).toEqual(selected);
});

it('getStartujiciProTyp - výkony 2018', () => {
  deepFreeze(state);
  const selected = [
    { id: 'id3', startCislo: 10, dokonceno: undefined },
    { id: 'id1', startCislo: 14, dokonceno: false }
  ];

  expect(
    getStartujiciProTyp({ rok: 2018, typ: 'koloběžka', odstartovani: true, ...state.entities })
  ).toEqual(selected);
});

it('getStartCislaProTyp - přihlášky 2013', () => {
  deepFreeze(state);
  const selected = [
    { id: 'id2', startCislo: 10 },
    { startCislo: 11 },
    { startCislo: 12 },
    { id: 'id1', startCislo: 13 },
    { startCislo: 14 },
    { startCislo: 15 },
    { startCislo: 23 },
    { startCislo: 35 },
    { startCislo: 36 }
  ];

  expect(
    getStartCislaProTyp({ rok: 2013, typ: 'maraton', odstartovani: false, ...state.entities })
  ).toEqual(selected);
});

it('getStartCislaProTyp - výkony 2013', () => {
  deepFreeze(state);
  const selected = [
    { startCislo: 10 },
    { startCislo: 11 },
    { id: 'id2', startCislo: 12, dokonceno: true, cas: moment.duration('PT2H17M23.4S') },
    { startCislo: 13 },
    { startCislo: 14 },
    { startCislo: 15 },
    { startCislo: 23 },
    { startCislo: 35 },
    { startCislo: 36 }
  ];

  expect(
    getStartCislaProTyp({ rok: 2013, typ: 'maraton', odstartovani: true, ...state.entities })
  ).toEqual(selected);
});

it('getStartCislaProTyp - přihlášky 2018', () => {
  deepFreeze(state);
  const selected = [
    { id: 'id1', startCislo: 15 },
    { startCislo: 14 },
    { startCislo: 13 },
    { startCislo: 12 },
    { startCislo: 11 },
    { id: 'id3', startCislo: 10 },
    { startCislo: 16 }
  ];

  expect(
    getStartCislaProTyp({ rok: 2018, typ: 'koloběžka', odstartovani: false, ...state.entities })
  ).toEqual(selected);
});

it('getStartCislaProTyp - výkony 2018', () => {
  deepFreeze(state);
  const selected = [
    { startCislo: 15 },
    { id: 'id1', startCislo: 14, dokonceno: false },
    { startCislo: 13 },
    { startCislo: 12 },
    { startCislo: 11 },
    { id: 'id3', startCislo: 10 },
    { startCislo: 16 }
  ];

  expect(
    getStartCislaProTyp({ rok: 2018, typ: 'koloběžka', odstartovani: true, ...state.entities })
  ).toEqual(selected);
});
