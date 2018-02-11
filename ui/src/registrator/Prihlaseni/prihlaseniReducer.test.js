import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../Util';
import prihlaseniReducer, { getPrihlaseniSorted } from './prihlaseniReducer';
import { kategorieFilterChange, textFilterChange } from '../Filterable/FilterableActions';
import { sortDirChange } from '../UcastniciTable/UcastniciTableActions';

const actionPrefix = 'PRIHLASENI';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = prihlaseniReducer(stateBefore, {});
  expect(stateAfter.fetching).toEqual(false);
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

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange(actionPrefix, 'půlmaraton'))).toEqual(
    stateAfter
  );
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

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange(actionPrefix, 'půlmaraton'))).toEqual(
    stateAfter
  );
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

  expect(prihlaseniReducer(stateBefore, kategorieFilterChange(actionPrefix, 'pěší'))).toEqual(
    stateAfter
  );
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

it('přepínání fetching', () => {
  const stateBefore = {
    fetching: false,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, fetching: true };
  deepFreeze(stateBefore);

  expect(prihlaseniReducer(stateBefore, { type: 'FETCH_UCASTNICI_REQUEST' })).toEqual(stateAfter);
  expect(prihlaseniReducer(stateAfter, { type: 'FETCH_UCASTNICI_SUCCESS' })).toEqual(stateBefore);
  expect(prihlaseniReducer(stateAfter, { type: 'FETCH_UCASTNICI_ERROR' })).toEqual(stateBefore);
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
      narozeni: '1956',
      obec: 'Ostrava 2',
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 200
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: '25. 7. 1999',
      obec: 'Bučovice',
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 200
    }
  ];
  deepFreeze(state);

  const { entities, registrator: { prihlaseni } } = state;
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
      narozeni: '25. 7. 1999',
      obec: 'Bučovice',
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 200
    }
  ];
  deepFreeze(state);

  const { entities, registrator: { prihlaseni } } = state;
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
      narozeni: '1956',
      obec: 'Ostrava 2',
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: {
        id: '5a587e1b051c181132cf83d7',
        pohlavi: 'muž',
        typ: 'půlmaraton',
        vek: { min: 60, max: 150 }
      },
      startCislo: 17,
      kod: '10728864',
      zaplaceno: 250,
      predepsano: 200
    },
    {
      id: '7a09b1fd371dec1e99b7e142',
      prijmeni: 'Zralá',
      jmeno: 'Hana',
      narozeni: '25. 7. 1999',
      obec: 'Bučovice',
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      startCislo: 10,
      kod: 'abc023skd204mvs345',
      zaplaceno: 100,
      predepsano: 200
    }
  ];
  deepFreeze(state);

  const { entities, registrator: { prihlaseni } } = state;
  expect(getPrihlaseniSorted({ ...entities, ...prihlaseni })).toEqual(selected);
});
