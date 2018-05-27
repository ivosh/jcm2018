import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../sort';
import prihlaseniReducer, { getPrihlaseniSorted } from './prihlaseniReducer';
import {
  kategorieFilterChange as genericKategorieFilterChange,
  textFilterChange
} from '../Filterable/FilterableActions';
import { sortDirChange } from '../UcastniciTable/UcastniciTableActions';

const actionPrefix = 'PRIHLASENI';
const kategorieFilterChange = genericKategorieFilterChange(actionPrefix);

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaseniReducer(stateBefore, {});
  expect(stateAfter.kategorieFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.DESC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, sortDirChange(actionPrefix, 'jmeno'))).toEqual(stateAfter);
});

it('zapnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'půlmaraton' };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(stateAfter);
});

it('vypnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: '' };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange('půlmaraton'))).toEqual(stateAfter);
});

it('přeppnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieFilter: 'pěší' };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange('pěší'))).toEqual(stateAfter);
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, textFilterChange(actionPrefix, 'Kl'))).toEqual(stateAfter);
});

it('getPrihlaseniSorted() by default', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      email: '',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 250
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      obec: 'Aš',
      email: 'sks@por.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: '0234jsdj0jdaklsd',
      zaplaceno: 0,
      predepsano: 0
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 250
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { prihlaseni }
  } = state;
  expect(getPrihlaseniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});

it('getPrihlaseniSorted() filtrováno na z', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: '',
        textFilter: 'z'
      }
    }
  };
  const selected = [
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 250
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { prihlaseni }
  } = state;
  expect(getPrihlaseniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});

it('getPrihlaseniSorted() filtrováno na kategorii výkonu půlmaraton', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieFilter: 'půlmaraton',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      email: '',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 250
    },
    {
      id: '8344bc71dec1e99b7e1d01e',
      prijmeni: 'Kyselová',
      jmeno: 'Slavěna',
      narozeni: { den: 13, mesic: 8, rok: 2001 },
      obec: 'Aš',
      email: 'sks@por.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 15,
      kod: '0234jsdj0jdaklsd',
      zaplaceno: 0,
      predepsano: 0
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: { den: 25, mesic: 7, rok: 1999 },
      obec: 'Bučovice',
      email: 'zrala.kl@s.cz',
      datum: new Date('2018-06-09T00:00:00.000Z'),
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 250
    }
  ];
  deepFreeze(state);

  const {
    entities,
    registrator: { prihlaseni }
  } = state;
  expect(getPrihlaseniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});
