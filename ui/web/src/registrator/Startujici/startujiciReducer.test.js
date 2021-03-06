import deepFreeze from 'deep-freeze';
import { AKTUALNI_ROK } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';

it('getPrihlaseni() - default', () => {
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
        vek: { min: 18, max: 39 },
      },
      startCislo: 15,
      startCisloRequired: true,
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      kategorie: {
        id: '5a587e1a051c181132cf83b8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 },
      },
      startCislo: 15,
      startCisloRequired: true,
    },
  ];
  deepFreeze(state);

  expect(getPrihlaseni({ ...state.entities })).toEqual(selected);
});

it('getPrihlaseni() - chybí startovní číslo', () => {
  const state = JSON.parse(JSON.stringify(ucastniciTestData)); // deep copy
  delete state.entities.ucastnici.byIds['8344bc71dec1e99b7e1d01e'][AKTUALNI_ROK].prihlaska
    .startCislo;

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
        vek: { min: 18, max: 39 },
      },
      startCisloRequired: true,
    },
    {
      id: 'f5c88400190a4bed88c76736',
      prijmeni: 'Smalt',
      jmeno: 'Josef',
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      kategorie: {
        id: '5a587e1a051c181132cf83b8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 },
      },
      startCislo: 15,
      startCisloRequired: true,
    },
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
        vek: { min: 60, max: 150 },
      },
      startCislo: 15,
    },
    {
      id: '9ccbc71dedc1e99b7e1d671',
      prijmeni: 'Půlmaratonka',
      jmeno: 'Božena',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        pohlavi: 'žena',
        typ: 'půlmaraton',
        vek: { max: 39, min: 18 },
      },
      narozeni: { den: 25, mesic: 7, rok: 2001 },
      startCislo: 8,
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
        vek: { min: 18, max: 39 },
      },
      startCislo: 11,
    },
  ];
  deepFreeze(state);

  expect(getOdstartovani({ ...state.entities })).toEqual(selected);
});
