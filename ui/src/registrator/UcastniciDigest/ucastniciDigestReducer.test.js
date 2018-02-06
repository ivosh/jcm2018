import deepFreeze from 'deep-freeze';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { SortDirTypes } from '../../Util';
import ucastniciDigestReducer, { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { kategorieVykonuFilterChange, textFilterChange } from '../Filterable/FilterableActions';
import { sortDirChange } from '../UcastniciTable/UcastniciTableActions';

const actionPrefix = 'UCASTNICI_DIGEST';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciDigestReducer(stateBefore, {});
  expect(stateAfter.fetching).toEqual(false);
  expect(stateAfter.kategorieVykonuFilter).toEqual('');
  expect(stateAfter.textFilter).toEqual('');
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = {
    sortColumn: undefined,
    sortDir: SortDirTypes.NONE,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle příjmení zase vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.DESC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange(actionPrefix, 'prijmeni'))).toEqual(
    stateAfter
  );
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange(actionPrefix, 'jmeno'))).toEqual(
    stateAfter
  );
});

it('zapnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: 'půlmaraton' };
  deepFreeze(stateBefore);

  expect(
    ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange(actionPrefix, 'půlmaraton'))
  ).toEqual(stateAfter);
});

it('vypnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: '' };
  deepFreeze(stateBefore);

  expect(
    ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange(actionPrefix, 'půlmaraton'))
  ).toEqual(stateAfter);
});

it('přeppnout filtrování podle kategorie výkonu', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: 'půlmaraton',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, kategorieVykonuFilter: 'pěší' };
  deepFreeze(stateBefore);

  expect(
    ucastniciDigestReducer(stateBefore, kategorieVykonuFilterChange(actionPrefix, 'pěší'))
  ).toEqual(stateAfter);
});

it('filtrovat na dvě písmena', () => {
  const stateBefore = {
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, textFilter: 'kl' };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, textFilterChange(actionPrefix, 'Kl'))).toEqual(
    stateAfter
  );
});

it('přepínání fetching', () => {
  const stateBefore = {
    fetching: false,
    sortColumn: 'prijmeni',
    sortDir: SortDirTypes.ASC,
    kategorieVykonuFilter: '',
    textFilter: ''
  };
  const stateAfter = { ...stateBefore, fetching: true };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, { type: 'FETCH_UCASTNICI_REQUEST' })).toEqual(
    stateAfter
  );
  expect(ucastniciDigestReducer(stateAfter, { type: 'FETCH_UCASTNICI_SUCCESS' })).toEqual(
    stateBefore
  );
  expect(ucastniciDigestReducer(stateAfter, { type: 'FETCH_UCASTNICI_ERROR' })).toEqual(
    stateBefore
  );
});

it('getUcastniciDigestSorted() by default', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: '',
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
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    },
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963',
      2016: { dokonceno: true, kategorie: 'maraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle příjmení sestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'prijmeni',
        sortDir: SortDirTypes.DESC,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963',
      2016: { dokonceno: true, kategorie: 'maraton' }
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle jména vzestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'jmeno',
        sortDir: SortDirTypes.ASC,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963',
      2016: { dokonceno: true, kategorie: 'maraton' }
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() podle narození sestupně', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: 'narozeni',
        sortDir: SortDirTypes.DESC,
        kategorieVykonuFilter: '',
        textFilter: ''
      }
    }
  };
  const selected = [
    {
      id: '6f09b1fd371dec1e99b7e1c9',
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: '7. 12. 1963',
      2016: { dokonceno: true, kategorie: 'maraton' }
    },
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na r', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: '',
        textFilter: 'r'
      }
    }
  };
  const selected = [
    {
      id: '5a09b1fd371dec1e99b7e1c9',
      prijmeni: 'Balabák',
      jmeno: 'Roman',
      narozeni: '1956',
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});

it('getUcastniciDigestSorted() filtrováno na kategorii výkonu půlmaraton', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      ucastniciDigest: {
        sortColumn: undefined,
        sortDir: undefined,
        kategorieVykonuFilter: 'půlmaraton',
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
      2017: { dokonceno: true, kategorie: 'maraton' },
      2018: { dokonceno: false, kategorie: 'půlmaraton' }
    }
  ];
  deepFreeze(state);

  const { entities, registrator } = state;
  expect(getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest })).toEqual(
    selected
  );
});
