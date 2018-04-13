import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';

it('getPrihlaseni()', () => {
  const state = { ...ucastniciTestData };
  const selected = [
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15
    }
  ];
  deepFreeze(state);

  expect(getPrihlaseni({ ...state.entities })).toEqual(selected);
});

it('getOdstartovani()', () => {
  const state = { ...ucastniciTestData };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 15
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 11
    }
  ];
  deepFreeze(state);

  expect(getOdstartovani({ ...state.entities })).toEqual(selected);
});
